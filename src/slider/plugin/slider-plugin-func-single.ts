const sliderPluginFunctionSingle: SliderPluginFunctionSingle = function(
    this: JQuery,
    command: Command
): SliderPluginResponse {
    if (command === 'showTooltips') {
        return this.get()[0].slider.showTooltips();
    }

    if (command === 'value') {
        return this.get()[0].slider.value();
    }

    if (command === 'step') {
        return this.get()[0].slider.step();
    }
};

export { sliderPluginFunctionSingle };
