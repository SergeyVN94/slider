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
    readonly _driver: SliderViewDriver;
    _dataStateCallback: SliderCallbackMouseEvent;
    readonly _sliderContainer: JQuery;

    constructor(slider: JQuery, config: SliderViewConfig) {
        const driverConfig: SliderViewDriverConfig = {
            selectMode: config.selectMode || 'single',
            showValue: config.showValue === undefined ? true : config.showValue
        }
        this._sliderContainer = slider.find('.slider__container');

        switch (config.viewName) {
            // default - 'horizontal'
            default:
                this._driver = new DriverHorizontal(slider, driverConfig);
                break;
        }
    }

    public onMouseMove(callback: SliderCallbackMouseEvent): void {
        this._dataStateCallback = callback;

        const mouseHandler = (event: JQuery.Event): boolean => {
            const state: SliderStateData = this._driver.getState(event);
            this._dataStateCallback(state);
            return true;
        }

        this._sliderContainer.mousedown(mouseHandler);
        this._sliderContainer.mousedown(() => {
            $(document).mousemove(mouseHandler);
            $(document).one('mouseup', () => {
                $(document).off('mousemove', mouseHandler);
            });
        });
    }

    public update(state: SliderModelStateData): void {
        this._driver.update(state);
    }
}