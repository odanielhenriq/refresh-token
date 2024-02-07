import "express-async-errors"
import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use(
    (error: Error, request:Request, response:Response, next:NextFunction)=>{
        return response.json({
            status:"error",
            message: error.message,
        })
    }
)

app.listen(3004, () => console.log("server is running on port 3004"));

