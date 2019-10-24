type SliderPointPosition = {
    value: number;
} | {
    valueMin: number;
    valueMax: number;
}

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
}

interface SliderSetting {

}

interface ISlider {
    
}