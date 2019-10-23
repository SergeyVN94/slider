interface SliderPluginFunctionInit {
    (this: JQuery, params: SliderConfig): void;
}

interface SliderPluginFunctionSingle {
    (this: JQuery, command: string): any;
}

interface SliderPluginFunction {
    (this: JQuery, command: string, params: any): any;
}

interface SliderPluginFunctionGlobal {
    (this: JQuery, command: string, params?: any): any;
}

interface JQuery {
    slider: SliderPluginFunctionGlobal;
}

interface Element {
    slider: ISlider;
}