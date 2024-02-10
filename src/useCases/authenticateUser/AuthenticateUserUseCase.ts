import { compare } from "bcryptjs";

import { sign } from "jsonwebtoken";

import { client } from "../../prisma/client";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

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
        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(userAlreadyExists.id);

        await client.refreshToken.deleteMany({
            where: {
                userId: userAlreadyExists.id
            }
        })

        const generateRefreshToken = new GenerateRefreshToken();
        const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id);

        return { token, refreshToken }

    }
}

export { AuthenticateUserUseCase }