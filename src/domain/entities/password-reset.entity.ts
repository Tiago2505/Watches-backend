


export interface PasswordReset{

    id: number;
    code: string;
    createdAt: Date;
    expiresAt: Date;
    used: boolean;
    userId: number;

}