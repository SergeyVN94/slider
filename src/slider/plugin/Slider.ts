import Model from '../model/Model';
import ModelStringsScale from '../model/ModelStringsScale';
import View from '../view/View';
import Presenter from '../middleware/Presenter';
import { VIEW_HORIZONTAL, VIEW_VERTICAL } from '../view/types';
import { SliderPluginConfig, SliderConfig } from './types';
import { DEFAULT_PLUGIN_CONFIG, CONFIG } from './config';

import './slider.sass';

class Slider {
  private model: Model | ModelStringsScale;

  private view: View;

  constructor(container: HTMLElement, config?: SliderPluginConfig) {
    try {
      this.init(container, config);
    } catch (error) {
      console.error(error);
    }
  }

  public getConfig(): SliderConfig {
    return {
      ...this.model.getConfig(),
      ...this.view.getConfig(),
    };
  }

  // public setConfig(config: SliderPluginConfig): void {
  //   try {
  //     this.currentConfig = Slider.normalizeConfig(config);

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  private init(container: HTMLElement, config: unknown): void {
    const normalizedConfig = Slider.normalizeConfig(config);

    if ('min' in normalizedConfig) this.model = new Model({ ...normalizedConfig });
    else this.model = new ModelStringsScale({ ...normalizedConfig });

    const modelConfig = this.model.getConfig();

    this.view = new View({
      ...normalizedConfig,
      container,
      pointsCount: modelConfig.values.length,
      scaleItems: modelConfig.scaleItems,
    });

    new Presenter(this.view, this.model);
  }

  private static normalizeConfig(config: any): SliderConfig {
    if (Object.prototype.toString.call(config) !== '[object Object]') return DEFAULT_PLUGIN_CONFIG;

    const normalizedConfig: any = { ...config };
    const isUsingCustomScale = 'customScale' in config;

    if (typeof config.prettify === 'function') normalizedConfig.prettify = config.prettify;

    normalizedConfig.step = config.step ? Slider.normalizeNumber(config.step) : 1;
    if (Number.isNaN(normalizedConfig.step)) {
      console.error('Slider step must be a number.');
      normalizedConfig.step = 1;
    }

    if (isUsingCustomScale) {
      if (!Array.isArray(config.customScale)) throw new TypeError('Custom scale must be array.');
      normalizedConfig.customScale = config.customScale.map((i: unknown) => String(i));
    } else {
      normalizedConfig.min = config.min ? Slider.normalizeNumber(config.min) : 0;
      normalizedConfig.max = config.max ?Slider.normalizeNumber(config.max) : 0;

      if (Number.isNaN(normalizedConfig.min)) {
        console.error('Minimum must be a number.');
        normalizedConfig.min = 0;
      }

      if (Number.isNaN(normalizedConfig.step)) {
        console.error('Maximum must be a number.');
        normalizedConfig.max = normalizedConfig.min + CONFIG.range;
      }
    }

    if ('values' in config) {
      if (!Array.isArray(config.values)) throw new TypeError('Values must be array.');
      normalizedConfig.values = isUsingCustomScale
        ? config.values.map((i: unknown) => String(i))
        : config.values.map((i: unknown) => parseInt(String(i), 10));

      if (!isUsingCustomScale && normalizedConfig.values.some((i: number) => Number.isNaN(i))) {
        throw new TypeError('For a range of numbers, values ​​must be numbers.');
      }
    } else {
      normalizedConfig.values = isUsingCustomScale
        ? [normalizedConfig.customScale[0]]
        : [normalizedConfig.min];
    }

    if ('viewName' in config && ![VIEW_HORIZONTAL, VIEW_VERTICAL].includes(config.viewName)) {
      normalizedConfig.viewName = VIEW_HORIZONTAL;
      console.error(new TypeError(`Property viewName must be '${VIEW_HORIZONTAL}' or '${VIEW_VERTICAL}'.`));
    }

    return normalizedConfig;
  }

  private static normalizeNumber(value: unknown): number {
    return parseInt(String(value), 10);
  }
}

export default Slider;
