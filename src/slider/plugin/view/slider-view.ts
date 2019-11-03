import { DriverHorizontal } from './drivers/slider-driver-horizontal';
import * as $ from 'jquery';
import { DriverVertical } from './drivers/slider-driver-vertical';

export function createPoint(type?: 'min' | 'max'): JQuery {
    return $('<div/>', {
        class: 'slider__point',
        "data-type": type || ''
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
    private _pointSelected: 'min' | 'max' | null;
    private _lastModelState: SliderModelPointsState;
    private _prettify: PrettifyFunc;
    private _showBgLine: boolean;
    private readonly _bgLine: JQuery;
    private _showScale: boolean;
    private readonly _scaleElement: JQuery;
    private readonly _scale: SliderScale;

    constructor(slider: JQuery, config: SliderViewConfig) {
        this._slider = slider;
        this._isShowValue = config.showValue;
        this._mode = config.selectMode;
        this._pointContainer = slider.find('.slider__container');
        this._pointSelected = null;
        this._prettify = config.prettify || ((value: string): string => {
            return value;
        });
        this._showBgLine = config.showBgLine;
        this._showScale = config.showScale;
        this._scale = config.scale;

        if (config.selectMode === 'single') {
            this._points = [createPoint()];
            this._tooltips = [createTooltip()];
        } else {
            this._points = [createPoint('min'), createPoint('max')];
            this._tooltips = [createTooltip(), createTooltip()];
            this._points[1].css('z-index', 5);
        }

        this._showTooltips(this._isShowValue);
        this._pointContainer.append(this._points);
        this._slider.find('.slider__tooltips-container').append(this._tooltips);

        if (this._showBgLine) {
            this._bgLine = $('<div/>', {
                class: 'slider__bg-line'
            });
            this._pointContainer.append(this._bgLine);
        }

        if (this._showScale) {
            this._scaleElement = $('<div/>', {
                class: 'slider__scale'
            });
            this._pointContainer.append(this._scaleElement);
        }

        switch (config.viewName) {
            case 'vertical':
                this._driver = new DriverVertical();
                this._slider.addClass('slider_vertical');
                break;
            // default - 'horizontal'
            default:
                this._driver = new DriverHorizontal();
                break;
        }
    }

    public onMouseMove(callback: SliderCallbackMouseEvent): void {
        this._dataStateCallback = callback;
        const _this: SliderView = this;

        const mouseHandler = (event: JQuery.Event): boolean => {
            const points: SliderPointState[] = [];
            for (let i = 0; i < this._points.length; i++) {
                points.push({
                    position: this._driver.getPointPosition(
                        this._points[i],
                        this._pointContainer
                    )
                });
            }

            this._dataStateCallback({
                targetPosition: this._driver.getTargetPosition(
                    event, this._pointContainer),
                points: points,
                pointSelected: this._pointSelected
            });
            return true;
        }

        this._pointContainer.mousedown(mouseHandler);
        this._points.forEach((item: JQuery): void => {
            item.mousedown(function (): void {
                if (this.dataset['type'] === 'min') {
                    _this._pointSelected = 'min';
                    _this._points[0].css('z-index', 6);
                }

                if (this.dataset['type'] === 'max') {
                    _this._pointSelected = 'max';
                    _this._points[0].css('z-index', 4);
                }

                $(document).mousemove(mouseHandler);
                $(document).one('mouseup', () => {
                    _this._pointSelected = null;
                    $(document).off('mousemove', mouseHandler);
                });
            });
        })
    }

    public update(points: SliderModelPointsState): void {
        this._lastModelState = points;

        for (let i: number = 0; i < points.length; i++) {
            this._driver.setPointPosition(
                this._points[i],
                this._pointContainer,
                points[i].position);
        }

        if (this._isShowValue) {
            this._updateTooltips(points);
        }

        if (this._showBgLine) {
            this._driver.updateBgLine(this._bgLine, this._pointContainer, points);
        }
    }

    private _updateTooltips(points: SliderModelPointsState): void {
        for (let i: number = 0; i < points.length; i++) {
            this._driver.updateTooltip(
                this._tooltips[i],
                this._pointContainer,
                points[i].position,
                this._prettify(points[i].value));
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
            if (state && this._lastModelState) {
                this._updateTooltips(this._lastModelState);
            }
        });
    }
}