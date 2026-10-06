const validateStudent = (req, res, next) => {
  const { name, email, age, course } = req.body;
  const missing = [];

  if (!name || typeof name !== "string" || name.trim() === "")
    missing.push("name");
  if (!email || typeof email !== "string" || !email.includes("@"))
    missing.push("email (valid email required)");
  if (age === undefined || age === null || typeof age !== "number" || age <= 0)
    missing.push("age (positive number required)");
  if (!course || typeof course !== "string" || course.trim() === "")
    missing.push("course");

  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      missingOrInvalidFields: missing,
    });
  }

  next();
};

const validateResult = (req, res, next) => {
  const { subject, marks, grade, semester } = req.body;
  const missing = [];

  if (!subject || typeof subject !== "string" || subject.trim() === "")
    missing.push("subject");
  if (marks === undefined || marks === null || typeof marks !== "number" || marks < 0 || marks > 100)
    missing.push("marks (number between 0–100 required)");
  if (!grade || typeof grade !== "string" || grade.trim() === "")
    missing.push("grade");
  if (!semester || typeof semester !== "string" || semester.trim() === "")
    missing.push("semester");

  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      missingOrInvalidFields: missing,
    });
  }

  next();
};

export { validateStudent, validateResult };