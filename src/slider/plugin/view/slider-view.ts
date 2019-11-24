import { DriverHorizontal } from './drivers/slider-driver-horizontal';
import * as $ from 'jquery';
import { DriverVertical } from './drivers/slider-driver-vertical';

function createPoint(type?: 'min' | 'max'): JQuery {
    return $('<div/>', {
        class: 'slider__point',
        "data-type": type || ''
    });
}

function createTooltip(): JQuery {
    return $('<div/>', {
        class: 'slider__tooltip'
    });
}

class SliderView implements ISliderView {
    private readonly _driver: SliderViewDriver;
    private readonly _slider: JQuery;
    private readonly _pointContainer: JQuery;
    private _dataStateCallback: SliderViewSelectEventCallback;
    private _points: JQuery[];
    private _tooltips: JQuery[];
    private _isShowValue: boolean;
    private _selectMode: SliderMode;
    private _pointSelected: 'min' | 'max' | null;
    private _lastModelState: SliderModelPointsState;
    private _prettify: PrettifyFunc;
    private _showBgLine: boolean;
    private readonly _bgLine: JQuery;
    private _showScale: boolean;
    private readonly _scaleElement: JQuery;
    private readonly _scale: SliderScale;
    private readonly _mouseMoveHandlerBind: any;
    private readonly _mouseDownHandlerBind: any;

    constructor(slider: JQuery, config: SliderViewConfig) {
        this._slider = slider;
        this._isShowValue = config.showValue;
        this._selectMode = config.selectMode;
        this._pointContainer = slider.find('.slider__container');
        this._pointSelected = null;
        this._prettify = config.prettify || ((value: string): string => {
            return value;
        });
        this._showBgLine = config.showBgLine;
        this._showScale = config.showScale;
        this._scale = config.scale;
        this._points = this._createPointsArray();
        this._tooltips = this._createTooltipsArray();

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

        this._mouseDownHandlerBind = this._mouseDownHandler.bind(this);
        this._mouseMoveHandlerBind = this._mouseMoveHandler.bind(this);
        this._pointContainer.mousedown(this._mouseDownHandlerBind);
    }

    private _createTooltipsArray() {
        const tooltips: JQuery[] = [];
        tooltips.push(createTooltip());

        if (this._selectMode === 'range') {
            tooltips.push(createTooltip());
        }

        return tooltips;
    }

    private _createPointsArray() {
        const points: JQuery[] = [];
        points.push(createPoint('min'));
        points[0].css('z-index', 6);

        if (this._selectMode === 'range') {
            points.push(createPoint('max'));
            points[1].css('z-index', 5);
        }

        return points;
    }

    public onSelect(callback: SliderViewSelectEventCallback): void {
        this._dataStateCallback = callback;
    }

    private _getViewState(event: JQuery.Event): SliderViewStateData {
        const points: SliderPointState[] = [];

        for (let i = 0; i < this._points.length; i++) {
            points.push({
                position: this._driver.getPointPosition(
                    this._points[i],
                    this._pointContainer
                )
            });
        }

        return {
            targetPosition: this._driver.getTargetPosition(
                event, this._pointContainer),
            points: points,
            pointSelected: this._pointSelected
        };
    }

    private _mouseMoveHandler(event: JQuery.Event): void {
        this._dataStateCallback(this._getViewState(event));
    }

    private _mouseDownHandler(event: JQuery.MouseDownEvent): void {
        const target: JQuery = $(event.target);

        if (!target.hasClass('slider__point')) {
            this._dataStateCallback(this._getViewState(event));
        } else {
            this._pointSelected = event.target.dataset['type'] as 'min' | 'max';

            if (this._pointSelected === 'min') {
                this._points[0].css('z-index', 6);
            } 
            
            if (this._pointSelected === 'max') {
                this._points[0].css('z-index', 4);
            }
    
            $(document).mousemove(this._mouseMoveHandlerBind);
            $(document).one('mouseup', this._mouseUpHandler.bind(this));
        }
    }

    private _mouseUpHandler(): void {
        this._pointSelected = null;
        $(document).off('mousemove', this._mouseMoveHandlerBind);
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

    public showTooltips(state?: boolean): void | boolean {
        if (state === undefined) {
            return this._isShowValue;
        }

        this._isShowValue = state;
        this._showTooltips(this._isShowValue);
    }

    private _showTooltips(state?: boolean): void {
        this._tooltips.forEach((item: JQuery): void => {
            item.toggleClass('slider__tooltip_hide', !state);
            if (state && this._lastModelState) {
                this._updateTooltips(this._lastModelState);
            }
        });
    }
}

export {
    SliderView,
    createPoint,
    createTooltip
};