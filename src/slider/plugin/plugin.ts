import { Command, COMMANDS, SliderConfig } from './types';
import Slider from './Slider';

// eslint-disable-next-line @typescript-eslint/unbound-method
$.fn.slider = function pluginMainFunction(
  this: JQuery,
  command: Command,
  config?: SliderConfig,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  const slider: Slider = this.data('slider-plugin');

  if (command === COMMANDS.INIT) {
    this.data('slider-plugin', new Slider(this.get().pop(), config));
    return this;
  }

  if (!slider) {
    console.error(new Error('Slider not initialized.'));
    return this;
  }

  // if (command === COMMANDS.CONFIG) {
  //   if (!config) return slider.config;
  //   slider.config = config;
  // }

  console.error(new Error(`Unknown command "${command}"`));
  return this;
};
