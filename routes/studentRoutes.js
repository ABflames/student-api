import { Router } from "express";
import { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent } from "../controllers/studentController.js";
import { getResultsByStudent, addResult } from "../controllers/resultController.js";
import { validateStudent, validateResult } from "../middleware/validate.js";

const router = Router();

router
  .route("/")
  .get(getAllStudents)
  .post(validateStudent, createStudent);

router
  .route("/:id")
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

router
  .route("/:id/results")
  .get(getResultsByStudent)
  .post(validateResult, addResult);

export default router;