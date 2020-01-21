type Command = 'init' | 'value' | 'showTooltips' | 'step';

type SliderPluginResponse = void | boolean | string[] | number[] | string | number | JQuery;

type SliderPluginParams =
    | boolean
    | string[]
    | number
    | number[]
    | SliderConfig;

type SliderPluginFunctionInit = (this: JQuery, params: SliderConfig) => void;

type SliderPluginFunctionSingle = (this: JQuery, command: Command) => SliderPluginResponse;

// type SliderPluginFunction = (
//     this: JQuery,
//     command: Command,
//     params: SliderPluginParams
// ) => SliderPluginResponse;

interface SliderPluginFunction {
    (
        this: JQuery,
        command: 'init',
        config: {
            readonly start?: string[] | number[];
            readonly scale?: SliderScale;
            readonly viewName?: SliderViewName;
            readonly showTooltips?: boolean;
            readonly step?: number;
            readonly prettify?: PrettifyFunc;
            readonly showBgLine?: boolean;
        }
    ): JQuery;
    (
        this: JQuery,
        command: 'step'
    ): number;
    (
        this: JQuery,
        command: 'step',
        step: number
    ): JQuery;
    (
        this: JQuery,
        command: 'value'
    ): string[] | number[];
    (
        this: JQuery,
        command: 'value',
        value: string[] | number[]
    ): JQuery;
    (
        this: JQuery,
        command: 'showTooltips'
    ): boolean;
    (
        this: JQuery,
        command: 'showTooltips',
        isShow: boolean
    ): JQuery;
}

interface Element {
    slider: Slider;
}
