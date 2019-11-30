import * as $ from 'jquery';

import { DriverHorizontal } from './drivers/slider-driver-horizontal';
import { DriverVertical } from './drivers/slider-driver-vertical';

function createPoint(type?: 'min' | 'max'): JQuery {
    return $('<div/>', {
        class: 'slider__point',
        'data-type': type || '',
    });
}

function createTooltip(): JQuery {
    return $('<div/>', {
        class: 'slider__tooltip',
    });
}

interface Flags {
    isShowTooltips: boolean;
    selectMode: SliderMode;
    showBgLine: boolean;
}

interface DomElements {
    $slider: JQuery;
    points: JQuery[];
    tooltips: JQuery[];
    $pointContainer: JQuery;
    $tooltipContainer: JQuery;
    $bgLine: JQuery;
}

type MouseEventHandler = (t: JQuery.Event) => void;

class SliderView implements SliderView {
    private readonly _driver: SliderViewDriver;
    private readonly _domElements: DomElements;
    private _flags: Flags;
    private readonly _dataStateCallbacks: SliderViewSelectEventCallback[];
    private _pointSelected: 'min' | 'max' | null;
    private _lastModelState: SliderModelPointsState;
    private readonly _prettify: PrettifyFunc;
    private readonly _mouseMoveHandlerBind: MouseEventHandler;
    private readonly _mouseDownHandlerBind: MouseEventHandler;

    constructor(config: SliderViewConfig) {
        this._flags = this._createFlags(config);
        this._domElements = this._createDomElements(config);
        this._dataStateCallbacks = [];
        this._pointSelected = null;
        this._prettify =
            config.prettify ||
            ((value: string): string => {
                return value;
            });
        this._driver = this._createDriver(config.viewName);

        this._mouseDownHandlerBind = this._mouseDownHandler.bind(this);
        this._mouseMoveHandlerBind = this._mouseMoveHandler.bind(this);
        this._domElements.$pointContainer.mousedown(this._mouseDownHandlerBind);

        this._domElements.$pointContainer.append(
            this._domElements.points,
            this._domElements.$bgLine
        );
        this._domElements.$tooltipContainer.append(this._domElements.tooltips);

        this._showTooltips(this._flags.isShowTooltips);
    }

    public onSelect(callback: SliderViewSelectEventCallback): void {
        this._dataStateCallbacks.push(callback);
    }

    public update(points: SliderModelPointsState): void {
        this._lastModelState = points;

        for (let i = 0; i < points.length; i++) {
            this._driver.setPointPosition(
                this._domElements.points[i],
                this._domElements.$pointContainer,
                points[i].position
            );
        }

        if (this._flags.isShowTooltips) {
            this._updateTooltips(points);
        }

        if (this._flags.showBgLine) {
            this._driver.updateBgLine(
                this._domElements.$bgLine,
                this._domElements.$pointContainer,
                points
            );
        }
    }

    public showTooltips(state: boolean = null): void | boolean {
        if (state === null) {
            return this._flags.isShowTooltips;
        }

        this._flags.isShowTooltips = state;
        this._showTooltips(this._flags.isShowTooltips);

        if (state && this._lastModelState) {
            this._updateTooltips(this._lastModelState);
        }
    }

    private _createDomElements(config: SliderViewConfig): DomElements {
        const domElements: DomElements = {
            $slider: config.$slider,
            points: [],
            tooltips: [],
            $tooltipContainer: config.$slider.find('.slider__tooltip-container'),
            $pointContainer: config.$slider.find('.slider__point-container'),
            $bgLine: $('<div/>', {
                class: 'slider__bg-line',
            }),
        };

        domElements.points.push(createPoint('min'));
        if (config.selectMode === 'range') {
            domElements.points.push(createPoint('max'));
        }

        domElements.tooltips.push(createTooltip());
        if (config.selectMode === 'range') {
            domElements.tooltips.push(createTooltip());
        }

        return domElements;
    }

    private _createFlags(config: SliderViewConfig): Flags {
        return {
            isShowTooltips: config.showTooltips,
            selectMode: config.selectMode,
            showBgLine: config.showBgLine,
        };
    }

    private _createDriver(viewName: SliderViewName): SliderViewDriver {
        switch (viewName) {
            case 'vertical':
                this._domElements.$slider.addClass('slider_theme_vertical');
                return new DriverVertical();
            // default - 'horizontal'
            default:
                return new DriverHorizontal();
        }
    }

    private _getViewState(e: JQuery.Event): SliderViewState {
        const points: SliderPointState[] = [];

        for (const point of this._domElements.points) {
            points.push({
                position: this._driver.getPointPosition(point, this._domElements.$pointContainer),
            });
        }

        return {
            targetPosition: this._driver.getTargetPosition(e, this._domElements.$pointContainer),
            points: points,
            pointSelected: this._pointSelected,
        };
    }

    private _emitSelectEvent(e: JQuery.Event): void {
        for (const callback of this._dataStateCallbacks) {
            callback(this._getViewState(e));
        }
    }

    private _mouseMoveHandler(e: JQuery.Event): void {
        this._emitSelectEvent(e);
    }

    private _mouseDownHandler(e: JQuery.MouseDownEvent): void {
        const target: JQuery = $(e.target);

        if (!target.hasClass('slider__point')) {
            this._emitSelectEvent(e);
        } else {
            this._pointSelected = e.target.dataset.type as 'min' | 'max';

            if (this._pointSelected === 'min') {
                this._domElements.points[0].css('z-index', 6);
            }

            if (this._pointSelected === 'max') {
                this._domElements.points[0].css('z-index', 4);
            }

            $(document).mousemove(this._mouseMoveHandlerBind);
            $(document).one('mouseup', this._mouseUpHandler.bind(this));
        }
    }

    private _mouseUpHandler(): void {
        this._pointSelected = null;
        $(document).off('mousemove', this._mouseMoveHandlerBind);
    }

    private _updateTooltips(points: SliderModelPointsState): void {
        for (let i = 0; i < points.length; i++) {
            this._driver.updateTooltip(
                this._domElements.tooltips[i],
                this._domElements.$tooltipContainer,
                points[i].position,
                this._prettify(points[i].value)
            );
        }
    }

    private _showTooltips(state?: boolean): void {
        this._domElements.tooltips.forEach((tooltip: JQuery): void => {
            tooltip.toggleClass('slider__tooltip_hide', !state);
        });
    }
}

export { SliderView, createPoint, createTooltip };
