export class User {
    username: string;
    password: string;
}

export interface RegisterUser {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}


export interface IUserToken {
    username: string;
    email: string;
    token: string;
}