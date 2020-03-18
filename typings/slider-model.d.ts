type HandlerSliderModelUpdate = (points: SliderPointState[]) => void;

type ISliderScaleDriverFactory = (scale: SliderScale) => ISliderScaleDriver;

interface ISliderModel {
    update(state: ISliderViewState): void;
    onUpdate(callback: HandlerSliderModelUpdate): void;
    getPointStates(): SliderPointState[];
}
