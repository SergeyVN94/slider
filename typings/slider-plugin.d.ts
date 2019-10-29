type Command = 
    'init' | 
    'onInput' | 
    'value' | 
    'showValue'
;

interface SliderPluginFunctionInit {
    (this: JQuery, params: SliderConfig): void;
}

interface SliderPluginFunctionSingle {
    (this: JQuery, command: Command): any;
}

interface SliderPluginFunction {
    (this: JQuery, command: Command, params: any): any;
}

interface SliderPluginFunctionGlobal {
    (this: JQuery, command: Command, params?: any): any;
}

interface JQuery {
    slider: SliderPluginFunctionGlobal;
}

interface Element {
    slider: ISlider;
}