type HandlerSliderModelUpdate = (points: SliderPointState[]) => void;

type SliderScaleDriverFactory = (scale: SliderScale) => SliderScaleDriver;

interface SliderModel {
    update(state: SliderViewState): void;
    onUpdate(callback: HandlerSliderModelUpdate): void;
    getPointStates(): SliderPointState[];
}
