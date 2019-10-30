interface OnSliderMouseEvent {
    (callback: SliderCallbackMouseEvent): void;
}

interface SliderViewDriver {
    getTargetPosition(event: JQuery.Event, pointContainer: JQuery): number;
    setPointPosition(point: JQuery, pointContainer: JQuery, position: number): void;
    getPointPosition(point: JQuery, pointContainer: JQuery): number;
    updateDisplay(display: JQuery, pointContainer: JQuery, position: number, value: string): void;
}