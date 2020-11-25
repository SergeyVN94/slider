// /* eslint-disable @typescript-eslint/unbound-method */
// import { boundMethod } from 'autobind-decorator';

// import CLASSES from './classes';

// import './config-panel.sass';

// const createControlValueOut = (index: number, value: string | number): JQuery => {
//   const $control = $('<label/>').addClass('config-panel__control');
//   const $controlText = $('<span/>')
//     .addClass('config-panel__control-text')
//     .text(`Ползунок ${index}`);
//   const $controlInput = $('<input/>')
//     .addClass('config-panel__input config-panel__input_type_value-out')
//     .prop('autocomplete', 'off')
//     .data('index', index)
//     .val(value);

//   return $control.append($controlText, $controlInput);
// };

// interface IConfigPanelDomElements {
//   $panel: JQuery;
//   $slider: JQuery;
//   $inputStep: JQuery;
//   $radioViewName: JQuery;
//   $checkboxBgLine: JQuery;
//   $checkboxTooltip: JQuery;
//   $inputPoints: JQuery;
//   $controlsValueOutContainer: JQuery;
//   inputsValueOut: JQuery[];
//   $scaleMax: JQuery;
//   $scaleMin: JQuery;
//   $customValues: JQuery;
// }

// class ConfigPanel {
//   private readonly domElements: IConfigPanelDomElements;

//   constructor($panel: JQuery, $slider: JQuery) {
//     this.domElements = ConfigPanel._getDomElements($panel, $slider);
//     this.initDomElements();
//     this.initEventListeners();
//   }

//   private static _getDomElements($panel: JQuery, $slider: JQuery): IConfigPanelDomElements {
//     return {
//       $panel,
//       $slider,
//       $inputStep: $panel.find(`.${CLASSES.INPUT_STEP}`),
//       $radioViewName: $panel.find(`.${CLASSES.RADIO_VIEW_NAME}`),
//       $checkboxBgLine: $panel.find(`.${CLASSES.CHECKBOX_BG_LINE}`),
//       $checkboxTooltip: $panel.find(`.${CLASSES.CHECKBOX_TOOLTIP}`),
//       $inputPoints: $panel.find(`.${CLASSES.INPUT_POINTS}`),
//       $controlsValueOutContainer: $panel.find(`.${CLASSES.CONTROLS_VALUE_OUT}`),
//       inputsValueOut: [],
//       $scaleMax: $panel.find(`.${CLASSES.SCALE_MAX}`),
//       $scaleMin: $panel.find(`.${CLASSES.SCALE_MIN}`),
//       $customValues: $panel.find(`.${CLASSES.INPUT_CUSTOM_VALUES}`),
//     };
//   }

//   private initDomElements(): void {
//     const {
//       $slider,
//       $inputStep,
//       $radioViewName,
//       $checkboxBgLine,
//       $checkboxTooltip,
//       $inputPoints,
//       $scaleMax,
//       $scaleMin,
//       $customValues,
//     } = this.domElements;

//     const step = $slider.slider('step');
//     $inputStep.val(step);

//     const viewName = $slider.slider('view-name');
//     $radioViewName.each((index, element) => {
//       if (element.getAttribute('value') === viewName) element.setAttribute('checked', 'true');
//     });

//     const isBgLineVisible = $slider.slider('show-bg-line');
//     $checkboxBgLine.prop('checked', isBgLineVisible);

//     const areTooltipsVisible = $slider.slider('show-tooltips');
//     $checkboxTooltip.prop('checked', areTooltipsVisible);

//     const pointsCount = $slider.slider('values').length;
//     $inputPoints.val(pointsCount);

//     const customScale = $slider.slider('custom-scale');
//     if (customScale) $customValues.val(customScale.join(','));
//     else $customValues.parents(`.${CLASSES.PANEL_ROW}`).remove();

