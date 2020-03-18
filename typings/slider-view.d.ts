type SliderPointState = {
    readonly position: number;
    readonly value?: string | number;
};

type ISliderViewState = {
    readonly targetPosition: number;
    readonly pointSelected: number;
};

type HandlerSliderViewSelect = (state: ISliderViewState) => void;

type ISliderViewDriverFactory = (viewName: ISliderViewName, $slider: JQuery) => ISliderViewDriver;

interface ISliderView {
    onSelect(callback: HandlerSliderViewSelect): void;
    update(points: SliderPointState[]): void;
}

type ISliderViewName = 'horizontal' | 'vertical';
