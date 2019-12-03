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
    isShowBgLine: boolean;
    selectMode: SliderMode;
}

interface DomElements {
    $slider: JQuery;
    points: JQuery[];
    tooltips: JQuery[];
    $pointContainer: JQuery;
    $tooltipContainer: JQuery;
    $bgLine: JQuery;
}

class SliderView implements SliderView {
    private readonly _driver: SliderViewDriver;
    private readonly _domElements: DomElements;
    private _flags: Flags;
    private readonly _updateEventCallbackList: HandlerSliderViewSelect[];
    private _pointSelected: 'min' | 'max' | null;
    private _lastModelState: SliderModelPointsState;
    private readonly _prettify: PrettifyFunc;

    constructor(config: SliderViewConfig) {
        this._flags = this._createFlags(config);
        this._domElements = this._createDomElements(config);
        this._updateEventCallbackList = [];
        this._pointSelected = null;
        this._prettify =
            config.prettify ||
            ((value: string): string => {
                return value;
            });
        this._driver = this._createDriver(config.viewName);

        this._initDomElements();

        this._showTooltips(this._flags.isShowTooltips);
    }

    public get isShowTooltips(): boolean {
        return this._flags.isShowTooltips;
    }

    public set isShowTooltips(state: boolean) {
        this._flags.isShowTooltips = state;
        this._showTooltips(this._flags.isShowTooltips);

        if (state && this._lastModelState) {
            this._updateTooltips(this._lastModelState);
        }
    }

    public onSelect(callback: HandlerSliderViewSelect): void {
        this._updateEventCallbackList.push(callback);
    }

    public update(points: SliderModelPointsState): void {
        this._lastModelState = points;

        points.forEach((point, index) => {
            this._driver.setPointPosition(
                this._domElements.points[index],
                this._domElements.$pointContainer,
                point.position
            );
        });

        if (this._flags.isShowTooltips) {
            this._updateTooltips(points);
        }

        if (this._flags.isShowBgLine) {
            this._driver.updateBgLine(
                this._domElements.$bgLine,
                this._domElements.$pointContainer,
                points
            );
        }
    }

    private _initDomElements(): void {
        this._domElements.$pointContainer.on(
            'mousedown.slider.downHandler',
            this._mouseDownHandler.bind(this)
        );

        this._domElements.$pointContainer.append(
            this._domElements.points,
            this._domElements.$bgLine
        );
        this._domElements.$tooltipContainer.append(this._domElements.tooltips);
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
        domElements.tooltips.push(createTooltip());

        if (config.selectMode === 'range') {
            domElements.points.push(createPoint('max'));
            domElements.tooltips.push(createTooltip());
        }

        return domElements;
    }

    private _createFlags(config: SliderViewConfig): Flags {
        return {
            isShowTooltips: config.showTooltips,
            selectMode: config.selectMode,
            isShowBgLine: config.showBgLine,
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

        this._domElements.points.forEach((point) => {
            points.push({
                position: this._driver.getPointPosition(point, this._domElements.$pointContainer),
            });
        });

        return {
            points,
            targetPosition: this._driver.getTargetPosition(e, this._domElements.$pointContainer),
            pointSelected: this._pointSelected,
        };
    }

    private _emitSelectEvent(this: SliderView, e: JQuery.Event): void {
        this._updateEventCallbackList.forEach((callback) => {
            callback(this._getViewState(e));
        });
    }

    private _mouseMoveHandler(this: SliderView, e: JQuery.Event): void {
        this._emitSelectEvent(e);
    }

    private _mouseDownHandler(this: SliderView, e: JQuery.MouseDownEvent): void {
        const target = $(e.target);

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

            $(document).on('mousemove.slider.moveHandler', this._mouseMoveHandler.bind(this));
            $(document).one('mouseup.slider.upHandler', this._mouseUpHandler.bind(this));
        }
    }

    private _mouseUpHandler(this: SliderView): void {
        this._pointSelected = null;
        $(document).off('mousemove.slider.moveHandler');
    }

    private _updateTooltips(points: SliderModelPointsState): void {
        points.forEach((point, index) => {
            this._driver.updateTooltip(
                this._domElements.tooltips[index],
                this._domElements.$tooltipContainer,
                point.position,
                this._prettify(point.value.toString())
            );
        });
    }

    private _showTooltips(state: boolean): void {
        this._domElements.tooltips.forEach((tooltip) => {
            tooltip.toggleClass('slider__tooltip_hide', !state);
        });
    }
}

export { SliderView, createPoint, createTooltip };
