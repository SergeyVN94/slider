import {DriverHorizontal} from './drivers/slider-driver-horizontal';
import * as $ from 'jquery';

export function createPoint(): JQuery {
    return $('<div/>', {
        class: 'slider__point'
    });
}

export function createTooltip(): JQuery {
    return $('<div/>', {
        class: 'slider__tooltip'
    });
}

export class SliderView implements ISliderView {
    private readonly _driver: SliderViewDriver;
    private readonly _slider: JQuery;
    private readonly _pointContainer: JQuery;
    private _dataStateCallback: SliderCallbackMouseEvent;
    private _points: [JQuery] | [JQuery, JQuery];
    private _tooltips: [JQuery] | [JQuery, JQuery];
    private _isShowValue: boolean;
    private _mode: SliderMode;

    constructor(slider: JQuery, config: SliderViewConfig) {        
        this._slider = slider;
        this._isShowValue = config.showValue;
        this._mode = config.selectMode;
        this._pointContainer = slider.find('.slider__container');
        
        if (config.selectMode === 'single') {
            this._points = [createPoint()];
            this._tooltips = [createTooltip()];
        } else {
            this._points = [createPoint(), createPoint()];
            this._tooltips = [createTooltip(), createTooltip()];
        }

        this._showTooltips(this._isShowValue);
        this._pointContainer.append(this._points);
        this._slider.find('.slider__tooltips-container').append(this._tooltips );

        switch (config.viewName) {
            // default - 'horizontal'
            default:
                this._driver = new DriverHorizontal();
                break;
        }
    }

    public onMouseMove(callback: SliderCallbackMouseEvent): void {
        this._dataStateCallback = callback;

        const mouseHandler = (event: JQuery.Event): boolean => {
            let state: SliderViewStateData;
            const targetPosition: number = this._driver.getTargetPosition(
                event, this._pointContainer);
            
            if (this._mode === 'single') {
                state = {
                    mode: 'single',
                    targetPosition: targetPosition,
                    pointPosition: this._driver.getPointPosition(this._points[0], this._pointContainer)
                };
            } else {
                state = {
                    mode: 'range',
                    targetPosition: targetPosition,
                    pointPosition: [
                        this._driver.getPointPosition(this._points[0], this._pointContainer),
                        this._driver.getPointPosition(this._points[1], this._pointContainer)
                    ]
                };
            }
            
            this._dataStateCallback(state);
            return true;
        }

        this._pointContainer.mousedown(mouseHandler);
        this._points.forEach((item: JQuery): void => {
            item.mousedown((): void => {
                $(document).mousemove(mouseHandler);
                $(document).one('mouseup', () => {
                    $(document).off('mousemove', mouseHandler);
                });
            });
        })
    }

    public update(state: SliderModelStateData): void {
        if (state.mode === 'single') {
            this._driver.setPointPosition(this._points[0], this._pointContainer, state.pointPosition);
            if (this._isShowValue) {
                this._driver.updateTooltip(
                    this._tooltips[0], this._pointContainer, state.pointPosition, state.pointValue);
            }
        } else {
            this._driver.setPointPosition(this._points[0], this._pointContainer, state.pointPosition[0]);
            this._driver.setPointPosition(this._points[1], this._pointContainer, state.pointPosition[1]);
            if (this._isShowValue) {
                this._driver.updateTooltip(
                    this._tooltips[0], this._pointContainer, state.pointPosition[0], state.pointValue[0]);
                this._driver.updateTooltip(
                    this._tooltips[1], this._pointContainer, state.pointPosition[1], state.pointValue[1]);
            }
        }
    }

    public showValue(state?: boolean): void | boolean {
        if (state === undefined) {
            return this._isShowValue;
        }

        this._isShowValue = state;
        this._showTooltips(this._isShowValue);
    }

    private _showTooltips(state?: boolean): void {
        this._tooltips.forEach((item: JQuery): void => {
            item.toggleClass('slider__display_hide', !state);
        });
    }
}