//     const min = $slider.slider('min');
//     const max = $slider.slider('max');
//     if (typeof min !== 'number' || typeof max !== 'number') {
//       $scaleMax.parents(`.${CLASSES.PANEL_ROW}`).remove();
//     } else {
//       $scaleMin.val(min);
//       $scaleMax.val(max);
//     }

//     this.recreateControlsValueOut();
//   }

//   private initEventListeners(): void {
//     const {
//       $inputStep,
//       $radioViewName,
//       $checkboxBgLine,
//       $checkboxTooltip,
//       $inputPoints,
//       $slider,
//       $scaleMax,
//       $scaleMin,
//       $customValues,
//     } = this.domElements;

//     $inputStep.on(
//       'focusout.configPanel.updateStep',
//       this.handleInputStepFocusout,
//     ).on(
//       'keyup.configPanel.updateStep',
//       { handler: this.handleInputStepFocusout },
//       ConfigPanel._handleInputKeyup,
//     );

//     $radioViewName.on(
//       'input.configPanel.changeViewName',
//       this.handleRadioViewNameInput,
//     );

//     $checkboxBgLine.on(
//       'input.configPanel.bgLineToggle',
//       this.handleCheckboxBgLineInput,
//     );

//     $checkboxTooltip.on(
//       'input.configPanel.tooltips',
//       this.handleCheckboxTooltipInput,
//     );

//     $inputPoints.on(
//       'focusout.configPanel.changeNumberOfPoints',
//       this.handleInputPointsFocusout,
//     ).on(
//       'keyup.configPanel.changeNumberOfPoints',
//       { handler: this.handleInputPointsFocusout },
//       ConfigPanel._handleInputKeyup,
//     );

//     $scaleMax.on(
//       'focusout.configPanel.setScaleMax',
//       this.handleMaxFocusout,
//     ).on(
//       'keyup.configPanel.setScaleMax',
//       { handler: this.handleMaxFocusout },
//       ConfigPanel._handleInputKeyup,
//     );

//     $scaleMin.on(
//       'focusout.configPanel.setScaleMin',
//       this.handleMinFocusout,
//     ).on(
//       'keyup.configPanel.setScaleMin',
//       { handler: this.handleMinFocusout },
//       ConfigPanel._handleInputKeyup,
//     );

//     $customValues.on(
//       'focusout.configPanel.setCustomScale',
//       this.handleCustomValuesFocusout,
//     ).on(
//       'keyup.configPanel.setCustomScale',
//       { handler: this.handleCustomValuesFocusout },
//       ConfigPanel._handleInputKeyup,
//     );

//     $slider.on(
//       'point-move.configPanel.updateControlsValueOutContainer',
//       this.handleSliderPointMove,
//     );
//   }

//   @boundMethod
//   private static _handleInputKeyup(ev: JQuery.KeyUpEvent): void {
//     // 13 - key code for 'enter'
//     if (ev.keyCode === 13) {
//       const { handler } = ev.data;
//       if (typeof handler === 'function') handler(ev);
//     }
//   }

//   @boundMethod
//   private handleCustomValuesFocusout(): void {
//     const { $slider, $customValues } = this.domElements;

//     const values = $customValues.val().toString();
//     const customScale = values.split(',');

//     $slider.slider('custom-scale', customScale);
//     $customValues.val($slider.slider('custom-scale').toString());
//   }

//   @boundMethod
//   private handleMaxFocusout(): void {
//     const { $slider, $scaleMax } = this.domElements;
//     const newMax = parseInt($scaleMax.val().toString(), 10);

//     if (!Number.isNaN(newMax)) $slider.slider('max', newMax);
//     $scaleMax.val($slider.slider('max'));
//   }

//   @boundMethod
//   private handleMinFocusout(): void {
//     const { $slider, $scaleMin } = this.domElements;
//     const newMin = parseInt($scaleMin.val().toString(), 10);

//     if (!Number.isNaN(newMin)) $slider.slider('min', newMin);
//     $scaleMin.val($slider.slider('min'));
//   }

//   private recreateControlsValueOut(): void {
//     const {
//       $slider,
//       inputsValueOut,
//       $controlsValueOutContainer,
//     } = this.domElements;

