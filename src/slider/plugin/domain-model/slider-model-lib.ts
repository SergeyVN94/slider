export function calcSliderRange(scale: SliderScale, step?: number): number {
    if (scale.type === 'array') {
        return Math.floor(scale.value.length - 1);
    }

    const minMax: [number, number] = scale.value;
    return Math.floor((minMax[1] - minMax[0]) / (step || 1));
}

export function valueToPointPosition(value: number | string, dataManager: ISliderModelDataManager): number {
    const scale = dataManager.getScale();
    const step = dataManager.getStep();

    if (scale.type === 'range' && typeof value === 'string') {
        throw 'A range of numbers can only be initialized with a number';
    }

    if (scale.type === 'range') {
        value = value as number;
        const minMax: [number, number] = scale.value;  
        
        if (value < minMax[0]) {
            return 0;
        }

        if (value > minMax[1]) {
            return dataManager.getRangeOfValues();
        }

        const stepsInValue: number = (value - minMax[0]) / step;        
        return Math.round(stepsInValue);
    } else {
        let result = -1;
        scale.value.forEach((item: number | string, index: number) => {
            if (item === value) {
                result = index;
            }
        });
        if (result < 0) {
            throw `The value "${value}" does not exist in the array of values.`;
        }

        return result;
    }
}