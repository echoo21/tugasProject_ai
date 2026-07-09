// ==================== AGENT ORCHESTRATOR ====================
// Goal-based stateless agent with perceive -> reason -> act cycle
// Sumber: docs/superpowers/specs/2026-07-09-whats-this-ai-modules-design.md
// src/lib/ai/agent.ts

import type {
  LearningState,
  PerceptionInput,
  ActuatorCommands,
  AgentOutput,
  Goal,
  PlanningAction,
  QuizObject,
  PlanStep,
  InferredTag,
  CSPResult,
} from './types';
import { inferFromObject, createKnowledgeBase } from './knowledgeBase';
import { createDefaultActions, createDefaultGoal, generatePlan } from './planner';
import { solveQuizCSP } from './csp';

const kbData = createKnowledgeBase();
const defaultActions = createDefaultActions();
const defaultGoal = createDefaultGoal();

/**
 * PERCEPTION -- Extract meaningful data from a sensor input.
 *
 * Untuk input type 'scan_complete', ekstrak nama objek, kategori,
 * dan atribut dari hasil AI vision.
 * Untuk tipe input lain, kembalikan atribut kosong.
 */
export function perceive(
  input: PerceptionInput,
): { objName?: string; category?: string; attributes: string[] } {
  if (input.type === 'scan_complete') {
    return {
      objName: input.objectName,
      category: input.objectCategory,
      attributes: input.attributes ?? [],
    };
  }

  // Non-scan inputs (quiz_complete, puzzle_complete, dll.) tidak
  // membawa data persepsi objek
  return { attributes: [] };
}

/**
 * REASONING -- Apply knowledge base inference, CSP quiz generation,
 * dan classical planning terhadap data hasil persepsi.
 *
 * - KB inference (forward chaining) hanya berjalan untuk scan_complete
 * - CSP quiz generation dipicu jika 3+ history objects tersedia
 * - Planner selalu dijalankan untuk merekomendasikan langkah belajar
 */
export function reason(
  perception: { objName?: string; category?: string; attributes: string[] },
  state: LearningState,
  language: string,
  historyObjects: QuizObject[],
): { inferredTags: InferredTag[]; planSteps: PlanStep[]; quizStructure?: CSPResult } {
  const inferredTags: InferredTag[] = [];
  let quizStructure: CSPResult | undefined;

  // 1. KB inference -- hanya ketika objek terdeteksi (scan_complete)
  if (perception.objName && perception.category) {
    const tags = inferFromObject(
      perception.objName,
      perception.category,
      perception.attributes,
      language as 'en' | 'id' | 'zh',
      kbData,
    );
    inferredTags.push(...tags);
  }

  // 2. CSP quiz generation -- dipicu ketika user sudah memiliki
  //    cukup objek dalam history (>= 3)
  if (historyObjects.length >= 3) {
    quizStructure = solveQuizCSP(historyObjects, 5);
  }

  // 3. Classical planning -- selalu dijalankan untuk rekomendasi
  //    langkah belajar berikutnya
  const planSteps = generatePlan(state, defaultGoal, defaultActions);

  return { inferredTags, planSteps, quizStructure };
}

/**
 * ACTION -- Konversi hasil reasoning menjadi actuator commands
 * konkret yang dapat dieksekusi oleh UI layer.
 *
 * - displayNextSteps dibatasi ke 3 langkah pertama
 * - inferredTags untuk badge pada ResultCard
 * - quizStructure untuk UI QuizGame
 */
export function act(
  decision: { inferredTags: InferredTag[]; planSteps: PlanStep[]; quizStructure?: CSPResult },
  _state: LearningState,
  _perception: { objName?: string; category?: string; attributes: string[] },
): ActuatorCommands {
  return {
    displayNextSteps: decision.planSteps.slice(0, 3),
    inferredTags: decision.inferredTags,
    quizStructure: decision.quizStructure,
  };
}

/**
 * ORCHESTRATOR -- Siklus stateless perceive -> reason -> act.
 *
 * Entry point utama untuk agent architecture.
 * Menerima state terkini dari pemanggil (React/DB),
 * memproses satu sensor input, dan mengembalikan state yang
 * telah diperbarui beserta actuator commands.
 *
 * Agen sepenuhnya stateless -- tidak ada state internal yang disimpan.
 * Setiap pemanggilan adalah siklus yang independen.
 *
 * @param currentState   - Learning state user sebelum siklus ini.
 * @param input          - Sensor input (scan, quiz complete, dll.).
 * @param historyObjects - Array QuizObject dari riwayat penemuan user.
 * @param language       - Kode bahasa UI ('en', 'id', 'zh').
 * @returns AgentOutput berisi newState dan actuator commands.
 */
export function runCycle(
  currentState: LearningState,
  input: PerceptionInput,
  historyObjects: QuizObject[],
  language: string,
): AgentOutput {
  // --- 1. PERCEIVE ---
  const perception = perceive(input);

  // --- 2. State update berdasarkan tipe input ---
  // Salin state untuk immutability
  const updatedState: LearningState = { ...currentState };

  switch (input.type) {
    case 'scan_complete':
      if (
        perception.objName &&
        !updatedState.discoveredObjects.includes(perception.objName)
      ) {
        updatedState.discoveredObjects = [
          ...updatedState.discoveredObjects,
          perception.objName,
        ];
      }
      if (
        perception.category &&
        !updatedState.categoriesSeen.includes(perception.category)
      ) {
        updatedState.categoriesSeen = [
          ...updatedState.categoriesSeen,
          perception.category,
        ];
      }
      break;

    case 'quiz_complete':
      updatedState.quizCompleted = true;
      break;

    case 'puzzle_complete':
      updatedState.puzzleCompleted = true;
      break;

    case 'listen_complete':
      updatedState.listenScore += 1;
      break;

    case 'chat_sent':
      updatedState.chatCount += 1;
      break;

    case 'app_launch':
    default:
      // app_launch tidak mengubah state
      break;
  }

  // --- 3. REASON ---
  const decision = reason(perception, updatedState, language, historyObjects);

  // --- 4. ACT ---
  const commands = act(decision, updatedState, perception);

  return { newState: updatedState, commands };
}
