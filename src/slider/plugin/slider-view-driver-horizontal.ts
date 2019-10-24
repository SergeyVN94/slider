export class DriverHorizontal implements SliderViewDriver {
    _callback: SliderCallbackMouseEvent;
    readonly _slider: JQuery;

    constructor(slider: JQuery) {
        this._slider = slider;
    }

    onMouseEvent(callback: SliderCallbackMouseEvent) {
        this._callback = callback;

        function MouseHandler(event: JQuery.Event): boolean {


            return true;
        }

        this._slider.mousedown(() => {
            this._slider.mousemove(MouseHandler);
        });

        this._slider.mouseleave(() => {
            this._slider.off('mousemove', MouseHandler);
        });
    }
}