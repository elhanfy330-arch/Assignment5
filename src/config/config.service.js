import { resolve } from "path";
import { config } from "dotenv";

config({
    path : resolve(`.env.${process.env.NODE_ENV}`)
})

export const PORT = Number(process.env.PORT)

export const dbConfig = {
    PORT : process.env.PORT, 
    DB_HOST : process.env.DB_HOST,
    DB_PORT : process.env.DB_PORT,
    DB_PASS : process.env.DB_PASS,
    DB_NAME : process.env.DB_NAME,
    DB_USER : process.env.DB_USER,
    DB_DIALECT : process.env.DB_DIALECT,
    MIN : Number(process.env.MIN),
    Max : Number(process.env.MAX)
}