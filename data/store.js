let students = [
  { id: "1", name: "bhavesh Sharma", email: "bhavesh@school.edu", age: 20, course: "Data Structures & Algorithms", createdAt: new Date("2024-01-10").toISOString() },
  { id: "2", name: "bhaavesh Patel", email: "bhaavesh@school.edu", age: 22, course: "Web Development", createdAt: new Date("2024-02-05").toISOString() },
  { id: "3", name: "Rohan Verma", email: "rohan@school.edu", age: 21, course: "Machine Learning", createdAt: new Date("2024-03-01").toISOString() },
];

let results = [
  { id: "r1", studentId: "1", subject: "Data Structures", marks: 88, grade: "A", semester: "Spring 2024" },
  { id: "r2", studentId: "1", subject: "Operating Systems", marks: 92, grade: "A+", semester: "Spring 2024" },
  { id: "r3", studentId: "2", subject: "Database Management", marks: 76, grade: "B", semester: "Spring 2024" },
  { id: "r4", studentId: "3", subject: "Artificial Intelligence", marks: 95, grade: "A+", semester: "Spring 2024" },
];

let studentIdCounter = students.length + 1;
let resultIdCounter = results.length + 1;

const nextStudentId = () => String(++studentIdCounter);
const nextResultId = () => `r${++resultIdCounter}`;

export { students, results, nextStudentId, nextResultId };