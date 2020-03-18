interface ISliderModelDataManager {
    scale: SliderScale;
    scaleType: 'string' | 'number';
    pointSteps: number[];
    stepSize: number;
    steps: number;
}
