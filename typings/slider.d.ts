type SliderPointPosition = {
    value: number;
} | {
    valueMin: number;
    valueMax: number;
}

/**
 * @selector css selector
 * @orientation slider orientation 'horizontal' (default) or 'vertical'
 * @param selectMode
 */
interface SliderConfig {
    readonly slider?: JQuery;
    readonly selector?: string;
    readonly orientation?: 'horizontal' | 'vertical';
    readonly selectMode?: 'single' | 'range';
    readonly showValue?: boolean;
}

interface SliderSetting {
    readonly selector: string;
}

interface ISlider {
    readonly _slider: JQuery;
    _setting: SliderSetting;
    readonly _presenter: ISliderPresenter;
}