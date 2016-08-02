import { Component, Input} from "@angular/core";
import {Product} from "../../Models/product";


@Component({
    selector: "collection-selector",
    templateUrl: "./app/components/makeAnOrder/productSelector.component.html"
})

export class CollectionSelectorComponent  {
    @Input() product: Product;

	isSelected(value: string): boolean {
		return this.product.value === value;
	}

    select(value: string) {
	    this.product.value = value;
    }
   
}