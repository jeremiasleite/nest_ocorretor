import { Document } from 'mongoose';

export interface User extends Document {
    readonly username: string
    readonly email: string
    readonly password: string
    readonly isActive: boolean
    readonly createdAt: Date
    readonly tokenPasswordReset: string
    readonly expiresPasswordReset: Date
}