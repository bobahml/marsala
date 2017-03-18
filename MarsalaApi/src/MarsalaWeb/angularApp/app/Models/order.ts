export interface IOrder {
    UserName: string;
    PaymentMethod: PaymentMethod;
    Salad: string;
    Soup: string;
    MainCourse: string;
    Drink: string;
    Snacks: string[];
}

export class Order implements IOrder {
    UserName: string;
    PaymentMethod: PaymentMethod;
    Salad: string;
    Soup: string;
    MainCourse: string;
    Drink: string;
    Snacks: string[] = [];
}

export enum PaymentMethod {
    Cash = 1,
    Card = 2
}

export interface ICourse {
    name: string;
    count: number;
}

export interface ISummary {
    orders: IOrder[];
    orderText: string;
    Salad: ICourse[];
    Soup: ICourse[];
    MainCourse: ICourse[];
    Drink: ICourse[];
    Snacks: ICourse[];
}

export class Summary {
    orders: IOrder[] = [];
    orderText: string = "";
    Salad: ICourse[] = [];
    Soup: ICourse[] = [];
    MainCourse: ICourse[] = [];
    Drink: ICourse[] = [];
    Snacks: ICourse[] = [];
}

export interface IOrderSentStatus {
    SenderName: string;
    StatusText: string;
    IsSuccess: boolean;
    SentDate: Date;
}