import '../slider/slider';

class DemoPanel {
    private readonly _panel: JQuery;
    private readonly _inputs: JQuery;
    private readonly _inputMin: JQuery;
    private readonly _inputMax: JQuery;
    private readonly _mode: 'single' | 'range';
    private readonly _showValue: JQuery;
    private readonly _slider: JQuery;
    private readonly _inputStep: JQuery;

    constructor(panel: JQuery, slider: JQuery) {
        this._panel = panel;
        this._slider = slider;
        this._mode = this._panel.attr('data-mode') as 'single' | 'range';
        this._inputs = panel.find('.demo-panel__input-value');
        this._inputMin = panel.find('.demo-panel__input-value[data-type="min"]');
        this._inputMax = panel.find('.demo-panel__input-value[data-type="max"]');
        this._showValue = panel.find('.demo-panel__show-value');
        this._inputStep = this._panel.find('.demo-panel__input-step');

        this._inputs.focusout(() => {
            if (this._mode === 'single') {
                this._slider.slider('value', [this._inputs.val().toString()]);
            } else {
                this._slider.slider('value', [
                    this._inputMin.val() as string,
                    this._inputMax.val() as string,
                ]);
            }
        });

        this._slider.slider('onSelect', (value: string[]): void => {
            if (value.length === 1) {
                this._inputs.val(value[0]);
            } else {
                this._inputMin.val(value[0]);
                this._inputMax.val(value[1]);
            }
        });

        this._showValue.change((): void => {
            this._slider.slider('showTooltips', this._showValue.is(':checked'));
        });

        this._showValue.attr('checked', this._slider.slider('showTooltips') as string);

        const sliderValues: string[] = this._slider.slider('value') as string[];
        if (sliderValues.length === 1) {
            this._inputs.val(sliderValues[0]);
        } else {
            this._inputMin.val(sliderValues[0]);
            this._inputMax.val(sliderValues[1]);
        }

        this._inputStep.on('input', (): void => {
            this._slider.slider('step', this._inputStep.val() as number);
        });
        this._inputStep.val(this._slider.slider('step') as number);
    }
}

export { DemoPanel };
