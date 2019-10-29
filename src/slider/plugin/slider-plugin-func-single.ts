export const sliderPluginFunctionSingle: SliderPluginFunctionSingle = function(this: JQuery, command: Command): any {
    if (command === 'showValue') {
        return this.get()[0].slider.showValue();
    }
}