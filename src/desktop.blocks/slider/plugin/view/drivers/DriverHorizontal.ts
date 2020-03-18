class DriverHorizontal implements ISliderViewDriver {
    public getTargetPosition(ev: JQuery.Event, $pointContainer: JQuery): number {
        const containerWidth = $pointContainer.width();
        const globalMousePosition = ev.pageX;
        const mousePosition = globalMousePosition - $pointContainer.offset().left;
        const targetPosition = mousePosition / containerWidth;

        if (targetPosition < 0) {
            return 0;
        }

        if (targetPosition > 1) {
            return 1;
        }

        return targetPosition;
    }

    public setPointPosition($point: JQuery, $pointContainer: JQuery, position: number): void {
        const containerWidth = $pointContainer.outerWidth();
        const offset = $point.outerWidth() / 2;
        const marginLeft = position * containerWidth - offset;
        $point.css('left', `${marginLeft}px`);
    }

    public updateTooltip(
        $tooltip: JQuery,
        $tooltipContainer: JQuery,
        position: number,
        value: string
    ): void {
        const containerWidth = $tooltipContainer.outerWidth();

        $tooltip.html(value);

        const offset = position * containerWidth - $tooltip.outerWidth() / 2;
        $tooltip.css('left', `${offset}px`);
    }

    public updateBgLine(
        $bgLine: JQuery,
        $pointContainer: JQuery,
        points: SliderPointState[]
    ): void {
        const containerWidth = $pointContainer.outerWidth();
        const marginRight = containerWidth - (points[points.length - 1].position * containerWidth);
        $bgLine.css('right', `${marginRight}px`);

        if (points.length > 1) {
            const marginLeft = (points[0].position * containerWidth);
            $bgLine.css('left', `${marginLeft}px`);
        }
    }
}

export default DriverHorizontal;
