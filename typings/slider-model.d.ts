type HandlerSliderModelUpdate = (points: SliderPointState[]) => void;

interface ISliderModel {
    update(state: SliderViewState): void;
    onUpdate(callback: HandlerSliderModelUpdate): void;
    getPointStates(): SliderPointState[];
}
