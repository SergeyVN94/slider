class DriverVertical implements SliderViewDriver {
    constructor() {
        
    }

    public getTargetPosition(event: JQuery.Event, pointContainer: JQuery): number {
        const sliderHeight: number = pointContainer.outerHeight();
        const globalMousePosition: number = event.pageY;
        const mousePosition: number = (globalMousePosition - pointContainer.offset().top);
        const targetPosition: number = 1 - (mousePosition / sliderHeight);
        if (targetPosition < 0) return 0;
        if (targetPosition > 1) return 1;
        return targetPosition;
    }

    public getPointPosition(point: JQuery, pointContainer: JQuery): number {
        const sliderHeight: number = pointContainer.outerHeight();
        const sliderBottom: number = pointContainer.offset().top + sliderHeight;
        const pointOffset: number = point.outerHeight() / 2;
        const pointBottom: number = (sliderBottom - point.offset().top) - pointOffset;

        return pointBottom / sliderHeight;
    }

    public setPointPosition(point: JQuery, pointContainer: JQuery, position: number): void {
        const sliderHeight: number = pointContainer.outerHeight();
        const pointOffset: number = point.outerHeight() / 2;
        const marginBottom: number = position * sliderHeight - pointOffset;
        point.css('bottom', `${marginBottom}px`);
    }

    public updateTooltip(tooltip: JQuery, pointContainer: JQuery, position: number, value: string): void {
        const sliderHeight: number = pointContainer.outerHeight();
        tooltip.html(value);
        const offset: number = position * sliderHeight - (tooltip.outerHeight() / 2);
        tooltip.css('bottom', `${offset}px`);
    }

    public updateBgLine(bgLine: JQuery, pointContainer: JQuery, points: SliderModelPointsState): void {
        const sliderHeight: number = pointContainer.outerHeight();
        
        if (points.length === 1) {
            const offset: number = sliderHeight - (points[0].position * sliderHeight);
            bgLine.css('top', offset);
        } else {
            const offsetMin: number = points[0].position * sliderHeight;
            const offsetMax: number = sliderHeight - (points[1].position * sliderHeight);
            bgLine.css('top', offsetMax);
            bgLine.css('bottom', offsetMin);
        }
    }

    public updateScale(scaleElem: JQuery, scale: SliderScale): void {
        
    }
}

export {
    DriverVertical
};