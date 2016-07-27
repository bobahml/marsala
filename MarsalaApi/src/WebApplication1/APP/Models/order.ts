export interface IOrder {

    userName: string; 

    salad: string;
    soup: string;
    mainCourse: string;
    drink: string;
}

export class Order implements IOrder {

    userName: string;

    salad: string;
    soup: string;
    mainCourse: string;
    drink: string;
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