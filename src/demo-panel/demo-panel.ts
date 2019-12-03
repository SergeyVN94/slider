import * as $ from 'jquery';

import '../slider/slider';

class DemoPanel {
    private readonly _$panel: JQuery;
    private readonly _$slider: JQuery;
    private readonly _$inputStep: JQuery;
    private readonly _$checkboxShowTooltips: JQuery;
    private readonly _inputsSliderValue: JQuery[];
    private readonly _selectMode: SliderMode;
    private readonly _scaleType: 'string' | 'number';

    constructor(config: DemoPanelConfig) {
        const { $slider, selector, selectMode, scale = [0, 100] } = config;

        this._$panel = $(selector);
        this._$slider = $slider;
        this._selectMode = selectMode;
        this._inputsSliderValue = this._createInputsSliderValue(selectMode);
        this._$inputStep = this._$panel.find('.js-demo-panel__input-step');
        this._$checkboxShowTooltips = this._$panel.find('.js-demo-panel__show-tooltips');
        this._scaleType = typeof scale[0] as 'string' | 'number';

        this._$panel.find('.js-demo-panel__setting').append(this._inputsSliderValue);

        this._$slider.slider('onSelect', this._sliderSelectHandler.bind(this));
        this._$inputStep.on('input.sliderDemoPanel.updateStep', this.__inputStepHandler.bind(this));
        this._inputsSliderValue.forEach((input) => {
            input.on('focusout.sliderDemoPanel.updateValues', this._focusOutHandler.bind(this));
        });
        this._$checkboxShowTooltips.on(
            'change.sliderDemoPanel.showTooltips',
            this._showTooltipsHandler.bind(this)
        );

        this._$checkboxShowTooltips.attr('checked', this._$slider.slider('showTooltips') as string);
        const sliderValues = this._$slider.slider('value') as string[];
        this._setInputsSliderValue(sliderValues);
        this._$inputStep.val(this._$slider.slider('step') as number);
    }

    private _setInputsSliderValue(values: string[] | number[]): void {
        values.forEach((val: string | number, index: number) => {
            this._inputsSliderValue[index].val(val);
        });
    }

    private _createInputSliderValue(type: 'min' | 'max' = 'min'): JQuery {
        const classes = ['demo-panel__input-value', 'js-demo-panel__input-value'].join(' ');

        const dataType = `data-type='${type}'`;

        return $(`<input type='text' class=${classes} ${dataType}>`);
    }

    private _createInputsSliderValue(mode: SliderMode): JQuery[] {
        const result: JQuery[] = [this._createInputSliderValue()];

        if (mode === 'range') {
            result.push(this._createInputSliderValue());
        }

        return result;
    }

    private _focusOutHandler(): void {
        const values = this._inputsSliderValue.map((input) => {
            const val = input.val().toString();

            if (this._scaleType === 'number') {
                return Number(val);
            }

            return val;
        });

        this._$slider.slider('value', values as string[] | number[]);
    }

    private __inputStepHandler(): void {
        this._$slider.slider('step', this._$inputStep.val() as number);
    }

    private _showTooltipsHandler(): void {
        this._$slider.slider('showTooltips', this._$checkboxShowTooltips.is(':checked'));
    }

    private _sliderSelectHandler(values: string[] | number[]): void {
        this._setInputsSliderValue(values);
    }
}

export { DemoPanel };
