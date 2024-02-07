import { compare } from "bcryptjs";

import { sign } from "jsonwebtoken";

import { client } from "../../prisma/client";

interface IRequest {
    username: string;
    password: string;
}

class AuthenticateUserUseCase {

    async execute({ username, password }: IRequest) {

        //Verificar se user existe

        const userAlreadyExists = await client.user.findFirst({
            where: {
                username
            }
        });

        //Verificar se a senha está correta

        const passwordMatch = await compare(password, userAlreadyExists.password)

        if (!userAlreadyExists) {
            throw new Error("User or password incorrect!")
        }

        if (!passwordMatch) {
            throw new Error("User or password incorrect!")
        }

        // gerar token do usuário
        const token = sign({}, "128ec574-568e-4859-93ad-b8a8007d27c5", {
            subject: userAlreadyExists.id,
            expiresIn: "20s"
        })

        return {token}

    }
}

export { AuthenticateUserUseCase }