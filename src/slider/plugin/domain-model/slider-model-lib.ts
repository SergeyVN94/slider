export function calcSliderRange(scale: SliderScale, step?: number): number {
    if (scale.type === 'custom') {
        return Math.floor(scale.value.length - 1);
    }

    const minMax: [number, number] = scale.value;
    return Math.floor((minMax[1] - minMax[0]) / (step || 1));
}

export function valueToPointPosition(value: number | string, dataManager: ISliderModelDataManager): number {
    const scale = dataManager.getScale();
    const step = dataManager.getStep();

    if (scale.type === 'range' && typeof value === 'string') {
        try {
            value = parseInt(value, 10);
        } catch (error) {
            console.error('A range of numbers can only be initialized with a number');
        }
    }

    if (scale.type === 'range') {
        value = value as number;
        const minMax: [number, number] = scale.value;  
        
        if (value < minMax[0]) {
            return -1;
        }

        if (value > minMax[1]) {
            return -1;
        }

        const stepsInValue: number = (value - minMax[0]) / step;        
        return Math.round(stepsInValue);
    } else {
        let result = -1;
        scale.value.forEach((item: number | string, index: number) => {
            if (item == value) {
                result = index;
            }
        });

        return result;
    }
}