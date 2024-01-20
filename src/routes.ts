import { Router } from "express";
import { CreateUserUserController } from "./useCases/createUser/CreateUserController";

const router = Router();

const createUserUserController = new CreateUserUserController; 

router.post("/users", createUserUserController.handle)

export {router}