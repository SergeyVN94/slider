type SliderMode = 'single' | 'range';
type SliderScale = [number, number] | string[];

type PrettifyFunc = (value: string) => string;

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
    readonly showTooltips?: boolean;
    readonly scale?: SliderScale;
    readonly step?: number;
    readonly prettify?: PrettifyFunc;
    readonly start?: number[] | string[];
    readonly showBgLine?: boolean;
}

type SliderValueCallback = (values: string[]) => void;

interface Slider {
    onSelect(callback: SliderValueCallback): void;
    value(value?: number[] | string[]): string[] | void;
    showTooltips(state?: boolean): boolean | void;
    step(value?: number): number | void;
}
