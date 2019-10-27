export function calcSliderRange(scale: SliderScale, step?: number): number {
    if (scale.type === 'array') {
        return Math.floor((scale.value.length - 1) / (step || 1));
    }

    const minMax: [number, number] = scale.value;
    return Math.floor((minMax[1] - minMax[0]) / (step || 1));
}

export function valueToPointPosition(value: number | string, dataManager: ISliderModelDataManager): number {
    const scale = dataManager.getScale();
    const range = dataManager.getRangeOfValues();

    return 0;
}