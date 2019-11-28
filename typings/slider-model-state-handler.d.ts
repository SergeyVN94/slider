interface SliderModelStateHandler {
    updateModelState(state: SliderViewState, dataManager: SliderModelDataManager): void;
    getModelState(dataManager: SliderModelDataManager): SliderModelPointsState;
}
