type SliderMode = 'single' | 'range';

/**
 * @selector css selector
 * @orientation slider orientation 'horizontal' (default) or 'vertical'
 * @param selectMode
 */
interface SliderConfig {
    readonly viewName?: SliderViewName;
    readonly selectMode?: SliderMode;
    readonly showValue?: boolean;
    readonly minMax: [number, number];
    readonly step?: number;
    readonly customValues?: number[] | string[];
}

interface ISlider {
    
}