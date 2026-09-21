/**
 * Extracts a flat array of clean skill name strings from various formats:
 * - ["React", "Node.js"]
 * - [{ nom: "React" }, { name: "Node" }]
 * - "React, Node.js, Express"
 * - Object with competences / skills / competencesRequises / skillsRequired properties
 */
export const extractSkills = (skillsInput) => {
  if (!skillsInput) return [];

  // If passed a user or job object directly
  if (!Array.isArray(skillsInput) && typeof skillsInput === "object") {
    const candidateList =
      skillsInput.competences ||
      skillsInput.skills ||
      skillsInput.competencesRequises ||
      skillsInput.skillsRequired ||
      [];
    return extractSkills(candidateList);
  }

  // If passed a comma-separated string
  if (typeof skillsInput === "string") {
    return skillsInput
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  // If passed an array
  if (Array.isArray(skillsInput)) {
    return skillsInput
      .map((item) => {
        if (!item) return "";
        if (typeof item === "string") return item.trim();
        if (typeof item === "object") {
          return (
            item.nom ||
            item.name ||
            item.competence ||
            item.skill ||
            item.titre ||
            item.label ||
            ""
          ).trim();
        }
        return String(item).trim();
      })
      .filter(Boolean);
  }

  return [];
};

/**
 * Normalizes a skill string for tolerant comparison:
 * - lowercases
 * - removes .js, js, .ts, ts, css extensions
 * - removes all special punctuation and spaces
 */
export const normalizeSkill = (skill) => {
  if (!skill) return "";
  return String(skill)
    .toLowerCase()
    .trim()
    .replace(/\.(js|ts)$/i, "")
    .replace(/(js|ts)$/i, "")
    .replace(/css$/i, "")
    .replace(/[^a-z0-9]/g, "");
};

/**
 * Checks whether a candidate skill matches a required job skill.
 */
export const isSkillMatch = (candidateSkill, requiredSkill) => {
  const normCand = normalizeSkill(candidateSkill);
  const normReq = normalizeSkill(requiredSkill);

  if (!normCand || !normReq) return false;

  // Exact normalized match (e.g. "react" === "react")
  if (normCand === normReq) return true;

  // Substring inclusion (e.g. "reactjs" contains "react", "express" in "expressjs")
  if (normCand.length >= 3 && normReq.length >= 3) {
    if (normCand.includes(normReq) || normReq.includes(normCand)) {
      return true;
    }
  }

  // Token-based check on original words (e.g., "Fullstack React" vs "React")
  const candWords = String(candidateSkill).toLowerCase().split(/[\s,./\-+]+/);
  const reqWords = String(requiredSkill).toLowerCase().split(/[\s,./\-+]+/);

  return reqWords.some((rw) => rw.length >= 2 && candWords.includes(rw));
};

/**
 * Calculates the percentage compatibility score between candidate skills and required skills.
 */
export const calculateMatchScore = (candidateInput = [], requiredInput = []) => {
  const candidateSkills = extractSkills(candidateInput);
  const requiredSkills = extractSkills(requiredInput);

  if (!requiredSkills || requiredSkills.length === 0) return 100;
  if (!candidateSkills || candidateSkills.length === 0) return 0;

  const matched = requiredSkills.filter((reqSkill) =>
    candidateSkills.some((candSkill) => isSkillMatch(candSkill, reqSkill))
  );

  const rawScore = (matched.length / requiredSkills.length) * 100;
  return Math.min(100, Math.max(0, Math.round(rawScore)));
};

/**
 * Performs detailed skill gap analysis returning:
 * - matched: array of required skills validated by the candidate (original labels)
 * - missing: array of required skills to acquire (original labels)
 * - score: 0 to 100%
 */
export const getSkillAnalysis = (candidateInput = [], requiredInput = []) => {
  const candidateSkills = extractSkills(candidateInput);
  const requiredSkills = extractSkills(requiredInput);

  if (!requiredSkills || requiredSkills.length === 0) {
    return { matched: [], missing: [], score: 100 };
  }

  const matched = [];
  const missing = [];

  requiredSkills.forEach((reqSkill) => {
    const hasSkill = candidateSkills.some((candSkill) =>
      isSkillMatch(candSkill, reqSkill)
    );
    if (hasSkill) {
      matched.push(reqSkill);
    } else {
      missing.push(reqSkill);
    }
  });

  const score =
    requiredSkills.length > 0
      ? Math.min(100, Math.max(0, Math.round((matched.length / requiredSkills.length) * 100)))
      : 100;

  return { matched, missing, score };
};
