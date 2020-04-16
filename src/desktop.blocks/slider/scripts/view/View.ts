import { SliderPointState } from '../domain-model/Model';
import DriverHorizontal from './drivers/DriverHorizontal';
import DriverVertical from './drivers/DriverVertical';
import CLASSES from './classes';

type SliderViewName = 'horizontal' | 'vertical';
type PrettifyFunc = (value: number | string) => string;
type HandlerSliderViewSelect = (targetPosition: number, pointSelected: number) => void;

interface IDomElements {
    $slider: JQuery;
    points: JQuery[];
    tooltips: JQuery[];
    $pointContainer: JQuery;
    $tooltipContainer: JQuery;
    $bgLine: JQuery;
    $document: JQuery<Document>;
}

interface ISliderViewConfigManager {
    showTooltips: boolean;
    viewName: 'horizontal' | 'vertical';
    showBgLine: boolean;
}

interface ISliderView {
    onSelect(callback: HandlerSliderViewSelect): void;
    update(points: SliderPointState[]): void;
}

interface ISliderViewDriver {
    getTargetPosition($event: JQuery.Event, $pointContainer: JQuery): number;
    setPointPosition($point: JQuery, $pointContainer: JQuery, position: number): void;
    updateTooltip(
        $tooltip: JQuery,
        $tooltipContainer: JQuery,
        position: number,
        value: string
    ): void;
    updateBgLine($bgLine: JQuery, $pointContainer: JQuery, points: SliderPointState[]): void;
}

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

const createDriver = function viewDriverFactory(
    viewName: SliderViewName,
    $slider: JQuery
): ISliderViewDriver {
    switch (viewName) {
        case 'vertical':
            return new DriverVertical($slider);
        default:
            return new DriverHorizontal();
    }
};

const enum VIEW_NAMES {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical',
}

class View implements ISliderView, ISliderViewConfigManager {
    private driver: ISliderViewDriver;
    private readonly domElements: IDomElements;
    private flags: {
        showTooltips: boolean;
        showBgLine: boolean;
    };
    private updateEventCallback: HandlerSliderViewSelect;
    private pointSelected: number;
    private pointStates: SliderPointState[];
    private readonly prettify: PrettifyFunc;
    private currentViewName: 'horizontal' | 'vertical';

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
            prettify = (value: string): string => value,
            viewName = VIEW_NAMES.HORIZONTAL,
        } = config;

        this.flags = {
            showTooltips,
            showBgLine,
        };
        this.prettify = prettify;
        this.domElements = this._createIDomElements($slider, points);
        this.updateEventCallback = null;
        this.pointSelected = -1;
        this.driver = createDriver(viewName, this.domElements.$slider);
        this.currentViewName = viewName;

        this._initIDomElements();
        this._showTooltips(this.flags.showTooltips);
    }

    public get showBgLine(): boolean {
        return this.flags.showBgLine;
    }

    public set showBgLine(state: boolean) {
        this.flags.showBgLine = state;
        this.domElements.$slider.toggleClass(CLASSES.HIDE_BG_LINE, !state);
        this.update(this.pointStates);
    }

    public get showTooltips(): boolean {
        return this.flags.showTooltips;
    }

    public set showTooltips(state: boolean) {
        this.flags.showTooltips = state;
        this._showTooltips(this.flags.showTooltips);

        if (state && this.pointStates) {
            this._updateTooltips(this.pointStates);
        }
    }

    public get viewName(): SliderViewName {
        return this.currentViewName;
    }

    public set viewName(viewName: SliderViewName) {
        this.domElements.$slider.removeClass(
            (index, classes) => classes
                .split(' ')
                .filter((className) => className.includes('slider_view-name_'))
                .join(' ')
        );
        this.domElements.$slider.find('*').removeAttr('style');

        this.currentViewName = viewName;
        this.driver = createDriver(viewName, this.domElements.$slider);
        this.update(this.pointStates);
    }

    public onSelect(callback: (targetPosition: number, pointSelected: number) => void): void {
        this.updateEventCallback = callback;
    }

    public update(points: SliderPointState[]): void {
        this.pointStates = points;

        if (points.length !== this.domElements.points.length) {
            this._updateIDomElements(points);
        }

        points.forEach((point, index) => {
            this.driver.setPointPosition(
                this.domElements.points[index],
                this.domElements.$pointContainer,
                point.position
            );
        });

        if (this.flags.showTooltips) {
            this._updateTooltips(points);
        }

        if (this.flags.showBgLine) {
            this.driver.updateBgLine(
                this.domElements.$bgLine,
                this.domElements.$pointContainer,
                points
            );
        }

        this.domElements.$slider.trigger('select', points.map((point) => point.value));
    }

    private _updateIDomElements(points: SliderPointState[]): void {
        this.domElements.$bgLine.removeAttr('style');

        this.domElements.points.forEach(($point) => {
            $point.remove();
        });
        this.domElements.tooltips.forEach(($tooltip) => {
            $tooltip.remove();
        });

        this.domElements.points = [];
        this.domElements.tooltips = [];

        for (let i = 0; i < points.length; i += 1) {
            this.domElements.points.push(
                createPoint(i).css('z-index', i + 4)
            );
            this.domElements.tooltips.push(createTooltip());
        }

        this.domElements.$pointContainer.append(
            this.domElements.points
        );
        this.domElements.$tooltipContainer.append(
            this.domElements.tooltips
        );
    }

    private _initIDomElements(): void {
        this.domElements.$pointContainer.on(
            'mousedown.slider.update',
            this._mouseDownHandler.bind(this)
        );

        this.domElements.$pointContainer.append(
            this.domElements.points,
            this.domElements.$bgLine
        );
        this.domElements.$tooltipContainer.append(this.domElements.tooltips);
    }

    private _createIDomElements($slider: JQuery, points: number): IDomElements {
        const domElements: IDomElements = {
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
            domElements.points.push(
                createPoint(i).css('z-index', i + 4)
            );
            domElements.tooltips.push(createTooltip());
        }

        return domElements;
    }

    private _triggerSelectEvent(ev: JQuery.Event): void {
        if (this.updateEventCallback !== null) {
            const targetPosition = this.driver.getTargetPosition(
                ev,
                this.domElements.$pointContainer
            );
            this.updateEventCallback(targetPosition, this.pointSelected);
        }
    }

    private _mouseDownHandler(ev: JQuery.MouseDownEvent): void {
        const $target = $(ev.target);

        if (!$target.hasClass(CLASSES.POINT)) {
            this._triggerSelectEvent(ev);
        } else {
            this.pointSelected = parseInt($target.attr('data-index'), 10);

            this.domElements.$document
                .on('mousemove.slider.moveHandler', (_ev: JQuery.MouseMoveEvent): void => {
                    this._triggerSelectEvent(_ev);
                })
                .one('mouseup.slider.upHandler', (): void => {
                    this.pointSelected = -1;
                    this.domElements.$document.off('mousemove.slider.moveHandler');
                });
        }
    }

    private _updateTooltips(points: SliderPointState[]): void {
        points.forEach((point, index) => {
            this.driver.updateTooltip(
                this.domElements.tooltips[index],
                this.domElements.$tooltipContainer,
                point.position,
                this.prettify(point.value)
            );
        });
    }

    private _showTooltips(state: boolean): void {
        this.domElements.$slider.toggleClass(CLASSES.HIDE_TOOLTIPS, !state);
    }
}

export default View;
export {
    createPoint,
    createTooltip,
    PrettifyFunc,
    SliderViewName,
    ISliderViewConfigManager,
    ISliderView,
    ISliderViewDriver,
};
