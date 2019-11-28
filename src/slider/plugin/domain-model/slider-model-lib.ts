function calcSliderRange(scale: SliderScale, step?: number): number {
    if (typeof scale[0] === 'string') {
        return scale.length - 1;
    }

    const minMax: CoupleNum = scale as CoupleNum;
    return Math.floor((minMax[1] - minMax[0]) / (step || 1));
}

function valueToPointPosition(
    value: number | string,
    dataManager: SliderModelDataManager
): number {
    const scale = dataManager.getScale();
    const step = dataManager.getStep();

    if (typeof scale[0] === 'number' && typeof value === 'string') {
        try {
            value = parseInt(value, 10);
        } catch (error) {
            console.error('A range of numbers can only be initialized with a number');
        }
    }

    if (typeof scale[0] === 'number') {
        value = value as number;
        const minMax: CoupleNum = scale as CoupleNum;

        if (value < minMax[0]) {
            return -1;
        }

        if (value > minMax[1]) {
            return -1;
        }

        const stepsInValue: number = Math.round((value - minMax[0]) / step);
        if (stepsInValue * step + minMax[0] > minMax[1]) {
            return dataManager.getRangeOfValues();
        }

        return stepsInValue;
    }

    let result = -1;
    (scale as string[]).forEach((item: string, index: number) => {
        if (item === value) {
            result = index;
        }
    });

    return result;
}

export { calcSliderRange, valueToPointPosition };
