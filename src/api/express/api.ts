import { Router } from "express";
import { userRouter } from "./routes/user.route";
import { taskRouter } from "./routes/task.route";

const router = Router();

router.use('/users', userRouter);
router.use('/tasks', taskRouter);

export default router