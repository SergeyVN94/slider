interface ISliderModelStateHandler {
    updateModelState(state: SliderStateData, dataManager: ISliderModelDataManager): void;
    getModelState(dataManager: ISliderModelDataManager): SliderModelStateData;
}