export interface IDailyMenu {
    header: string;
    salad: string[];
    soup: string[];
    mainCourse: string[];
    drink: string[];
    snacks: string[];
}

export class DailyMenu implements IDailyMenu {
    header: string;
    salad: string[];
    soup: string[];
    mainCourse: string[];
    drink: string[];
    snacks: string[];

    constructor(header: string, salad: string[], soup: string[], mainCourse: string[], drink: string[]) {
        this.header = header;
        this.salad = salad;
        this.soup = soup;
        this.mainCourse = mainCourse;
        this.drink = drink;
    }
}