type SliderMode = 'single' | 'range';
type SliderScale = CoupleNum | string[];

type PrettifyFunc = (value: string | number) => string;

type CoupleStr = [string, string];
type CoupleNum = [number, number];

/**
 * @param viewName Slider appearance name 'horizontal' (default) | 'vertical'
 * @param selectMode Type of selected value: range or single value ('range' | 'single')
 * @param showTooltips
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
    readonly start?: string[] | number[];
    readonly showBgLine?: boolean;
}

type HandlerSliderSelect = (values: string[] | number[]) => void;

interface Slider {
    value: string[] | number[];
    step: number;
    isShowTooltips: boolean;
    onSelect(callback: HandlerSliderSelect): void;
}
