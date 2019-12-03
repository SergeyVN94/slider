function calcRange(scale: SliderScale, step = 1): number {
    if (typeof scale[0] === 'string') {
        return scale.length - 1;
    }

    const minMax: CoupleNum = scale as CoupleNum;
    return Math.floor((minMax[1] - minMax[0]) / step);
}

function numberToPointPosition(value: number, dataManager: SliderModelDataManager): number {
    const { step, range } = dataManager;
    const minMax: CoupleNum = dataManager.scale as CoupleNum;

    if (typeof dataManager.scale[0] === 'string') {
        console.error(
            new Error(
                'You cannot set the position of a point using a number if the scale is an array of strings'
            )
        );
        return -1;
    }

    if (value < minMax[0]) {
        return -1;
    }

    if (value > minMax[1]) {
        return -1;
    }

    const stepsInValue: number = Math.round((value - minMax[0]) / step);

    if (stepsInValue * step + minMax[0] > minMax[1]) {
        return range;
    }

    return stepsInValue;
}

function stringToPointPosition(value: string, dataManager: SliderModelDataManager): number {
    const { scale } = dataManager;

    if (typeof dataManager.scale[0] === 'number') {
        console.error(
            new Error(
                'You cannot set the position of a point using a string if the scale is a range of numbers'
            )
        );
        return -1;
    }

    let pointPosition = -1;
    (scale as string[]).forEach((item, index) => {
        if (item === value) {
            pointPosition = index;
        }
    });

    return pointPosition;
}

function valueToPointPosition(value: number | string, dataManager: SliderModelDataManager): number {
    if (typeof value === 'number') {
        return numberToPointPosition(value, dataManager);
    }

    return stringToPointPosition(value, dataManager);
}

export { calcRange, valueToPointPosition };
