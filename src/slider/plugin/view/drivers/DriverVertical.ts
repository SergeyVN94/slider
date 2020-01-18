import CLASSES from '../classes';

class DriverVertical implements SliderViewDriver {
    constructor($slider: JQuery) {
        $slider.addClass(CLASSES.THEME.VERTICAL);
    }

    public getTargetPosition(ev: JQuery.Event, $pointContainer: JQuery): number {
        const sliderHeight = $pointContainer.outerHeight();
        const globalMousePosition = ev.pageY;
        const mousePosition = globalMousePosition - $pointContainer.offset().top;
        const targetPosition = 1 - mousePosition / sliderHeight;

        if (targetPosition < 0) {
            return 0;
        }

        if (targetPosition > 1) {
            return 1;
        }

        return targetPosition;
    }

    public getPointPosition($point: JQuery, $pointContainer: JQuery): number {
        const sliderHeight = $pointContainer.outerHeight();
        const sliderBottom = $pointContainer.offset().top + sliderHeight;
        const pointOffset = $point.outerHeight() / 2;
        const pointBottom = sliderBottom - $point.offset().top - pointOffset;

        return pointBottom / sliderHeight;
    }

    public setPointPosition($point: JQuery, $pointContainer: JQuery, position: number): void {
        const sliderHeight = $pointContainer.outerHeight();
        const pointOffset = $point.outerHeight() / 2;
        const marginBottom = position * sliderHeight - pointOffset;
        $point.css('bottom', `${marginBottom}px`);
    }

    public updateTooltip(
        $tooltip: JQuery,
        $tooltipContainer: JQuery,
        position: number,
        value: string
    ): void {
        const sliderHeight = $tooltipContainer.outerHeight();

        $tooltip.html(value);

        const offset = position * sliderHeight - $tooltip.outerHeight() / 2;
        $tooltip.css('bottom', `${offset}px`);
    }

    public updateBgLine(
        $bgLine: JQuery,
        $pointContainer: JQuery,
        points: SliderPointState[]
    ): void {
        const sliderHeight = $pointContainer.outerHeight();

        if (points.length === 1) {
            const offset = sliderHeight - points[0].position * sliderHeight;
            $bgLine.css('top', offset);
        } else {
            const offsetMin = points[0].position * sliderHeight;
            const offsetMax = sliderHeight - points[1].position * sliderHeight;
            $bgLine.css('top', offsetMax);
            $bgLine.css('bottom', offsetMin);
        }
    }
}

export default DriverVertical;
