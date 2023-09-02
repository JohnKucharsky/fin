import { Router } from "express";
import {
  createTodoHandler,
  deleteTodoHandler,
  getTodosHandler,
  updateTodoHandler,
} from "./todo/todo.controller";
import {
  createTodoSchema,
  deleteTodoSchema,
  updateTodoSchema,
} from "./todo/todo.schema";
import validate from "./utils/validate";

const router = Router();

/*Todos*/
router.get("/todos", getTodosHandler);
router.post("/todos", [validate(createTodoSchema)], createTodoHandler);
router.post("/todos/:id", [validate(updateTodoSchema)], updateTodoHandler);
router.delete("/todos/:id", [validate(deleteTodoSchema)], deleteTodoHandler);
/*Todos End*/

export default router;
