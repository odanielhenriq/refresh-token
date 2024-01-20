import { hash } from "bcryptjs";
import { client } from "../../prisma/client"

interface IuserRequest {
    name: string;
    password: string;
    username: string;
}

class CreateUserUseCase {

    async execute({ name, username, password }: IuserRequest) {

        //verificar se o usuário existe
        const userAlreadyExists = await client.user.findFirst({
            where: {
                username
            }
        });

        if (userAlreadyExists) {
            throw new Error("User or password incorrect!")
        }

        //cadastra o usuário

        const passwordHash = await hash(password, 8);

        const user = await client.user.create({
            data: {
                name,
                username,
                password: passwordHash,
            },
        });

        return user;

    }
}

export { CreateUserUseCase }