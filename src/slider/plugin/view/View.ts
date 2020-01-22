import * as $ from 'jquery';

import _DriverHorizontal from './drivers/DriverHorizontal';
import _DriverVertical from './drivers/DriverVertical';
import CLASSES from './classes';

const createPoint = function createPoint(index: number): JQuery {
    return $('<div/>', {
        class: 'slider__point js-slider__point',
        'data-index': index,
    });
};

const createTooltip = function createTooltip(): JQuery {
    return $('<div/>', {
        class: 'slider__tooltip',
    });
};

interface DomElements {
    $slider: JQuery;
    points: JQuery[];
    tooltips: JQuery[];
    $pointContainer: JQuery;
    $tooltipContainer: JQuery;
    $bgLine: JQuery;
    $document: JQuery<Document>;
}

class View implements SliderView {
    private readonly _driver: SliderViewDriver;
    private readonly _domElements: DomElements;
    private _flags: {
        showTooltips: boolean;
        showBgLine: boolean;
    };
    private _updateEventCallback: HandlerSliderViewSelect;
    private _pointSelected: number;
    private _pointStates: SliderPointState[];
    private readonly _prettify: PrettifyFunc;

    constructor(config: {
        $slider: JQuery;
        points?: number;
        showTooltips?: boolean;
        showBgLine?: boolean;
        viewName?: 'horizontal' | 'vertical';
        prettify?: (value: number | string) => string;
    }) {
        const {
            $slider,
            points = 1,
            showTooltips = true,
            showBgLine = true,
            prettify = (value: string): string => {
                return value;
            },
            viewName = 'horizontal',
        } = config;

        this._flags = {
            showTooltips,
            showBgLine,
        };
        this._prettify = prettify;
        this._domElements = this._createDomElements($slider, points);
        this._updateEventCallback = null;
        this._pointSelected = -1;
        this._driver = this._createDriver(viewName);

        this._initDomElements();
        this._showTooltips(this._flags.showTooltips);
    }

    public get showTooltips(): boolean {
        return this._flags.showTooltips;
    }

    public set showTooltips(state: boolean) {
        this._flags.showTooltips = state;
        this._showTooltips(this._flags.showTooltips);

        if (state && this._pointStates) {
            this._updateTooltips(this._pointStates);
        }
    }

    public onSelect(callback: HandlerSliderViewSelect): void {
        this._updateEventCallback = callback;
    }

    public update(points: SliderPointState[]): void {
        this._pointStates = points;

        points.forEach((point, index) => {
            this._driver.setPointPosition(
                this._domElements.points[index],
                this._domElements.$pointContainer,
                point.position
            );
        });

        if (this._flags.showTooltips) {
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

    private _initDomElements(): void {
        this._domElements.$pointContainer.on(
            'mousedown.slider.update',
            this._mouseDownHandler.bind(this)
        );

        this._domElements.$pointContainer.append(
            this._domElements.points,
            this._domElements.$bgLine
        );
        this._domElements.$tooltipContainer.append(this._domElements.tooltips);
    }

    private _createDomElements($slider: JQuery, points: number): DomElements {
        const _domElements: DomElements = {
            $slider,
            points: [],
            tooltips: [],
            $tooltipContainer: $slider.find(`.${CLASSES.TOOLTIP_CONTAINER}`),
            $pointContainer: $slider.find(`.${CLASSES.POINT_CONTAINER}`),
            $bgLine: $('<div/>', {
                class: 'slider__bg-line',
            }),
            $document: $(document),
        };

        for (let i = 0; i < points; i += 1) {
            _domElements.points.push(
                createPoint(i).css('z-index', i + 4)
            );
            _domElements.tooltips.push(createTooltip());
        }

        return _domElements;
    }

    private _createDriver(viewName: SliderViewName): SliderViewDriver {
        switch (viewName) {
            case 'vertical':
                return new _DriverVertical(this._domElements.$slider);
            // default - 'horizontal'
            default:
                return new _DriverHorizontal();
        }
    }

    private _getViewState(ev: JQuery.Event): SliderViewState {
        return {
            targetPosition: this._driver.getTargetPosition(ev, this._domElements.$pointContainer),
            pointSelected: this._pointSelected,
        };
    }

    private _triggerSelectEvent(ev: JQuery.Event): void {
        if (this._updateEventCallback !== null) {
            this._updateEventCallback(this._getViewState(ev));
        }
    }

    private _mouseDownHandler(ev: JQuery.MouseDownEvent): void {
        const $target = $(ev.target);

        if (!$target.hasClass(CLASSES.POINT)) {
            this._triggerSelectEvent(ev);
        } else {
            this._pointSelected = parseInt($target.attr('data-index'), 10);

            this._domElements.$document
                .on('mousemove.slider.moveHandler', (): void => {
                    this._triggerSelectEvent(ev);
                })
                .one('mouseup.slider.upHandler', (): void => {
                    this._pointSelected = -1;
                    this._domElements.$document.off('mousemove.slider.moveHandler');
                });
        }
    }

    private _updateTooltips(points: SliderPointState[]): void {
        points.forEach((point, index) => {
            this._driver.updateTooltip(
                this._domElements.tooltips[index],
                this._domElements.$tooltipContainer,
                point.position,
                this._prettify(point.value)
            );
        });
    }

    private _showTooltips(state: boolean): void {
        this._domElements.tooltips.forEach((tooltip) => {
            tooltip.toggleClass(CLASSES.HIDE_TOOLTIPS, !state);
        });
    }
}

export default View;
export {
    createPoint,
    createTooltip,
};
