import { students, nextStudentId } from "../data/store.js";

const getAllStudents = (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
};

const getStudentById = (req, res, next) => {
  const student = students.find((s) => s.id === req.params.id);

  if (!student) {
    const err = new Error(`Student with id '${req.params.id}' not found`);
    err.statusCode = 404;
    return next(err);
  }

  res.status(200).json({ success: true, data: student });
};

const createStudent = (req, res) => {
  const { name, email, age, course } = req.body;

  if (students.find((s) => s.email === email)) {
    return res.status(409).json({
      success: false,
      error: `A student with email '${email}' already exists`,
    });
  }

  const newStudent = {
    id: nextStudentId(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    age,
    course: course.trim(),
    createdAt: new Date().toISOString(),
  };

  students.push(newStudent);
  res.status(201).json({ success: true, data: newStudent });
};

const updateStudent = (req, res, next) => {
  const index = students.findIndex((s) => s.id === req.params.id);

  if (index === -1) {
    const err = new Error(`Student with id '${req.params.id}' not found`);
    err.statusCode = 404;
    return next(err);
  }

  const allowed = ["name", "email", "age", "course"];
  const updates = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) updates[key] = req.body[key];
  }

  students[index] = {
    ...students[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  res.status(200).json({ success: true, data: students[index] });
};

const deleteStudent = (req, res, next) => {
  const index = students.findIndex((s) => s.id === req.params.id);

  if (index === -1) {
    const err = new Error(`Student with id '${req.params.id}' not found`);
    err.statusCode = 404;
    return next(err);
  }

  const deleted = students.splice(index, 1)[0];
  res.status(200).json({ success: true, message: "Student deleted", data: deleted });
};

export { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };