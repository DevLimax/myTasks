import { Router } from "express";

import { UserController } from "../controllers/user.controller";
import { validateFieldUserCreate } from "../middlewares/user.middleware";

const router = Router();
const controller = UserController.build();

router.post('/create', validateFieldUserCreate,  controller.save);
router.post('/login', controller.login);
router.get('/', controller.list);
router.get('/:id', controller.find);
router.put('/:id', controller.edit);
router.put('/updatePassword/:id', controller.updatePassword);
router.delete('/:id', controller.delete);

export {router as userRouter}