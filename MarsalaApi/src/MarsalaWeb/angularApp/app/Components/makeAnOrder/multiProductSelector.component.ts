// Based on https://github.com/softsimon/angular-2-dropdown-multiselect
import { Component, OnInit, HostListener, Input, ElementRef, Output, EventEmitter } from "@angular/core";
import { Product } from "../../Models/product";

export interface IMultiSelectSettings {
    pullRight?: boolean;
    buttonClasses?: string;
    selectionLimit?: number;
    closeOnSelect?: boolean;
    showCheckAll?: boolean;
    showUncheckAll?: boolean;
    dynamicTitleMaxItems?: number;
    maxHeight?: string;
}

export interface IMultiSelectTexts {
    checkAll?: string;
    uncheckAll?: string;
    checked?: string;
    checkedPlural?: string;
    defaultTitle?: string;
}

@Component({
    moduleId: module.id,
    selector: "multiselect-dropdown",
    styles: ["a { outline: none; }"],
    templateUrl: "multiProductSelector.component.html"
})
export class MultiselectDropdown implements OnInit {
    title: string;
    @Input() product: Product;
    @Input() settings: IMultiSelectSettings;
    @Input() texts: IMultiSelectTexts;
    @Output() selectionLimitReached = new EventEmitter();

    private numSelected: number = 0;
    private isVisible: boolean = false;
    private defaultSettings: IMultiSelectSettings = {
        pullRight: false,
        buttonClasses: "btn btn-default",
        selectionLimit: 0,
        closeOnSelect: false,
        showCheckAll: false,
        showUncheckAll: true,
        dynamicTitleMaxItems: 3,
        maxHeight: "300px"
    };
    private defaultTexts: IMultiSelectTexts = {
        checkAll: "Check all",
        uncheckAll: "Uncheck all",
        checked: "checked",
        checkedPlural: "checked",
        defaultTitle: "Select"
    };

    constructor(
        private element: ElementRef
    ) { }

    ngOnInit() {
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.texts = Object.assign(this.defaultTexts, this.texts);
        this.updateNumSelected();
    }

    @HostListener("document: click", ["$event.target"])
    onClick(target: any) {
        let parentFound = false;
        while (target !== null && !parentFound) {
            if (target === this.element.nativeElement) {
                parentFound = true;
            }
            if (target) {
                target = target.parentElement;
            }
        }
        if (!parentFound) {
            this.isVisible = false;
        }
    }

    toggleDropdown() {
        this.isVisible = !this.isVisible;
    }

    isSelected(option: string): boolean {
        return this.product.values.indexOf(option) > -1;
    }

    setSelected(option: string) {

        const index = this.product.values.indexOf(option);
        if (index > -1) {
            this.product.values.splice(index, 1);
        } else {
            if (this.settings.selectionLimit === 0 || this.product.values.length < this.settings.selectionLimit) {
                this.product.values.push(option);
            } else {
                this.selectionLimitReached.emit(this.product.values.length);
                return;
            }
        }
        if (this.settings.closeOnSelect) {
            this.toggleDropdown();
        }
        this.updateNumSelected();
    }

    updateNumSelected() {
        if (this.product && this.product.values) {
            this.numSelected = this.product.values.length;
        } else {
            this.numSelected = 0;
        }


        this.title = this.getTitle();
    }

    checkAll() {
        this.product.values = this.product.collection.slice();
        this.updateNumSelected();
    }

    uncheckAll() {
        this.product.values = [];
        this.updateNumSelected();
    }

    private getTitle() {
        if (this.numSelected === 0) {
            return this.texts.defaultTitle;
        }
        if (this.settings.dynamicTitleMaxItems >= this.numSelected) {
            return this.product.collection.filter((option: string) => this.product.values.indexOf(option) > -1).join(", ");
        }
        return this.numSelected + " " + (this.numSelected === 1 ? this.texts.checked : this.texts.checkedPlural);
    }


}