import * as $ from 'jquery';

import CLASSES from './classes';

class ConfigPanel {
    private readonly _$slider: JQuery;
    private readonly _$panel: JQuery;
    private readonly _$inputStep: JQuery;
    private readonly _$viewInputs: JQuery;
    private readonly _$points: JQuery;
    private readonly _valueInputs: JQuery[];
    private readonly _$tooltipInput: JQuery;

    constructor(config: {
        $slider: JQuery;
        $panel: JQuery;
    }) {
        const {
            $slider,
            $panel,
        } = config;

        this._$slider = $slider;
        this._$panel = $panel;
        this._$inputStep = $panel.find(`.${CLASSES.STEP_INPUT}`);
        this._$viewInputs = $panel.find(`.${CLASSES.VIEW_INPUT}`);
        this._$points = $panel.find(`.${CLASSES.POINTS_INPUT}`);
        this._$tooltipInput = $panel.find(`.${CLASSES.TOOLTIP_INPUT}`);

        this._initDomElements();
    }

    private _initDomElements(): void {
        const step = this._$slider.slider('step');
        this._$inputStep.val(step);
        this._$inputStep.on('input.step.update', this._updateStep.bind(this));

        const viewName = this._$slider.slider('viewName');
        this._$viewInputs.each(function() {
            const $radio = $(this);
            if ($radio.attr('value') === viewName) {
                $radio.prop('checked', true);
            }
        });
        this._$viewInputs.on('input.view.changeView', this._updateView.bind(this));

        const isShowTooltip = this._$slider.slider('showTooltips');
        this._$tooltipInput.attr('checked', Number(isShowTooltip));
        this._$tooltipInput.on('input.view.showTooltips', this._showTooltips.bind(this));
    }

    private _updateStep(): void {
        const step = this._$inputStep.val() as number;
        this._$slider.slider('step', step);
    }

    private _updateView(ev: JQuery.EventBase): void {
        const $input = $(ev.currentTarget);
        const viewName = $input.val() as 'horizontal' | 'vertical';
        this._$slider.slider('viewName', viewName);
    }

    private _showTooltips(ev: JQuery.EventBase): void {
        const $input = $(ev.currentTarget);
        const isShowTooltip = $input.prop('checked');
        this._$slider.slider('showTooltips', isShowTooltip);
    }
}

export default ConfigPanel;
