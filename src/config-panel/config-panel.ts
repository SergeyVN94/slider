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
    private readonly _$bgLine: JQuery;

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
        this._$bgLine = $panel.find(`.${CLASSES.BG_LINE_INPUT}`);

        this._initDomElements();
        this._initEventHandlers();
    }

    private _initDomElements(): void {
        const step = this._$slider.slider('step');
        this._$inputStep.val(step);

        const viewName = this._$slider.slider('viewName');
        this._$viewInputs.each(function() {
            const $radio = $(this);
            if ($radio.attr('value') === viewName) {
                $radio.prop('checked', true);
            }
        });

        const isShowTooltip = this._$slider.slider('showTooltips');
        this._$tooltipInput.prop('checked', isShowTooltip);

        const isShowBgLine = this._$slider.slider('bg-line');
        this._$bgLine.prop('checked', isShowBgLine);
    }

    private _initEventHandlers(): void {
        this._$inputStep.on('input.step.update', this._updateStep.bind(this));
        this._$viewInputs.on('input.view.changeView', this._updateView.bind(this));
        this._$tooltipInput.on('input.view.showTooltips', this._showTooltips.bind(this));
        this._$bgLine.on('input.view.showBgLine', this._bgLineInputSelectHandler.bind(this));
    }

    private _bgLineInputSelectHandler(ev: JQuery.EventBase): void {
        const $input = $(ev.currentTarget);
        const isShowBgLine = $input.prop('checked');
        this._$slider.slider('bg-line', isShowBgLine);
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
