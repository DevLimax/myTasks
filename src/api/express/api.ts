import { Router } from "express";
import { userRouter } from "./routes/user.route";
import { taskRouter } from "./routes/task.route";
import { checkTokenValid } from "./middlewares/user.middleware";

const router = Router();

router.use('/users', userRouter);
router.use('/tasks', checkTokenValid, taskRouter);

export default router