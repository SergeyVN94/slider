import '../slider/slider';

class DemoPanel {
    private readonly _panel: JQuery;
    private readonly _inputs: JQuery;
    private readonly _inputMin: JQuery;
    private readonly _inputMax: JQuery;
    private readonly _selectMode: 'single' | 'range';
    private readonly _checkboxShowTooltips: JQuery;
    private readonly _slider: JQuery;
    private readonly _inputStep: JQuery;

    constructor(panel: JQuery, slider: JQuery) {
        this._panel = panel;
        this._slider = slider;
        this._selectMode = this._panel.attr('data-mode') as 'single' | 'range';
        this._inputs = panel.find('.demo-panel__input-value');
        this._inputMin = panel.find('.demo-panel__input-value[data-type="min"]');
        this._inputMax = panel.find('.demo-panel__input-value[data-type="max"]');
        this._checkboxShowTooltips = panel.find('.demo-panel__show-tooltips');
        this._inputStep = this._panel.find('.demo-panel__input-step');

        this._inputs.focusout(this._focusOutHandler.bind(this));
        this._slider.slider('onSelect', this._sliderSelectHandler.bind(this));
        this._checkboxShowTooltips.change(this._checkboxShowTooltipsSelectHandler.bind(this));
        this._inputStep.on('input', this.__inputStepInputHandler.bind(this));

        this._checkboxShowTooltips.attr('checked', this._slider.slider('showTooltips') as string);

        const sliderValues = this._slider.slider('value') as string[];
        if (sliderValues.length === 1) {
            this._inputs.val(sliderValues[0]);
        } else {
            this._inputMin.val(sliderValues[0]);
            this._inputMax.val(sliderValues[1]);
        }

        this._inputStep.val(this._slider.slider('step') as number);
    }

    private _focusOutHandler(): void {
        if (this._selectMode === 'single') {
            this._slider.slider('value', [this._inputs.val().toString()]);
        } else {
            this._slider.slider('value', [
                this._inputMin.val() as string,
                this._inputMax.val() as string,
            ]);
        }
    }

    private _sliderSelectHandler(value: string[]): void {
        if (value.length === 1) {
            this._inputs.val(value[0]);
        } else {
            this._inputMin.val(value[0]);
            this._inputMax.val(value[1]);
        }
    }

    private _checkboxShowTooltipsSelectHandler(): void {
        this._slider.slider('showTooltips', this._checkboxShowTooltips.is(':checked'));
    }

    private __inputStepInputHandler(): void {
        this._slider.slider('step', this._inputStep.val() as number);
    }
}

export { DemoPanel };
