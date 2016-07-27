export class Product {

    constructor(productType: string) {
        this.header = productType;
    }

    header: string;
    collection: string[];
    value: string;

    setCollection(coll: string[]) {
        this.collection = coll;
        this.value = this.firsOrEmpty(this.collection);
    }

    private firsOrEmpty(coll: string[]): string {
        return coll && coll.length > 0 ? coll[0] : "";
    }

    weigt(): number {
        return this.value && this.value.length ? 1 : 0;
    }

    hasValue(): boolean {
        return this.value && this.value.length > 0;
    }
}