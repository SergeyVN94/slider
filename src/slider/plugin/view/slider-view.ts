import {DriverHorizontal} from './drivers/slider-driver-horizontal';
import * as $ from 'jquery';

export function createPoint(type?: 'min' | 'max'): JQuery {
    return $('<div/>', {
        "data-type": type === undefined ? '' : type,
        class: 'slider__point'
    });
}

export class SliderView implements ISliderView {
    _driver: SliderViewDriver;

    constructor(slider: JQuery, config: SliderViewConfig) {
        
        const driverConfig: SliderViewDriverConfig = {
            selectMode: config.selectMode || 'single',
            showValue: config.showValue === undefined ? true : config.showValue
        }

        switch (config.viewName) {
            // default - 'horizontal'
            default:
                this._driver = new DriverHorizontal(slider, driverConfig);
                break;
        }
    }

    public onMouseMove(callback: SliderCallbackMouseEvent): void {
        this._driver.onMouseMove(callback);
    }

    public update(state: SliderModelStateData): void {
        this._driver.update(state);
    }
}