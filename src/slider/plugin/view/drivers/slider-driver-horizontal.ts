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

    constructor(slider: JQuery, config: SliderViewDriverConfig) {
        this._slider = slider;
        this._setting = {
            selectMode: config.selectMode,
            showValue: config.showValue
        };
        this._sliderContainer = this._slider.find('.slider__container');

        if (config.selectMode === 'single') {
            this._point = createPoint();
            this._sliderContainer.append(this._point);

            if (config.showValue) {
                this._valueDisplay = createPointDisplay();
                this._sliderContainer.append(this._valueDisplay);
            }
        } else {
            slider.addClass('slider_range');
            this._points = {
                min: createPoint(),
                max: createPoint()
            };
            this._sliderContainer.append(this._points.min);
            this._sliderContainer.append(this._points.max);

            if (config.showValue) {
                this._valueDisplays = {
                    min: createPointDisplay(),
                    max: createPointDisplay()
                };
                this._sliderContainer.append(this._valueDisplays.min);
                this._sliderContainer.append(this._valueDisplays.max);
            }
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
        const sliderLeft: number = this._sliderContainer.offset().left;
        const pointLeft: number = point.offset().left + (point.outerWidth() / 2);

        return pointLeft - sliderLeft;
    }

    private _getSliderState(globalMousePosition: number): SliderStateData {
        const sliderWidth: number = this._sliderContainer.width();
        const mousePosition: number = (globalMousePosition - this._sliderContainer.offset().left);        

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
        console.log(state);
        
        if (this._setting.selectMode === 'single') {
            this._updatePointPosition(state.pointPosition as number, this._point);
        } else {
            const position: [number, number] = state.pointPosition as [number, number];
            this._updatePointPosition(position[0], this._points.min);
            this._updatePointPosition(position[1], this._points.max);
        }

        
        if (this._setting.showValue) {
            if (this._setting.selectMode === 'single') {
                this._updateDisplay(state.pointPosition as number, state.pointValue as string, this._valueDisplay);
            } else {
                const position: [number, number] = state.pointPosition as [number, number];
                const value: [string, string] = state.pointValue as [string, string];
                this._updateDisplay(position[0], value[0], this._valueDisplays.min);
                this._updateDisplay(position[1], value[0], this._valueDisplays.max);
            }
        }
    }

    private _updatePointPosition(position: number, point: JQuery): void {
        const sliderWidth: number = this._sliderContainer.outerWidth();
        const pointOffset: number = point.outerWidth() / 2;
        const marginLeft: number = position * sliderWidth - pointOffset;
        point.css('left', `${marginLeft}px`);
    }

    private _updateDisplay(position: number, value: string, display: JQuery): void {
        const sliderWidth: number = this._sliderContainer.outerWidth();
        display.html(value);
        const offset: number = position * sliderWidth - (display.outerWidth() / 2);
        this._valueDisplay.css('left', `${offset}px`);
    }
}