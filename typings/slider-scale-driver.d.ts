interface ISliderScaleDriver {
    getAllSteps(scale: SliderScale, stepSize: number): number;
    valueToStep(value: number | string, dataManager: ISliderModelDataManager): number;
    isCorrectStepSize(scale: SliderScale, stepSize: number): boolean;
    stepToValue(step: number, dataManager: ISliderModelDataManager): string | number | null;
}
