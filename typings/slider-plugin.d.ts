type Command = 'init' | 'onSelect' | 'value' | 'showTooltips' | 'step';

type SliderPluginSelectEventCallback = (value: string[]) => void;

type SliderPluginResponse = void | boolean | string[] | number[] | string | number | JQuery;

type SliderPluginParams =
    | boolean
    | string[]
    | number
    | number[]
    | SliderPluginSelectEventCallback
    | SliderConfig;

type SliderPluginFunctionInit = (this: JQuery, params: SliderConfig) => void;

type SliderPluginFunctionSingle = (this: JQuery, command: Command) => SliderPluginResponse;

type SliderPluginFunction = (
    this: JQuery,
    command: Command,
    params: SliderPluginParams
) => SliderPluginResponse;

type SliderPluginFunctionGlobal = (
    this: JQuery,
    command: Command,
    params?: SliderPluginParams
) => SliderPluginResponse;

interface JQuery {
    slider: SliderPluginFunctionGlobal;
}

interface Element {
    slider: Slider;
}
