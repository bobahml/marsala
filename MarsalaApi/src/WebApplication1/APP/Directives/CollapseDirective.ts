import { Directive, Input, ElementRef } from "@angular/core";

@Directive({
	selector: "[collapse]",
	host: {
		"[class.in]": "isExpanded",
		"[class.collapse]": "isCollapse",
		"[class.collapsing]": "isCollapsing",
		"[attr.aria-expanded]": "isExpanded",
		"[attr.aria-hidden]": "isCollapsed",
		"[style.height]": "height"
	}
})
export class CollapseDirective {
	// style
	private height: string;
	// classes
	// shown
	private isExpanded: boolean = true;
	// hidden
	private isCollapsed: boolean = false;
	// stale state
	private isCollapse: boolean = true;
	// animation state
	private isCollapsing: boolean = false;

	@Input() set collapse(value: boolean) {
		this.isExpanded = value;
		this.toggle();
	}

	constructor(private el: ElementRef) {
	}


	toggle() {
		if (this.isExpanded) {
			this.hide();
		} else {
			this.show();
		}
	}

	hide() {
		this.isCollapse = false;
		this.isCollapsing = true;

		this.isExpanded = false;
		this.isCollapsed = true;
		setTimeout(() => {
			this.height = "0";
			this.isCollapse = true;
			this.isCollapsing = false;
		}, 4);
	}

	show() {
		this.isCollapse = false;
		this.isCollapsing = true;

		this.isExpanded = true;
		this.isCollapsed = false;
		setTimeout(() => {
			this.height = "auto";

			this.isCollapse = true;
			this.isCollapsing = false;
		}, 4);
	}
}