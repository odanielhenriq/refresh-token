import { sign } from "jsonwebtoken"

class GenerateTokenProvider {

    async execute(userId: string) {
        const token = sign({}, "128ec574-568e-4859-93ad-b8a8007d27c5", {
            subject: userId,
            expiresIn: "20s"
        })
        return token;
    }


}

export { GenerateTokenProvider }