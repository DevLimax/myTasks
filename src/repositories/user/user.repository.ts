import type User from "../../models/entities/user";

export type UserUpdateInput = {
    newUsername?: string,
    newEmail?: string,
    newPassword?: string
}

export interface UserRepository {
    save(user: User): Promise<User>
    list(): Promise<User[]>
    update(id: string, data: UserUpdateInput): Promise<User>
    find(id?: string, email?: string): Promise<User | null>
    delete(id: string): Promise<void>
}