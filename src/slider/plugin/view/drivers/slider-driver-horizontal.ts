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

    public updateDisplay(display: JQuery, pointContainer: JQuery, position: number, value: string): void {
        const sliderWidth: number = pointContainer.outerWidth();
        display.html(value);
        const offset: number = position * sliderWidth - (display.outerWidth() / 2);
        display.css('left', `${offset}px`);
    }
}