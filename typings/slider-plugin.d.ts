/**
 * @selector css selector
 * @orientation slider orientation 'horizontal' (default) or 'vertical'
 */
interface SliderOptions {
    readonly selector: string;
    readonly orientation: string;
}

interface SliderPluginFunctionInit {
    (this: JQuery, command: string, params: SliderOptions): any;
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