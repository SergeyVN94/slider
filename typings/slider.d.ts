type SliderMode = 'single' | 'range';
type SliderScale = {
    type: 'range',
    value: [number, number];
} | {
    type: 'custom',
    value: string[]
}

interface PrettifyFunc {
    (value: string): string;
}

type CoupleStr = [string, string];
type CoupleNum = [number, number]

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
    readonly start?: number | string | CoupleStr | CoupleNum;
    readonly showBgLine?: boolean;
}

interface SliderValueCallback {
    (value: number | string | CoupleStr | CoupleNum): void;
}

interface ISlider {
    onStateChange(callback: SliderValueCallback): void;
    value(value?: number | string | CoupleNum | CoupleStr): string | CoupleStr | void;
    showValue(state?: boolean): boolean | void;
    step(value?: number): number | void;
}