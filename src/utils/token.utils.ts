import "dotenv/config"
import jwt from "jsonwebtoken"

interface UserPayload {
    id: string,
    username: string,
    email: string
}

const secret = `${process.env.SECRET_KEY}`;

export function generateToken(payload: UserPayload): string {
    const token = jwt.sign(payload, secret, {expiresIn: '1h'});
    return token
};

export function generateRefreshToken(payload: UserPayload): string {
    const token = jwt.sign(payload, secret, {expiresIn: '1d'});
    return token
};