/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ViewName } from 'src/slider/view/types';
import CLASSES from './classes';

import './config-panel.sass';

type Components = {
  $checkboxesAndRadio: JQuery;
  $textInputs: JQuery;
  $containerForInputsValues: JQuery;
  $buttonAddingPoint: JQuery;
  inputsValues: JQuery[];
};

class ConfigPanel {
  private components: Components;

  private $slider: JQuery;

  constructor($panel: JQuery, $slider: JQuery) {
    this.$slider = $slider;
    this.createComponents($panel);
    this.initEventListeners();
    this.updateInputs();
  }

  private createComponents($panel: JQuery): void {
    this.components = {
      $checkboxesAndRadio: $panel.find('[type="radio"], [type="checkbox"]'),
      $textInputs: $panel.find('[type="text"], [type="number"], textarea'),
      $containerForInputsValues: $panel.find(`.${CLASSES.VALUES_INPUTS_CONTAINER}`),
      $buttonAddingPoint: $panel.find('[name="add-point"]'),
      inputsValues: [],
    };

    const sliderConfig = this.$slider.slider('config');

    if ('min' in sliderConfig) {
      this.components.$textInputs.each((_, element) => {
        const $input = $(element);
        if ($input.attr('name') === 'custom-scale') $input.parents(`.${CLASSES.ROW}`).remove();
      });
    } else {
      this.components.$textInputs.each((_, element) => {
        const $input = $(element);
        if ($input.attr('name') === 'min') $input.parents('fieldset').remove();
      });
    }
  }

  private initEventListeners(): void {
    this.handleButtonRemoveClick = this.handleButtonRemoveClick.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleInputKeypress = this.handleInputKeypress.bind(this);
    this.handleButtonAddingPointClick = this.handleButtonAddingPointClick.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);

    const { $textInputs, $checkboxesAndRadio, $buttonAddingPoint } = this.components;

    $textInputs
      .on('blur', this.handleInputBlur)
      .on('keypress', this.handleInputKeypress);
    $checkboxesAndRadio.on('change', this.handleCheckboxChange);
    $buttonAddingPoint.on('click', this.handleButtonAddingPointClick);
    this.$slider.on('change', this.handleSliderChange);
  }

  private updateInputs(): void {
    const sliderConfig = this.$slider.slider('config');
    const { $textInputs, $checkboxesAndRadio, inputsValues } = this.components;

    $textInputs.each((_, element) => {
      const $input = $(element);
      const name = $input.attr('name');

      if (name === 'step') $input.val(sliderConfig.step);

      if ('min' in sliderConfig) {
        if (name === 'min') $input.val(sliderConfig.min);
        if (name === 'max') $input.val(sliderConfig.max);
      } else if (name === 'custom-scale') {
        $input.val(sliderConfig.customScale.join(','));
      }
    });

    $checkboxesAndRadio.each((_, element) => {
      const $input = $(element);
      const name = $input.attr('name');

      if (name === 'tooltips') $input.prop('checked', sliderConfig.tooltips);
      if (name === 'bg-line') $input.prop('checked', sliderConfig.bgLine);
      if (name === 'view-name') {
        $input.prop('checked', sliderConfig.viewName === $input.val());
      }
    });

    if (sliderConfig.values.length !== inputsValues.length) {
      this.createValuesInputs();
    } else {
      sliderConfig.values.forEach((value: string | number, index: number) => {
        inputsValues[index].val(value);
      });
    }
  }

  private createValuesInputs(): void {
    this.components.$containerForInputsValues.html('');
    this.components.inputsValues = [];

    this.$slider.slider('config').values.forEach((value: string | number, index: number) => {
      const $textField = $(`<li class="${CLASSES.ROW}">
        <label class="${CLASSES.LABEL}">
          <span class="${CLASSES.LABEL_TEXT}">Ползунок ${index}</span>
          <input class="${CLASSES.INPUT}" name="point-value" data-id=${index} value=${value} />
          <button class="${CLASSES.BUTTON}" type="button" data-index="${index}">x</button>
        </label>
      </li>`);

      const $input = $textField.find('input');
      $input
        .on('blur', this.handleInputBlur)
        .parent()
        .find(`.${CLASSES.BUTTON}`)
        .on('click', this.handleButtonRemoveClick);

      this.components.inputsValues.push($input);
      this.components.$containerForInputsValues.append($textField);
    });
  }

  private handleInputKeypress(ev: JQuery.KeyPressEvent): void {
    const $input = $(ev.target);
    if (ev.key === 'Enter') this.updateSlider($input);
  }

  private handleCheckboxChange(ev: JQuery.ChangeEvent): void {
    this.updateSlider($(ev.target));
  }

  private handleInputBlur(ev: JQuery.BlurEvent): void {
    this.updateSlider($(ev.target));
  }

  private handleButtonRemoveClick(ev: JQuery.ClickEvent): void {
    const index = parseInt(String(ev.target.dataset.index), 10);

    if (!Number.isNaN(index)) {
      const values = [...this.$slider.slider('config').values].splice(index, 1);
      this.$slider.slider('config', { values: values as string[] });
    }
  }

  private handleSliderChange(_: JQuery.EventBase, values: string[] | number[]): void {
    if (values.length !== this.components.inputsValues.length) {
      this.createValuesInputs();
    } else {
      values.forEach((value: string | number, index: number) => {
        this.components.inputsValues[index].val(value);
      });
    }
  }

  private handleButtonAddingPointClick(): void {
    const currentValues = this.$slider.slider('config').values;
    const values = [...currentValues, currentValues[currentValues.length - 1]];
    this.$slider.slider('config', { values: values as string[] });
  }

  private updateSlider($input: JQuery): void {
    const name = $input.attr('name');
    const value = $input.val();
    const checked = $input.prop('checked');
    const index = parseInt(String($input.data('index')), 10);

    if (name === 'tooltips') this.$slider.slider('config', { tooltips: checked });
    if (name === 'bg-line') this.$slider.slider('config', { bgLine: checked });
    if (name === 'view-name') this.$slider.slider('config', { viewName: value as ViewName });
    if (name === 'min') this.$slider.slider('config', { min: value as number });
    if (name === 'max') this.$slider.slider('config', { max: value as number });
    if (name === 'custom-scale') this.$slider.slider('config', { customScale: value as string[] });

    if (name === 'point-value' && !Number.isNaN(index)) {
      const values = [...this.$slider.slider('config').values];
      values[index] = value.toString();
      this.$slider.slider('config', { values: values as string[] });
    }

    this.updateInputs();
  }
}

export default ConfigPanel;
