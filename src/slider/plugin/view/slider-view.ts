import {DriverHorizontal} from './drivers/slider-driver-horizontal';
import * as $ from 'jquery';

export function createPoint(): JQuery {
    return $('<div/>', {
        class: 'slider__point'
    });
}

export function createPointDisplay(): JQuery {
    return $('<div/>', {
        class: 'slider__value'
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