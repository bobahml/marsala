export interface IOrder {
    UserName: string; 

    Salad: string;
    Soup: string;
    MainCourse: string;
    Drink: string;
}

export class Order implements IOrder {
    UserName: string;

    Salad: string;
    Soup: string;
    MainCourse: string;
    Drink: string;
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
}

export class Summary {
    orders: IOrder[] = [];
	orderText: string = "";
    Salad: ICourse[] = [];
    Soup: ICourse[] = [];
    MainCourse: ICourse[] = [];
    Drink: ICourse[] = [];
}