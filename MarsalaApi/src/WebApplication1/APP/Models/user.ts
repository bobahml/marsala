export class User {
    username: string;
    password: string;
}


export interface IUserToken {
    username: string;
    email: string;
    token: string;
}