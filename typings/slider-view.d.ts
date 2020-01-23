type SliderPointState = {
    readonly position: number;
    readonly value?: string | number;
};

type SliderViewState = {
    readonly targetPosition: number;
    readonly pointSelected: number;
};

type HandlerSliderViewSelect = (state: SliderViewState) => void;

interface SliderView {
    showTooltips: boolean;
    viewName: 'horizontal' | 'vertical';
    onSelect(callback: HandlerSliderViewSelect): void;
    update(points: SliderPointState[]): void;
}

type SliderViewName = 'horizontal' | 'vertical';
