export const sliderPluginFunction: SliderPluginFunction = function(this: JQuery, command: Command, params: any): any {
    if (command === 'onInput') {
        if (typeof params !== 'function') {
            throw 'For "onInput" command expected function';
        }

        this.get()[0].slider.onStateChange(params);        
    }

    if (command === 'setValue') {
        this.get()[0].slider.setValue(params);
    }

    if (command === 'showValue') {
        this.get()[0].slider.showValue(params);
    }

    return this;
}