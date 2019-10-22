import $ from 'jquery';

export interface ISlider {
    readonly _slider: JQuery;
}

export class Slider implements ISlider {
    readonly _slider: JQuery;

    constructor(selector: string) {
        this._slider = $(selector);    
    }
}