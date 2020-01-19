import * as $ from 'jquery';

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
    private readonly driver: SliderViewDriver;
    private readonly domElements: DomElements;
    private flags: {
        showTooltips: boolean;
        showBgLine: boolean;
    };
    private updateEventCallback: HandlerSliderViewSelect;
    private pointSelected: number;
    private pointStates: SliderPointState[];
    private readonly prettify: PrettifyFunc;

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

        this.flags = {
            showTooltips,
            showBgLine,
        };
        this.prettify = prettify;
        this.domElements = this.createDomElements($slider, points);
        this.updateEventCallback = null;
        this.pointSelected = -1;
        this.driver = this.createDriver(viewName);

        this.initDomElements();
        this._showTooltips(this.flags.showTooltips);
    }

    public get showTooltips(): boolean {
        return this.flags.showTooltips;
    }

    public set showTooltips(state: boolean) {
        this.flags.showTooltips = state;
        this._showTooltips(this.flags.showTooltips);

        if (state && this.pointStates) {
            this.updateTooltips(this.pointStates);
        }
    }

    public onSelect(callback: HandlerSliderViewSelect): void {
        this.updateEventCallback = callback;
    }

    public update(points: SliderPointState[]): void {
        this.pointStates = points;

        points.forEach((point, index) => {
            this.driver.setPointPosition(
                this.domElements.points[index],
                this.domElements.$pointContainer,
                point.position
            );
        });

        if (this.flags.showTooltips) {
            this.updateTooltips(points);
        }

        if (this.flags.showBgLine) {
            this.driver.updateBgLine(
                this.domElements.$bgLine,
                this.domElements.$pointContainer,
                points
            );
        }
    }

    private initDomElements(): void {
        this.domElements.$pointContainer.on(
            'mousedown.slider.update',
            this.mouseDownHandler.bind(this)
        );

        this.domElements.$pointContainer.append(
            this.domElements.points,
            this.domElements.$bgLine
        );
        this.domElements.$tooltipContainer.append(this.domElements.tooltips);
    }

    private createDomElements($slider: JQuery, points: number): DomElements {
        const domElements: DomElements = {
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

    private createDriver(viewName: SliderViewName): SliderViewDriver {
        switch (viewName) {
            case 'vertical':
                return new DriverVertical(this.domElements.$slider);
            // default - 'horizontal'
            default:
                return new DriverHorizontal();
        }
    }

    private getViewState(ev: JQuery.Event): SliderViewState {
        return {
            targetPosition: this.driver.getTargetPosition(ev, this.domElements.$pointContainer),
            pointSelected: this.pointSelected,
        };
    }

    private triggerSelectEvent(ev: JQuery.Event): void {
        if (this.updateEventCallback !== null) {
            this.updateEventCallback(this.getViewState(ev));
        }
    }

    private mouseDownHandler(ev: JQuery.MouseDownEvent): void {
        const $target = $(ev.target);

        if (!$target.hasClass(CLASSES.POINT)) {
            this.triggerSelectEvent(ev);
        } else {
            this.pointSelected = parseInt($target.attr('data-index'), 10);

            this.domElements.$document
                .on('mousemove.slider.moveHandler', (): void => {
                    this.triggerSelectEvent(ev);
                })
                .one('mouseup.slider.upHandler', (): void => {
                    this.pointSelected = null;
                    this.domElements.$document.off('mousemove.slider.moveHandler');
                });
        }
    }

    private updateTooltips(points: SliderPointState[]): void {
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
        this.domElements.tooltips.forEach((tooltip) => {
            tooltip.toggleClass(CLASSES.HIDE_TOOLTIPS, !state);
        });
    }
}

export default View;
export {
    createPoint,
    createTooltip,
};
