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
    let _value = value;

    if (typeof scale[0] === 'number' && typeof _value === 'string') {
        try {
            _value = parseInt(_value, 10);
        } catch (error) {
            console.error('A range of numbers can only be initialized with a number');
        }
    }

    if (typeof scale[0] === 'number') {
        _value = _value as number;
        const minMax: CoupleNum = scale as CoupleNum;

        if (_value < minMax[0]) {
            return -1;
        }

        if (_value > minMax[1]) {
            return -1;
        }

        const stepsInValue: number = Math.round((_value - minMax[0]) / step);
        if (stepsInValue * step + minMax[0] > minMax[1]) {
            return dataManager.getRange();
        }

        return stepsInValue;
    }

    let result = -1;
    (scale as string[]).forEach((item: string, index: number) => {
        if (item === _value) {
            result = index;
        }
    });

    return result;
}

export { calcSliderRange, valueToPointPosition };
