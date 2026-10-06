import { students, results, nextResultId } from "../data/store.js";

const getResultsByStudent = (req, res, next) => {
  const student = students.find((s) => s.id === req.params.id);

  if (!student) {
    const err = new Error(`Student with id '${req.params.id}' not found`);
    err.statusCode = 404;
    return next(err);
  }

  const studentResults = results.filter((r) => r.studentId === req.params.id);

  const avg =
    studentResults.length > 0
      ? (studentResults.reduce((sum, r) => sum + r.marks, 0) / studentResults.length).toFixed(2)
      : null;

  res.status(200).json({
    success: true,
    student: { id: student.id, name: student.name },
    count: studentResults.length,
    average: avg ? Number(avg) : null,
    data: studentResults,
  });
};

const addResult = (req, res, next) => {
  const student = students.find((s) => s.id === req.params.id);

  if (!student) {
    const err = new Error(`Student with id '${req.params.id}' not found`);
    err.statusCode = 404;
    return next(err);
  }

  const { subject, marks, grade, semester } = req.body;

  const newResult = {
    id: nextResultId(),
    studentId: req.params.id,
    subject: subject.trim(),
    marks,
    grade: grade.trim().toUpperCase(),
    semester: semester.trim(),
    createdAt: new Date().toISOString(),
  };

  results.push(newResult);
  res.status(201).json({ success: true, data: newResult });
};

const getAllResults = (req, res) => {
  res.status(200).json({
    success: true,
    count: results.length,
    data: results,
  });
};

export { getResultsByStudent, addResult, getAllResults };