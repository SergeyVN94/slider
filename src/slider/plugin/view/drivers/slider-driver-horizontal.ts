export class DriverHorizontal implements SliderViewDriver {
    constructor() {
    }

    public getTargetPosition(event: JQuery.Event, pointContainer: JQuery): number {
        const sliderWidth: number = pointContainer.width();
        const globalMousePosition: number = event.pageX;
        const mousePosition: number = (globalMousePosition - pointContainer.offset().left);
        const targetPosition: number = mousePosition / sliderWidth;
        if (targetPosition < 0) return 0;
        if (targetPosition > 1) return 1;
        return targetPosition;
    }

    public getPointPosition(point: JQuery, pointContainer: JQuery): number {
        const sliderLeft: number = pointContainer.offset().left;
        const pointLeft: number = point.offset().left + (point.outerWidth() / 2);

        return (pointLeft - sliderLeft) / pointContainer.outerWidth();
    }

    public setPointPosition(point: JQuery, pointContainer: JQuery, position: number): void {
        const sliderWidth: number = pointContainer.outerWidth();
        const pointOffset: number = point.outerWidth() / 2;
        const marginLeft: number = position * sliderWidth - pointOffset;
        point.css('left', `${marginLeft}px`);
    }

    public updateTooltip(tooltip: JQuery, pointContainer: JQuery, position: number, value: string): void {
        const sliderWidth: number = pointContainer.outerWidth();
        tooltip.html(value);
        const offset: number = position * sliderWidth - (tooltip.outerWidth() / 2);
        tooltip.css('left', `${offset}px`);
    }

    public updateBgLine(bgLine: JQuery, pointContainer: JQuery, position: number | CoupleNum): void {
        const sliderWidth: number = pointContainer.outerWidth();

        if (typeof position === 'number') {
            const offset: number = position * sliderWidth;
            bgLine.css('right', sliderWidth - offset);
        } else {
            const offsetMin: number = position[0] * sliderWidth;
            const offsetMax: number = position[1] * sliderWidth;
            bgLine.css('right', sliderWidth - offsetMax);
            bgLine.css('left', offsetMin);
        }
    }
}