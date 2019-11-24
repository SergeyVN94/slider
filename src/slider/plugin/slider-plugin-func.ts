const sliderPluginFunction: SliderPluginFunction = function(this: JQuery, command: Command, params: any): any {
    if (command === 'onInput') {
        if (typeof params !== 'function') {
            throw 'For "onInput" command expected function';
        }

        this.get()[0].slider.onStateChange(params);        
    }

    if (command === 'value') {
        this.get()[0].slider.value(params);
    }

    if (command === 'showValue') {
        this.get()[0].slider.showValue(params);
    }

    if (command === 'step') {
        return this.get()[0].slider.step(Number(params));
    }

    return this;
}

export {
    sliderPluginFunction
};