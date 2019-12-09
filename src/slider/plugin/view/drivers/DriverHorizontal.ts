class DriverHorizontal implements SliderViewDriver {
    public getTargetPosition(e: JQuery.Event, pointContainer: JQuery): number {
        const sliderWidth = pointContainer.width();
        const globalMousePosition = e.pageX;
        const mousePosition = globalMousePosition - pointContainer.offset().left;
        const targetPosition = mousePosition / sliderWidth;

        if (targetPosition < 0) {
            return 0;
        }

        if (targetPosition > 1) {
            return 1;
        }

        return targetPosition;
    }

    public getPointPosition(point: JQuery, pointContainer: JQuery): number {
        const sliderLeft = pointContainer.offset().left;
        const pointLeft = point.offset().left + point.outerWidth() / 2;

        return (pointLeft - sliderLeft) / pointContainer.outerWidth();
    }

    public setPointPosition(point: JQuery, pointContainer: JQuery, position: number): void {
        const sliderWidth = pointContainer.outerWidth();
        const pointOffset = point.outerWidth() / 2;
        const marginLeft = position * sliderWidth - pointOffset;
        point.css('left', `${marginLeft}px`);
    }

    public updateTooltip(
        tooltip: JQuery,
        pointContainer: JQuery,
        position: number,
        value: string
    ): void {
        const sliderWidth = pointContainer.outerWidth();

        tooltip.html(value);

        const offset = position * sliderWidth - tooltip.outerWidth() / 2;
        tooltip.css('left', `${offset}px`);
    }

    public updateBgLine(
        bgLine: JQuery,
        pointContainer: JQuery,
        points: SliderModelPointsState
    ): void {
        const sliderWidth = pointContainer.outerWidth();
        const offsetMin = points[0].position * sliderWidth;

        if (points.length === 1) {
            bgLine.css('right', sliderWidth - offsetMin);
        } else {
            const offsetMax = points[1].position * sliderWidth;
            bgLine.css('right', sliderWidth - offsetMax);
            bgLine.css('left', offsetMin);
        }
    }
}

export default DriverHorizontal;
