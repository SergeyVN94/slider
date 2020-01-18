type HandlerSliderModelUpdate = (points: SliderPointState[]) => void;

interface SliderModel {
    step: number;
    value: string[] | number[];
    update(state: SliderViewState): void;
    onUpdate(callback: HandlerSliderModelUpdate): void;
}
