// ==================== CSP - Quiz Generator ====================
// Backtracking constraint satisfaction solver with MRV heuristic
// and forward checking for quiz generation.
//
// Formal CSP Notation:
//   V = {Q₁, Q₂, ..., Qₙ}  (n quiz slots, default 5)
//   D_Qi = historyObjects ∪ DEFAULT_OBJECT_POOL  (domain per variable)
//   C = {
//     C₁: ∀i ≠ j → Qi.objek ≠ Qj.objek                              (unique)
//     C₂: ∀i(1..n-1) → Qi.kategori ≠ Q(i+1).kategori                (no consecutive same category)
//     C₃: ∀i(1..n-1) → Qi.difficulty ≤ Q(i+1).difficulty            (difficulty non-decreasing)
//     C₄: ∀i → distractors ⊆ (D \ {Qi.name}) ∧ |distractors| = 4    (distractors valid)
//     C₅: distractors[i] ≠ distractors[j] untuk i ≠ j               (distractors unique)
//     C₆: prioritaskan distractor dengan kategori = Qi.category      (prefer same-category)
//   }
// ================================================================

import { QuizObject, QuizSlot, CSPResult } from './types';

// ==================== DEFAULT OBJECT POOL ====================

/**
 * 15 common objects used as fallback domain when history has fewer than 5 items.
 * Difficulty values are deterministic via `getDifficulty()`.
 */
export const DEFAULT_OBJECT_POOL: QuizObject[] = [
  // Animals (difficulty 1)
  { name: 'Cat', category: 'Animals', difficulty: 1, emoji: '\u{1F431}' },
  { name: 'Dog', category: 'Animals', difficulty: 1, emoji: '\u{1F436}' },
  { name: 'Fish', category: 'Animals', difficulty: 1, emoji: '\u{1F41F}' },
  { name: 'Bird', category: 'Animals', difficulty: 1, emoji: '\u{1F426}' },
  // Food (difficulty 1)
  { name: 'Apple', category: 'Food', difficulty: 1, emoji: '\u{1F34E}' },
  { name: 'Banana', category: 'Food', difficulty: 1, emoji: '\u{1F34C}' },
  { name: 'Carrot', category: 'Food', difficulty: 1, emoji: '\u{1F955}' },
  { name: 'Milk', category: 'Food', difficulty: 1, emoji: '\u{1F95B}' },
  // Toys (difficulty 1)
  { name: 'Ball', category: 'Toys', difficulty: 1, emoji: '\u{26BD}' },
  { name: 'Doll', category: 'Toys', difficulty: 1, emoji: '\u{1F9F8}' },
  // Vehicles (difficulty 2)
  { name: 'Car', category: 'Vehicles', difficulty: 2, emoji: '\u{1F697}' },
  { name: 'Airplane', category: 'Vehicles', difficulty: 2, emoji: '\u{2708}\u{FE0F}' },
  { name: 'Bicycle', category: 'Vehicles', difficulty: 2, emoji: '\u{1F6B2}' },
  // Nature (difficulty 2)
  { name: 'Sun', category: 'Nature', difficulty: 2, emoji: '\u{2600}\u{FE0F}' },
  { name: 'Tree', category: 'Nature', difficulty: 2, emoji: '\u{1F333}' },
];

// ==================== DIFFICULTY ====================

const BASE_DIFFICULTY: Record<string, number> = {
  Animals: 1, Food: 1, Toys: 1, Vehicles: 2,
  Nature: 2, Plants: 3, Clothing: 3, Furniture: 3,
  School: 3, Sports: 3, Household: 4,
  Electronics: 4, Tools: 4, Music: 4, Art: 5, People: 5, Other: 3,
};

/**
 * Compute deterministic difficulty (1-5) for a quiz object.
 *
 * - base = BASE_DIFFICULTY[category] (default 3 if unknown category)
 * - namePenalty = 1 if name.length > 8 else 0
 * - return Math.min(5, base + namePenalty)
 *
 * Categories at 1 -> very common (Animals, Food, Toys)
 * Categories at 2 -> common (Vehicles, Nature)
 * Categories at 3 -> familiar (Plants, Clothing, Furniture, School, Sports)
 * Categories at 4 -> less common (Household, Electronics, Tools, Music)
 * Categories at 5 -> specific / abstract (Art, People)
 */
export function getDifficulty(category: string, name: string): number {
  const base = BASE_DIFFICULTY[category] ?? 3;
  const namePenalty = name.length > 8 ? 1 : 0;
  return Math.min(5, base + namePenalty);
}

// ==================== DISTRACTORS ====================

