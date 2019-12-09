const pluginFunctionSingle = function pluginFunctionCommandOnly(
    this: JQuery,
    command: Command
): SliderPluginResponse {
    if (command === 'showTooltips') {
        return this.get()[0].slider.isShowTooltips;
    }

    if (command === 'value') {
        return this.get()[0].slider.value;
    }

    if (command === 'step') {
        return this.get()[0].slider.step;
    }
};

export default pluginFunctionSingle;
