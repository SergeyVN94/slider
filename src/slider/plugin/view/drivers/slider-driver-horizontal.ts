import { createPoint } from '../slider-view';

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

    public onMouseMove(callback: SliderCallbackMouseEvent) {
        this._callback = callback;

        const mouseHandler = (event: JQuery.Event): boolean => {
            this._callback(this._getSliderState(event.pageX));
            return true;
        }

        this._sliderContainer.mousedown(mouseHandler);
    }

    private _getPointPosition(point: JQuery): number {
        const sliderLeft: number = this._slider.offset().left;
        let pointLeft: number = point.offset().left + (point.outerWidth() / 2);
        pointLeft -= Number.parseInt(this._slider.css('border-left-width'));

        return pointLeft - sliderLeft;
    }

    private _getSliderState(globalMousePosition: number): SliderStateData {
        const sliderWidth: number = this._sliderContainer.outerWidth();
        const mousePosition: number = (globalMousePosition - this._slider.offset().left);

        let position: number | [number, number];
        if (this._setting.selectMode === 'single') {
            position = this._getPointPosition(this._point) / sliderWidth;
        } else {
            position = [
                this._getPointPosition(this._points.min) / sliderWidth,
                this._getPointPosition(this._points.max) / sliderWidth,
            ];
        }

        return {
            targetPosition: mousePosition / sliderWidth,
            pointPosition: position
        };
    }

    public update(state: SliderModelStateData): void {
        this._updatePointPosition(state.pointPosition);
    }

    private _updatePointPosition(position: number | [number, number]): void {
        const sliderWidth: number = this._sliderContainer.outerWidth();
        
        if (this._setting.selectMode === 'single') {
            const pointWidth: number = this._point.outerWidth();
            let marginLeft: number = (position as number) * sliderWidth;
            marginLeft -= (pointWidth / 2);
            this._point.css('left', `${marginLeft}px`);
        }
    }
}