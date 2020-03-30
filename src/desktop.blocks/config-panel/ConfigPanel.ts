import CLASSES from './classes';

const createControlValueOut = function createControlValueOut(
    index: number,
    value: string | number
): JQuery {
    const $control = $('<label/>').addClass('config-panel__control');
    const $controlText = $('<span/>')
        .addClass('config-panel__control-text')
        .text(`Ползунок ${index}`);
    const $controlInput = $('<input/>')
        .addClass('.config-panel__value-out')
        .prop('autocomplete', 'off')
        .data('index', index)
        .val(value);

    return $control.append($controlText, $controlInput);
};

interface IConfigPanelDomElements {
    $panel: JQuery;
    $slider: JQuery;
    $inputStep: JQuery;
    $radioViewName: JQuery;
    $checkboxBgLine: JQuery;
    $checkboxTooltip: JQuery;
    $inputPoints: JQuery;
    $controlsValueOutContainer: JQuery;
    inputsValueOut: JQuery[];
}

class ConfigPanel {
    private readonly _domElements: IConfigPanelDomElements;

    constructor($panel: JQuery, $slider: JQuery) {
        this._domElements = this._getDomElements($panel, $slider);
        this._initDomElements();
        this._initEventListeners();
    }

    private _getDomElements($panel: JQuery, $slider: JQuery): IConfigPanelDomElements {
        const $inputStep = $panel.find(`.${CLASSES.INPUT_STEP}`);
        const $radioViewName = $panel.find(`.${CLASSES.RADIO_VIEW_NAME}`);
        const $checkboxBgLine = $panel.find(`.${CLASSES.CHECKBOX_BG_LINE}`);
        const $checkboxTooltip = $panel.find(`.${CLASSES.CHECKBOX_TOOLTIP}`);
        const $inputPoints = $panel.find(`.${CLASSES.INPUT_POINTS}`);
        const $controlsValueOutContainer = $panel.find(`.${CLASSES.CONTROLS_VALUE_OUT}`);

        return {
            $panel,
            $slider,
            $inputStep,
            $radioViewName,
            $checkboxBgLine,
            $checkboxTooltip,
            $inputPoints,
            $controlsValueOutContainer,
            inputsValueOut: [],
        };
    }

    private _initDomElements(): void {
        const {
            $slider,
            $inputStep,
            $radioViewName,
            $checkboxBgLine,
            $checkboxTooltip,
            $inputPoints,
        } = this._domElements;

        const step = $slider.slider('step');
        $inputStep.val(step);

        const viewName = $slider.slider('view-name');
        $radioViewName.each((index, element) => {
            if (element.getAttribute('value') === viewName) {
                element.setAttribute('checked', 'true');
            }
        });

        const isShowBgLine = $slider.slider('show-bg-line');
        $checkboxBgLine.prop('checked', isShowBgLine);

        const isShowTooltips = $slider.slider('show-tooltips');
        $checkboxTooltip.prop('checked', isShowTooltips);

        const allPoints = $slider.slider('value').length;
        $inputPoints.val(allPoints);

        this._recreateControlsValueOut();
    }

    private _initEventListeners(): void {
        const {
            $inputStep,
            $radioViewName,
            $checkboxBgLine,
            $checkboxTooltip,
            $inputPoints,
            $slider,
        } = this._domElements;

        $inputStep.on(
            'input.configPanel.updateStep',
            this._handleInputStepInput.bind(this)
        );

        $radioViewName.on(
            'input.configPanel.changeViewName',
            this._handleRadioViewNameInput.bind(this)
        );

        $checkboxBgLine.on(
            'input.configPanel.showBgLineToggle',
            this._handleCheckboxBgLineInput.bind(this)
        );

        $checkboxTooltip.on(
            'input.configPanel.showTooltips',
            this._handleCheckboxTooltipInput.bind(this)
        );

        $inputPoints.on(
            'input.configPanel.changeNumberOfPoints',
            this._handleInputPointsInput.bind(this)
        );

        $slider.on(
            'select.configPanel.updateControlsValueOutContainer',
            this._handleSliderSelect.bind(this)
        );
    }

    private _recreateControlsValueOut(): void {
        const {
            $slider,
            inputsValueOut,
            $controlsValueOutContainer,
        } = this._domElements;

        $controlsValueOutContainer.html('');
        inputsValueOut.length = 0;

        $slider.slider('value').forEach((value: string | number, index: number) => {
            const $controlValueOut = createControlValueOut(index, value);
            $controlsValueOutContainer.append($controlValueOut);
            const $input = $controlValueOut.find('input');
            inputsValueOut.push($input);
            $input.on(
                'focusout.configPanel.updateSliderValues',
                this._handleInputValueOutFocusout.bind(this)
            );
        });
    }

    private _handleInputValueOutFocusout(ev: JQuery.EventBase): void {
        const { $slider } = this._domElements;
        const $input = $(ev.currentTarget);
        const currentValues = $slider.slider('value');
        const inputIndex = parseInt($input.data('index').toString(), 10);

        if (typeof currentValues[0] === 'number') {
            currentValues[inputIndex] = parseInt($input.val().toString(), 10);
        } else {
            currentValues[inputIndex] = $input.val().toString();
        }

        $slider.slider('value', currentValues);
    }

    private _handleSliderSelect(): void {
        const {
            inputsValueOut,
            $slider,
        } = this._domElements;

        const values = $slider.slider('value');

        if (inputsValueOut.length !== values.length) {
            this._recreateControlsValueOut();
        }

        values.forEach((value: string | number, index: number) => inputsValueOut[index].val(value));
    }

    private _handleInputPointsInput(): boolean {
        const {
            $inputPoints,
            $slider,
        } = this._domElements;
        const points = parseInt($inputPoints.val().toString(), 10);

        if (points < 1) {
            return false;
        }

        const currentValues = $slider.slider('value');
        const pointsNow = currentValues.length;

        if (pointsNow === points) {
            return true;
        }

        if (points < pointsNow) {
            $slider.slider('value', currentValues.slice(0, points));
            return true;
        }

        const lastValue = currentValues[currentValues.length - 1];

        if (typeof lastValue === 'number') {
            const newValues = currentValues as number[];
            while (newValues.length < points) {
                newValues.push(lastValue);
            }

            $slider.slider('value', newValues);

            return true;
        }

        const newValues = currentValues as string[];
        while (newValues.length < points) {
            newValues.push(lastValue);
        }

        $slider.slider('value', newValues);

        return true;
    }

    private _handleCheckboxTooltipInput(): void {
        const {
            $slider,
            $checkboxTooltip,
        } = this._domElements;

        const isShowTooltips = Boolean($checkboxTooltip.prop('checked'));
        $slider.slider('show-tooltips', isShowTooltips);
    }

    private _handleCheckboxBgLineInput(): void {
        const {
            $slider,
            $checkboxBgLine,
        } = this._domElements;

        const isShowBgLine = Boolean($checkboxBgLine.prop('checked'));
        $slider.slider('show-bg-line', isShowBgLine);
    }

    private _handleInputStepInput(): void {
        const {
            $slider,
            $inputStep,
        } = this._domElements;

        const step = $inputStep.val().toString();

        try {
            $slider.slider('step', parseInt(step, 10));
        } catch (error) {
            console.error(error);
        }
    }

    private _handleRadioViewNameInput(ev: JQuery.EventBase): void {
        const viewName = ev.currentTarget.getAttribute('value');
        this._domElements.$slider.slider('view-name', viewName);
    }
}

export default ConfigPanel;
