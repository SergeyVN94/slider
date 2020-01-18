interface SliderModelDataManager {
    scale: SliderScale;
    scaleType: 'string-array' | 'number-range';
    pointSteps: number[];
    stepSize: number;
    steps: number;
}
