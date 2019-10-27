type SliderMode = 'single' | 'range';
type SliderScale = {
    type: 'range',
    value: [number, number];
} | {
    type: 'array',
    value: number[] | string[]
}

interface PrettifyFunc {
    (value: string): string;
}

/**
 * @param selector css selector
 * @param viewName Slider appearance name 'horizontal' (default) | 'vertical'
 * @param selectMode Type of selected value: range or single value ('range' | 'single')
 * @param step Slider step size. The value must be greater than zero.
 */
interface SliderConfig {
    readonly viewName?: SliderViewName;
    readonly selectMode?: SliderMode;
    readonly showValue?: boolean;
    readonly scale?: SliderScale;
    readonly step?: number;
    readonly prettify?: PrettifyFunc;
}

interface ISlider {
    
}