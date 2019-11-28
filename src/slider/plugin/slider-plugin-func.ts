const sliderPluginFunction: SliderPluginFunction = function(
    this: JQuery,
    command: Command,
    params: SliderPluginParams
): SliderPluginResponse {
    if (command === 'onSelect') {
        if (typeof params !== 'function') {
            throw TypeError('For "onSelect" command expected SliderPluginSelectEventCallback');
        }

        this.get()[0].slider.onSelect(params);
    }

    if (command === 'value') {
        this.get()[0].slider.value(params as (string[] | number[]));
    }

    if (command === 'showTooltips') {
        this.get()[0].slider.showTooltips(params as boolean);
    }

    if (command === 'step') {
        return this.get()[0].slider.step(Number(params));
    }

    return this;
};

export { sliderPluginFunction };
