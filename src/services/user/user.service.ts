export type UserOutputDto = {
    id: string,
    username: string,
    email: string,
    lastLogin: Date | null
};

export type ListOutputDto = {
    users: {
        id: string,
        username: string,
        email: string,
        lastLogin: Date | null
    }[];
};

export interface UserService {
    save(username: string, email: string, password: string): Promise<UserOutputDto>;
    list(): Promise<ListOutputDto>;
    find(id: string): Promise<UserOutputDto | null>
    update(id: string, {newUsername, newEmail}: {newUsername?: string, newEmail?: string}): Promise<UserOutputDto>;
    updatePassword(id: string, newPassword: string): Promise<UserOutputDto>;
    delete(id: string): Promise<void>;
};