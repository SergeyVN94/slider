import DriverHorizontal from './drivers/DriverHorizontal';
import DriverVertical from './drivers/DriverVertical';
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

const createDriver: ISliderViewDriverFactory = function viewDriverFactory(
    viewName: ISliderViewName,
    $slider: JQuery
): ISliderViewDriver {
    switch (viewName) {
        case 'vertical':
            return new DriverVertical($slider);
        default:
            return new DriverHorizontal();
    }
};

const VIEW_NAMES: {
    [index: string]: 'horizontal' | 'vertical';
} = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
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

class View implements ISliderView, ISliderViewConfigManager {
    private _driver: ISliderViewDriver;
    private readonly _domElements: DomElements;
    private _flags: {
        showTooltips: boolean;
        showBgLine: boolean;
    };
    private _updateEventCallback: HandlerSliderViewSelect;
    private _pointSelected: number;
    private _pointStates: SliderPointState[];
    private readonly _prettify: PrettifyFunc;
    private _viewName: 'horizontal' | 'vertical';

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
            viewName = VIEW_NAMES.HORIZONTAL,
        } = config;

        this._flags = {
            showTooltips,
            showBgLine,
        };
        this._prettify = prettify;
        this._domElements = this._createDomElements($slider, points);
        this._updateEventCallback = null;
        this._pointSelected = -1;
        this._driver = createDriver(viewName, this._domElements.$slider);
        this._viewName = viewName;

        this._initDomElements();
        this._showTooltips(this._flags.showTooltips);
    }

    public get showBgLine(): boolean {
        return this._flags.showBgLine;
    }

    public set showBgLine(state: boolean) {
        this._flags.showBgLine = state;
        this._domElements.$slider.toggleClass(CLASSES.HIDE_BG_LINE, !state);
        this.update(this._pointStates);
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

    public get viewName(): ISliderViewName {
        return this._viewName;
    }

    public set viewName(viewName: ISliderViewName) {
        this._domElements.$slider.removeClass(CLASSES.VIEW_NAMES);
        this._domElements.$slider.find('*').removeAttr('style');

        this._viewName = viewName;
        this._driver = createDriver(viewName, this._domElements.$slider);
        this.update(this._pointStates);
    }

    public onSelect(callback: HandlerSliderViewSelect): void {
        this._updateEventCallback = callback;
    }

    public update(points: SliderPointState[]): void {
        this._pointStates = points;

        if (points.length !== this._domElements.points.length) {
            this._updateDomElements(points);
        }

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

        this._domElements.$slider.trigger('select', points.map((point) => {
            return point.value;
        }));
    }

    private _updateDomElements(points: SliderPointState[]): void {
        this._domElements.$bgLine.removeAttr('style');

        this._domElements.points.forEach(($point) => {
            $point.remove();
        });
        this._domElements.tooltips.forEach(($tooltip) => {
            $tooltip.remove();
        });

        this._domElements.points = [];
        this._domElements.tooltips = [];

        for (let i = 0; i < points.length; i += 1) {
            this._domElements.points.push(
                createPoint(i).css('z-index', i + 4)
            );
            this._domElements.tooltips.push(createTooltip());
        }

        this._domElements.$pointContainer.append(
            this._domElements.points
        );
        this._domElements.$tooltipContainer.append(
            this._domElements.tooltips
        );
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

    private _getViewState(ev: JQuery.Event): ISliderViewState {
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
                .on('mousemove.slider.moveHandler', (_ev: JQuery.MouseMoveEvent): void => {
                    this._triggerSelectEvent(_ev);
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
        this._domElements.$slider.toggleClass(CLASSES.HIDE_TOOLTIPS, !state);
    }
}

export default View;
export {
    createPoint,
    createTooltip,
};
