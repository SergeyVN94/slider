/**
 * @selector css selector
 * @orientation slider orientation 'horizontal' (default) or 'vertical'
 */
interface SliderConfig {
    readonly slider?: JQuery;
    readonly selector: string;
    readonly orientation: string;
}

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