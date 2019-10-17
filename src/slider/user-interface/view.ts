class SliderView {
    private _slider: Element;

    constructor(slider: string | Element) {
        if (typeof slider === 'string') {
            this._slider = document.querySelector(slider);
        }

        this._slider = slider as Element;
    }
}