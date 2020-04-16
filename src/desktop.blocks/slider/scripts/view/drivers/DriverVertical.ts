// TODO: Убрать зависимоть!
import { SliderPointState } from '../../domain-model/Model';

import CLASSES from '../classes';
import { ISliderViewDriver } from '../View';

class DriverVertical implements ISliderViewDriver {
    constructor($slider: JQuery) {
        $slider.addClass(CLASSES.VIEW_NAME_VERTICAL);
    }

    public getTargetPosition(ev: JQuery.Event, $pointContainer: JQuery): number {
        const containerHeight = $pointContainer.outerHeight();
        const globalMousePosition = ev.pageY;
        const mousePosition = globalMousePosition - $pointContainer.offset().top;
        const targetPosition = 1 - mousePosition / containerHeight;

        if (targetPosition < 0) {
            return 0;
        }

        if (targetPosition > 1) {
            return 1;
        }

        return targetPosition;
    }

    public setPointPosition($point: JQuery, $pointContainer: JQuery, position: number): void {
        const containerHeight = $pointContainer.outerHeight();
        const pointOffset = $point.outerHeight() / 2;
        const marginBottom = (position * containerHeight) - pointOffset;
        $point.css('bottom', `${marginBottom}px`);
    }

    public updateTooltip(
        $tooltip: JQuery,
        $tooltipContainer: JQuery,
        position: number,
        value: string
    ): void {
        const containerHeight = $tooltipContainer.outerHeight();

        $tooltip.html(value);

        const offset = (position * containerHeight) - ($tooltip.outerHeight() / 2);
        $tooltip.css('bottom', `${offset}px`);
    }

    public updateBgLine(
        $bgLine: JQuery,
        $pointContainer: JQuery,
        points: SliderPointState[]
    ): void {
        const containerHeight = $pointContainer.outerHeight();
        const topMargin = containerHeight - (points[points.length - 1].position * containerHeight);
        $bgLine.css('top', `${topMargin}px`);

        if (points.length > 1) {
            const bottomMargin = points[0].position * containerHeight;
            $bgLine.css('bottom', `${bottomMargin}px`);
        }
    }
}

export default DriverVertical;
