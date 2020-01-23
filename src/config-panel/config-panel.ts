import * as $ from 'jquery';

import CLASSES from './classes';

const createValueItem = function createValueItem(index: number): JQuery {
    return $(
        `<div class='config-panel__value-item'>
            <label> Ползунок ${index}
                <input class='config-panel__value-input js-config-panel__value-input' type='text' autocomplete='off' data-index=${index}>
            </label>
        </div>`
    );
};

class ConfigPanel {
    private readonly _$slider: JQuery;
    private readonly _$panel: JQuery;
    private readonly _$inputStep: JQuery;
    private readonly _$viewInputs: JQuery;
    private readonly _$points: JQuery;
    private readonly _valueInputs: JQuery[];
    private readonly _$tooltipInput: JQuery;
    private readonly _$bgLine: JQuery;
    private readonly _$valueItemsContainer: JQuery;
    private readonly _sliderValueType: 'string' | 'number';

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
        this._$valueItemsContainer = $panel.find(`.${CLASSES.VALUES_ITEMS_CONTAINER}`);
        this._valueInputs = [];

        const [sliderValue] = $slider.slider('value');
        this._sliderValueType = typeof sliderValue as 'number' | 'string';

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

        const values = this._$slider.slider('value');
        this._$points.val(values.length);
        this._$valueItemsContainer.html('');
        for (let i = 0; i < values.length; i += 1) {
            const $valueItem = createValueItem(i);
            const $valueInput = $valueItem.find('input');
            $valueInput.val(values[i]);
            this._valueInputs.push($valueInput);
            this._$valueItemsContainer.append($valueItem);
        }
    }

    private _initEventHandlers(): void {
        this._$inputStep.on('input.step.update', this._updateStep.bind(this));
        this._$viewInputs.on('input.view.changeView', this._updateView.bind(this));
        this._$tooltipInput.on('input.view.showTooltips', this._showTooltips.bind(this));
        this._$bgLine.on('input.view.showBgLine', this._bgLineInputSelectHandler.bind(this));
        this._$valueItemsContainer.on(
            'focusout.sliderValues.update',
            `.${CLASSES.VALUE_INPUT}`,
            this._valueInputHandler.bind(this)
        );
        this._$slider.on('select', this._sliderSelectHandler.bind(this));
    }

    private _sliderSelectHandler(ev: JQuery.EventBase, ...values: string[] | number[]): void {
        this._valueInputs.forEach(($input, index) => {
            $input.val(values[index]);
        });
    }

    private _valueInputHandler(): void {
        const values = this._valueInputs.map(($input) => {
            return $input.val();
        });

        if (this._sliderValueType === 'number') {
            this._$slider.slider('value', values.map((value: string) => {
                return parseInt(value, 10);
            }));
        } else {
            this._$slider.slider('value', values as string[]);
        }
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
