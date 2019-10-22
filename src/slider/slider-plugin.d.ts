interface SliderOptions {

}

interface SliderPluginFunction {
    (command: string, params?: string | number | SliderOptions): any;
}

interface JQuery {
    slider: SliderPluginFunction;
}