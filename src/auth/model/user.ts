export enum UserRole {
    ADMIN = 'admin',
    SELLER = 'seller',
    BUYER = 'buyer'
}

type User = {
    id: string;
    email: string;
    password: string;
    role: UserRole;
}


export interface IAuthenticate{
    readonly user : User;
    readonly token : string;
}
