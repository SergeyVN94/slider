type HandlerSliderModelUpdate = (points: SliderPointState[]) => void;

interface SliderModel {
    update(state: SliderViewState): void;
    onUpdate(callback: HandlerSliderModelUpdate): void;
    getPointStates(): SliderPointState[];
}
