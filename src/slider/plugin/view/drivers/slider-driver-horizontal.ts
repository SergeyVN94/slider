import * as $ from 'jquery';

import { 
    createPoint,
    createPointDisplay
} from '../slider-view';

export class DriverHorizontal implements SliderViewDriver {
    _callback: SliderCallbackMouseEvent;
    readonly _slider: JQuery;
    _setting: SliderViewDriverSetting;
    readonly _point: JQuery;
    readonly _points: {
        min: JQuery;
        max: JQuery;
    };
    readonly _valueDisplay: JQuery;
    readonly _valueDisplays: {
        min: JQuery;
        max: JQuery;
    };
    readonly _sliderContainer: JQuery;
    readonly _prettify: PrettifyFunc;
    _lastModelState: SliderModelStateData;

    constructor(slider: JQuery, config: SliderViewDriverConfig) {
        this._slider = slider;
        this._setting = {
            selectMode: config.selectMode,
            showValue: config.showValue
        };
        this._sliderContainer = this._slider.find('.slider__container');
        this._prettify = config.prettify || null;

        if (config.selectMode === 'single') {
            this._point = createPoint();
            this._sliderContainer.append(this._point);

            this._valueDisplay = createPointDisplay();
            this._sliderContainer.append(this._valueDisplay);
            if (!config.showValue) {
                this._valueDisplay.addClass('slider__display_hide');
            }
        } else {
            slider.addClass('slider_range');
            this._points = {
                min: createPoint(),
                max: createPoint()
            };
            this._sliderContainer.append(this._points.min);
            this._sliderContainer.append(this._points.max);

            this._valueDisplays = {
                min: createPointDisplay(),
                max: createPointDisplay()
            };
            this._sliderContainer.append(this._valueDisplays.min);
            this._sliderContainer.append(this._valueDisplays.max);
            if (!config.showValue) {
                this._valueDisplays.min.addClass('slider__display_hide');
                this._valueDisplays.max.addClass('slider__display_hide');
            }
        }
    }

    private _getPointPosition(point: JQuery): number {
        const sliderLeft: number = this._sliderContainer.offset().left;
        const pointLeft: number = point.offset().left + (point.outerWidth() / 2);

        return pointLeft - sliderLeft;
    }

    public getState(event: JQuery.Event): SliderViewStateData {
        const sliderWidth: number = this._sliderContainer.width();
        const globalMousePosition: number = event.pageX;
        const mousePosition: number = (globalMousePosition - this._sliderContainer.offset().left);        
        let targetPosition: number = mousePosition / sliderWidth;
        if (targetPosition < 0) targetPosition = 0;
        if (targetPosition > 1) targetPosition = 1;

        if (this._setting.selectMode === 'single') {
            return {
                mode: 'single',
                targetPosition: targetPosition,
                pointPosition: this._getPointPosition(this._point) / sliderWidth
            }
        } else {
            return {
                mode: 'range',
                targetPosition: targetPosition,
                pointPosition:  [
                    this._getPointPosition(this._points.min) / sliderWidth,
                    this._getPointPosition(this._points.max) / sliderWidth,
                ]
            }
        }
    }

    public update(state: SliderModelStateData): void {
        this._lastModelState = state;

        if (state.mode === 'single') {
            this._updatePointPosition(state.pointPosition, this._point);
        } else {
            this._updatePointPosition(state.pointPosition[0], this._points.min);
            this._updatePointPosition(state.pointPosition[1], this._points.max);
        }

        if (this._setting.showValue) {
            if (state.mode === 'single') {
                this._updateDisplay(state.pointPosition, state.pointValue, this._valueDisplay);
            } else {
                this._updateDisplay(state.pointPosition[0], state.pointValue[0], this._valueDisplays.min);
                this._updateDisplay(state.pointPosition[1], state.pointValue[0], this._valueDisplays.max);
            }
        }
    }

    private _updatePointPosition(position: number, point: JQuery): void {
        const sliderWidth: number = this._sliderContainer.outerWidth();
        const pointOffset: number = point.outerWidth() / 2;
        const marginLeft: number = position * sliderWidth - pointOffset;
        point.css('left', `${marginLeft}px`);
    }

    private _updateDisplay(position: number, value: string | number, display: JQuery): void {
        const sliderWidth: number = this._sliderContainer.outerWidth();
        if (this._prettify) {
            value = this._prettify(value);
        }
        display.html(String(value).toString());
        const offset: number = position * sliderWidth - (display.outerWidth() / 2);
        this._valueDisplay.css('left', `${offset}px`);
    }

    public showValue(state?: boolean): void | boolean {
        this._setting.showValue = state;

        if (state) {
            if (this._setting.selectMode === 'single') {
                this._valueDisplay.removeClass('slider__display_hide');
            } else {
                this._valueDisplays.min.removeClass('slider__display_hide');
                this._valueDisplays.max.removeClass('slider__display_hide');
            }
            this.update(this._lastModelState);
        } else {
            if (this._setting.selectMode === 'single') {
                this._valueDisplay.addClass('slider__display_hide');
            } else {
                this._valueDisplays.min.addClass('slider__display_hide');
                this._valueDisplays.max.addClass('slider__display_hide');
            }
        }
    }
}