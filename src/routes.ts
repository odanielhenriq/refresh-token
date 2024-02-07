import { Router } from "express";
import { CreateUserUserController } from "./useCases/createUser/CreateUserController";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserUserController = new CreateUserUserController;
const authenticateUserController = new AuthenticateUserController;

router.post("/users", createUserUserController.handle)
router.post("/login", authenticateUserController.handle)

router.get("/courses", ensureAuthenticated, (request, response) => {
    return response.json([
        { id: 1, name: "NodeJS" },
        { id: 2, name: "ReactJS" },
        { id: 3, name: "React Native" },
        { id: 4, name: "Flutter" },
        { id: 5, name: "Elixir" },
    ])
})

export { router }