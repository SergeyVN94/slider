type SliderPointPosition = {
    value: number;
} | {
    valueMin: number;
    valueMax: number;
}

type SliderMode = 'single' | 'range';
type SliderOrientation = 'horizontal' | 'vertical';

/**
 * @selector css selector
 * @orientation slider orientation 'horizontal' (default) or 'vertical'
 * @param selectMode
 */
interface SliderConfig {
    readonly selector?: string;
    readonly orientation?: SliderOrientation;
    readonly selectMode?: SliderMode;
    readonly showValue?: boolean;
}

interface SliderSetting {

}

interface ISlider {
    
}