interface ScaleDriver {
    getAllSteps(scale: SliderScale, stepSize: number): number;
    valueToStep(value: number | string, dataManager: SliderModelDataManager): number;
    isCorrectStepSize(scale: SliderScale, stepSize: number): boolean;
}
