type SliderMode = 'single' | 'range';
type SliderScale = [number, number] | string[];

interface PrettifyFunc {
    (value: string): string;
}

type CoupleStr = [string, string];
type CoupleNum = [number, number];

/**
 * @param viewName Slider appearance name 'horizontal' (default) | 'vertical'
 * @param selectMode Type of selected value: range or single value ('range' | 'single')
 * @param showValue
 * @param scale
 * @param step Slider step size. The value must be greater than zero.
 * @param prettify
 * @param start
 */
interface SliderConfig {
    readonly viewName?: SliderViewName;
    readonly selectMode?: SliderMode;
    readonly showValue?: boolean;
    readonly scale?: SliderScale;
    readonly step?: number;
    readonly prettify?: PrettifyFunc;
    readonly start?: number[] | string[];
    readonly showBgLine?: boolean;
    readonly showScale?: boolean;
}

interface SliderValueCallback {
    (values: string[]): void;
}

interface ISlider {
    onStateChange(callback: SliderValueCallback): void;
    value(value?: number[] | string[]): string[] | void;
    showValue(state?: boolean): boolean | void;
    step(value?: number): number | void;
}