/**
 * Generate unique distractor names for a quiz question.
 *
 * Priority rules (C4-C6 from CSP spec):
 * 1. Filter out the correct answer
 * 2. Order: same-category objects first, then the rest
 * 3. Deduplicate and take the first `count` entries
 *
 * @param correctObject - The correct answer for the quiz slot.
 * @param allObjects    - Full domain pool (history + default).
 * @param count         - Number of distractors to produce (default 4).
 * @returns An array of distractor names (strings), length <= count.
 */
export function generateDistractors(
  correctObject: QuizObject,
  allObjects: QuizObject[],
  count: number = 4,
): string[] {
  const candidates = allObjects.filter(o => o.name !== correctObject.name);

  // C6: prioritize same-category distractors
  const sameCategory = candidates.filter(o => o.category === correctObject.category);
  const otherCategory = candidates.filter(o => o.category !== correctObject.category);

  const ordered = [...sameCategory, ...otherCategory];

  // C5: ensure distractors are unique by name
  const seen = new Set<string>();
  const result: string[] = [];

  for (const obj of ordered) {
    if (seen.has(obj.name)) continue;
    seen.add(obj.name);
    if (result.length < count) {
      result.push(obj.name);
    }
  }

  return result;
}

// ==================== CSP SOLVER ====================

const DEFAULT_QUIZ_COUNT = 5;

/**
 * Solve the quiz generation CSP using backtracking with MRV heuristic
 * and forward checking.
 *
 * Algorithm:
 * 1. Build domain = historyObjects U DEFAULT_OBJECT_POOL (deduplicated by name)
 * 2. Initialize n domains (one per quiz slot)
 * 3. Backtrack:
 *    a. MRV: select the unassigned slot with the fewest remaining values
 *    b. Try each value in the slot's domain
 *    c. Forward check: after assignment, prune domains of remaining slots
 *       (violations of C2/C3)
 *    d. Recurse; on failure restore domains and backtrack
 * 4. On solution: generate 4 distractors per slot and return the result
 *
 * @param historyObjects - Objects the user has discovered (can be empty).
 * @param quizCount      - Number of quiz slots (default 5).
 * @returns CSPResult with filled slots or solutionFound=false.
 */
export function solveQuizCSP(
  historyObjects: QuizObject[],
  quizCount?: number,
): CSPResult {
  const targetCount = quizCount ?? DEFAULT_QUIZ_COUNT;

  // Build domain: history + default pool, deduplicated by name
  const allObjects = mergeAndDeduplicate(historyObjects, DEFAULT_OBJECT_POOL);

  // Each slot initially has the full domain
  const domains: QuizObject[][] = Array.from(
    { length: targetCount },
    () => [...allObjects],
  );

  // Run backtracking with MRV + forward checking
  const assignment: (QuizObject | null)[] = Array<QuizObject | null>(targetCount).fill(null);
  const solution = backtrack(assignment, domains, targetCount);

  if (!solution) {
    return { slots: [], solutionFound: false };
  }

  // Build QuizSlot results with 4 distractors per selected object
  const slots: QuizSlot[] = solution.map((obj, i) => ({
    variableId: `Q${i + 1}`,
    selectedObject: obj,
    distractors: generateDistractors(obj, allObjects),
  }));

  return { slots, solutionFound: true };
}

// ---------- Internal helpers ----------

/**
 * Merge two arrays of QuizObjects, deduplicating by name.
 * History objects take precedence over default pool entries.
 */
function mergeAndDeduplicate(
  history: QuizObject[],
  defaultPool: QuizObject[],
): QuizObject[] {
  const seen = new Set<string>();
  const result: QuizObject[] = [];

  const combined = [...history, ...defaultPool];
  for (const obj of combined) {
    if (seen.has(obj.name)) continue;
    seen.add(obj.name);
    result.push(obj);
  }

  return result;
}

/**
 * Backtracking search with MRV heuristic and forward checking.
 *
 * @param assignment  - Partial assignment (null = unassigned).
 * @param domains     - Current domains for all slots (mutated in place).
 * @param targetCount - Total number of slots to fill.
 * @returns Array of assigned QuizObjects if solution found, null otherwise.
 */
