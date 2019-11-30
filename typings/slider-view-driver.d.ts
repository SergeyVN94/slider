interface SliderViewDriver {
    getTargetPosition(event: JQuery.Event, pointContainer: JQuery): number;
    setPointPosition(point: JQuery, pointContainer: JQuery, position: number): void;
    getPointPosition(point: JQuery, pointContainer: JQuery): number;
    updateTooltip(tooltip: JQuery, tooltipContainer: JQuery, position: number, value: string): void;
    updateBgLine(bgLine: JQuery, pointContainer: JQuery, points: SliderModelPointsState): void;
}
