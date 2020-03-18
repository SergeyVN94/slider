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