function backtrack(
  assignment: (QuizObject | null)[],
  domains: QuizObject[][],
  targetCount: number,
): QuizObject[] | null {
  // Base case: all slots assigned -> solution found
  if (assignment.every(slot => slot !== null)) {
    return assignment as QuizObject[];
  }

  // MRV: select the unassigned variable with the smallest domain
  const slotIndex = selectUnassignedVariable(assignment, domains);
  if (slotIndex === -1) return null;

  // Try each value in the slot's current domain
  for (const value of domains[slotIndex]) {
    if (!isConsistent(value, slotIndex, assignment)) continue;

    // Assign the value
    assignment[slotIndex] = value;

    // Save domain state before forward checking (for backtracking)
    const savedDomains: QuizObject[][] = domains.map(d => [...d]);

    // Forward checking: prune domains of unassigned slots
    if (forwardCheck(slotIndex, value, assignment, domains)) {
      const result = backtrack(assignment, domains, targetCount);
      if (result) return result;
    }

    // Restore domains and backtrack
    for (let i = 0; i < domains.length; i++) {
      domains[i] = savedDomains[i];
    }
    assignment[slotIndex] = null;
  }

  return null;
}

/**
 * MRV (Minimum Remaining Values) heuristic:
 * Pick the unassigned slot with the smallest domain size.
 * Returns -1 if no unassigned slot is found.
 */
function selectUnassignedVariable(
  assignment: (QuizObject | null)[],
  domains: QuizObject[][],
): number {
  let minDomain = Infinity;
  let selected = -1;

  for (let i = 0; i < assignment.length; i++) {
    if (assignment[i] === null && domains[i].length < minDomain) {
      minDomain = domains[i].length;
      selected = i;
    }
  }

  return selected;
}

/**
 * Check whether `value` is consistent with the current partial assignment.
 *
 * C1: No same object in multiple slots (checked by name).
 * C2: No consecutive same category (check previous and next assigned slots).
 * C3: Difficulty non-decreasing (check adjacent assigned slots for transitivity).
 */
function isConsistent(
  value: QuizObject,
  slotIndex: number,
  assignment: (QuizObject | null)[],
): boolean {
  // C1: Unique - no other slot has the same object name
  for (let i = 0; i < assignment.length; i++) {
    if (i !== slotIndex && assignment[i] !== null && assignment[i]!.name === value.name) {
      return false;
    }
  }

  // C2: No consecutive same category with previous slot
  if (slotIndex > 0 && assignment[slotIndex - 1] !== null) {
    if (assignment[slotIndex - 1]!.category === value.category) {
      return false;
    }
  }

  // C2: No consecutive same category with next slot (if already assigned)
  if (slotIndex < assignment.length - 1 && assignment[slotIndex + 1] !== null) {
    if (value.category === assignment[slotIndex + 1]!.category) {
      return false;
    }
  }

  // C3: Difficulty non-decreasing - check with previous slot
  if (slotIndex > 0 && assignment[slotIndex - 1] !== null) {
    if (assignment[slotIndex - 1]!.difficulty > value.difficulty) {
      return false;
    }
  }

  // C3: Difficulty non-decreasing - check with next slot (if already assigned)
  if (slotIndex < assignment.length - 1 && assignment[slotIndex + 1] !== null) {
    if (value.difficulty > assignment[slotIndex + 1]!.difficulty) {
      return false;
    }
  }

  return true;
}

/**
 * Forward checking: after assigning `value` at `slotIndex`,
 * prune domains of all unassigned slots to maintain arc consistency.
 *
 * Removes values that would violate:
 * - C1 (unique name)
 * - C2 (no consecutive same category - only for adjacent slots)
 * - C3 (difficulty non-decreasing - for all future/past slots)
 *
 * @returns false if any domain becomes empty (dead end).
 */
function forwardCheck(
  slotIndex: number,
  assignedValue: QuizObject,
  assignment: (QuizObject | null)[],
  domains: QuizObject[][],
): boolean {
  for (let j = 0; j < domains.length; j++) {
    // Skip already assigned slots
    if (assignment[j] !== null) continue;

    const remaining: QuizObject[] = [];

    for (const candidate of domains[j]) {
      let keep = true;

      // C1: Candidate must not be the same object
      if (candidate.name === assignedValue.name) {
        keep = false;
      }

      // C2: Adjacent slots must not share the same category
      if (keep && (j === slotIndex - 1 || j === slotIndex + 1)) {
        if (candidate.category === assignedValue.category) {
          keep = false;
        }
      }

      // C3: Difficulty non-decreasing
      if (keep) {
        if (j > slotIndex && candidate.difficulty < assignedValue.difficulty) {
          keep = false;
        } else if (j < slotIndex && candidate.difficulty > assignedValue.difficulty) {
          keep = false;
        }
      }

      if (keep) {
        remaining.push(candidate);
      }
    }

    domains[j] = remaining;

    // Early exit: empty domain -> dead end
    if (domains[j].length === 0) {
      return false;
    }
  }

  return true;
}
