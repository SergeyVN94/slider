export const sliderPluginFunctionSingle: SliderPluginFunctionSingle = function(this: JQuery, command: Command): any {
    if (command === 'showValue') {
        return this.get()[0].slider.showValue();
    }

    if (command === 'value') {
        return this.get()[0].slider.value();
    }

    if (command === 'step') {
        return this.get()[0].slider.step();
    }
}