import * as $ from 'jquery';
import { createPoint } from './slider-view';

export class DriverHorizontal implements SliderViewDriver {
    _callback: SliderCallbackMouseEvent;
    readonly _slider: JQuery;
    _setting: SliderViewDriverSetting;
    readonly _point: JQuery;
    readonly _points: {
        min: JQuery;
        max: JQuery;
    };
    readonly _sliderContainer: JQuery;

    constructor(slider: JQuery, config: SliderViewDriverConfig) {
        this._slider = slider;
        this._setting = {
            selectMode: config.selectMode,
            showValue: config.showValue
        };
        this._sliderContainer = this._slider.find('.slider__container');

        if (config.selectMode === 'single') {
            this._point = createPoint();
            slider.find('.slider__container').append(this._point);
        } else {
            slider.addClass('slider_range');
            this._points = {
                min: createPoint('min'),
                max: createPoint('max')
            };
            slider.find('.slider__container').append(this._points.min);
            slider.find('.slider__container').append(this._points.max);
        }
    }

    onMouseMove(callback: SliderCallbackMouseEvent) {
        this._callback = callback;

        const MouseHandler = (event: JQuery.Event): boolean => {
            if (event.button !== 0) {
                return false;
            }

            this._callback(this._getSliderState(event.pageX));

            return true;
        }

        this._slider.mousedown((event: JQuery.Event) => {
            // if (event.button !== 0) {
            //     return false;
            // }

            this._callback(this._getSliderState(event.pageX));
            this._sliderContainer.mousemove(MouseHandler);
        });

        // this._slider.mouseover((event: JQuery.Event) => {
        //     if (event.button !== 1) {
        //         return false;
        //     }

        //     this._callback(this._getSliderState(event.pageX));
        //     this._sliderContainer.mousemove(MouseHandler);
        // });

        this._slider.mouseup(() => {
            this._sliderContainer.off('mousemove', MouseHandler);
        });

        this._slider.mouseleave(() => {
            this._sliderContainer.off('mousemove', MouseHandler);
        });
    }

    _getPointPosition(point: JQuery): number {
        const sliderLeft: number = this._slider.offset().left;
        let pointLeft: number = point.offset().left + (point.outerWidth() / 2);
        pointLeft -= Number.parseInt(this._slider.css('border-left-width'));

        return pointLeft - sliderLeft;
    }

    _getSliderState(mousePosition: number): SliderStateData {
        const targetValue: number = mousePosition - this._slider.offset().left;

        if (this._setting.selectMode === 'single') {
            return {
                mode: this._setting.selectMode,
                position: this._getPointPosition(this._point),
                targetValue: targetValue
            };
        }

        return {
            mode: this._setting.selectMode,
            positionMin: this._getPointPosition(this._points.min),
            positionMax: this._getPointPosition(this._points.max),
            targetValue: targetValue
        };
    }
}