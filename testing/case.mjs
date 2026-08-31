/** Split a test case into candidate-visible material and evaluator-only metadata. */

const criteriaHeading = /^## (?:Completion|Evaluation) criteria\s*$/im;
const caseTitle = /^# Case:\s*.*(?:\r?\n)+/;

export function candidateCase(caseText) {
  const withoutCriteria = caseText.slice(0, criteriaHeading.exec(caseText)?.index).trimEnd();
  return withoutCriteria.replace(caseTitle, "").trimStart();
}