//     $controlsValueOutContainer.html('');
//     inputsValueOut.length = 0;

//     $slider.slider('values').forEach((value: string | number, index: number) => {
//       const $controlValueOut = createControlValueOut(index, value);
//       $controlsValueOutContainer.append($controlValueOut);
//       const $input = $controlValueOut.find('input');
//       inputsValueOut.push($input);
//       $input.on(
//         'focusout.configPanel.updateSliderValues',
//         this.handleInputValueOutFocusout,
//       ).on(
//         'keyup.configPanel.updateSliderValues',
//         { handler: this.handleInputValueOutFocusout },
//         ConfigPanel._handleInputKeyup,
//       );
//     });
//   }

//   @boundMethod
//   private handleInputValueOutFocusout(ev: JQuery.EventBase): void {
//     const { $slider } = this.domElements;
//     const $input = $(ev.currentTarget);
//     const currentValues = $slider.slider('values');
//     const inputIndex = parseInt($input.data('index').toString(), 10);

//     if (typeof currentValues[0] === 'number') {
//       currentValues[inputIndex] = parseInt($input.val().toString(), 10);
//     } else {
//       currentValues[inputIndex] = $input.val().toString();
//     }

//     $slider
//       .slider('values', currentValues)
//       .slider('values')
//       .forEach(
//         (
//           value: string | number,
//           index: number,
//         ) => this.domElements.inputsValueOut[index].val(value),
//       );
//   }

//   @boundMethod
//   private handleSliderPointMove(): void {
//     const {
//       inputsValueOut,
//       $slider,
//     } = this.domElements;

//     const values = $slider.slider('values');

//     if (inputsValueOut.length !== values.length) this.recreateControlsValueOut();

//     values.forEach((value: string | number, index: number) => inputsValueOut[index].val(value));
//   }

//   @boundMethod
//   private handleInputPointsFocusout(): boolean {
//     const {
//       $inputPoints,
//       $slider,
//     } = this.domElements;

//     const points = parseInt($inputPoints.val().toString(), 10);
//     if (points < 1) return false;

//     const currentValues = $slider.slider('values');
//     const pointsNow = currentValues.length;

//     if (pointsNow === points) return true;

//     if (points < pointsNow) {
//       $slider.slider('values', currentValues.slice(0, points));
//       this.recreateControlsValueOut();
//       return true;
//     }

//     const lastValue = currentValues[currentValues.length - 1];
//     while (currentValues.length < points) {
//       if (typeof lastValue === 'number') (currentValues as number[]).push(lastValue);
//       else (currentValues as string[]).push(lastValue);
//     }

//     $slider.slider('values', currentValues);
//     this.recreateControlsValueOut();

//     return true;
//   }

//   @boundMethod
//   private handleCheckboxTooltipInput(): void {
//     const {
//       $slider,
//       $checkboxTooltip,
//     } = this.domElements;

//     const areTooltipsVisible = Boolean($checkboxTooltip.prop('checked'));
//     $slider.slider('show-tooltips', areTooltipsVisible);
//   }

//   @boundMethod
//   private handleCheckboxBgLineInput(): void {
//     const {
//       $slider,
//       $checkboxBgLine,
//     } = this.domElements;

//     const isBgLineVisible = Boolean($checkboxBgLine.prop('checked'));
//     $slider.slider('show-bg-line', isBgLineVisible);
//   }

//   @boundMethod
//   private handleInputStepFocusout(): void {
//     const {
//       $slider,
//       $inputStep,
//     } = this.domElements;

//     $slider.slider('step', parseInt($inputStep.val().toString(), 10));
//     $inputStep.val($slider.slider('step'));
//   }

//   @boundMethod
//   private handleRadioViewNameInput(ev: JQuery.EventBase): void {
//     const viewName = ev.currentTarget.getAttribute('value');
//     this.domElements.$slider.slider('view-name', viewName);
//   }
// }

// export default ConfigPanel;
