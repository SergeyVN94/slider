interface ISliderModelStateHandler {
    updateModelState(state: SliderViewStateData, dataManager: ISliderModelDataManager): void;
    getModelState(dataManager: ISliderModelDataManager): SliderModelPointsState;
}