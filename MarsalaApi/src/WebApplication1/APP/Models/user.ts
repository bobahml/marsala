export class User {
    UserName: string;
    Password: string;
}

export interface RegisterUser {
    UserName: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
}


export interface IUserToken {
    userName: string;
    email: string;
    token: string;
}