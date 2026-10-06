import express from "express";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import studentRoutes from "./routes/studentRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({
    message: " Student Records API",
    version: "1.0.0",
    endpoints: {
      students: {
        "GET    /api/students": "List all students",
        "POST   /api/students": "Create a new student",
        "GET    /api/students/:id": "Get student by ID",
        "PUT    /api/students/:id": "Update student",
        "DELETE /api/students/:id": "Delete student",
      },
      results: {
        "GET    /api/students/:id/results": "Get results for a student",
        "POST   /api/students/:id/results": "Add a result for a student",
        "GET    /api/results": "List all results",
      },
    },
  });
});

app.use("/api/students", studentRoutes);
app.use("/api/results", resultRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route '${req.method} ${req.originalUrl}' not found`,
    hint: "Visit GET / for available endpoints",
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT} `);

});