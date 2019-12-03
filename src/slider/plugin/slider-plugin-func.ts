const sliderPluginFunction: SliderPluginFunction = function(
    this: JQuery,
    command: Command,
    params: SliderPluginParams
): SliderPluginResponse {
    if (command === 'onSelect') {
        if (typeof params !== 'function') {
            throw TypeError('For "onSelect" command expected HandlerSliderPluginSelect');
        }

        this.get()[0].slider.onSelect(params);
    }

    if (command === 'value') {
        this.get()[0].slider.value = params as string[];
    }

    if (command === 'showTooltips') {
        this.get()[0].slider.isShowTooltips = params as boolean;
    }

    if (command === 'step') {
        return this.get()[0].slider.step = params as number;
    }

    return this;
};

export { sliderPluginFunction };
