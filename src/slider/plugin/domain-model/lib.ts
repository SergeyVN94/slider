const calcRange = function calcRange(scale: SliderScale, step = 1): number {
    if (typeof scale[0] === 'string') {
        return scale.length - 1;
    }

    const minMax: CoupleNum = scale as CoupleNum;
    return Math.floor((minMax[1] - minMax[0]) / step);
};

const numberToPointPosition = function numberToPointPosition(
    value: number,
    dataManager: SliderModelDataManager
): number {
    const {
        step, range,
    } = dataManager;
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
};

const stringToPointPosition = function stringToPointPosition(
    value: string,
    dataManager: SliderModelDataManager
): number {
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
};

const valueToPointPosition = function valueToPointPosition(
    value: number | string,
    dataManager: SliderModelDataManager
): number {
    if (typeof value === 'number') {
        return numberToPointPosition(value, dataManager);
    }

    return stringToPointPosition(value, dataManager);
};

const updateModel = function updateModel(
    state: SliderViewState,
    dataManager: SliderModelDataManager
): void {
    const { range } = dataManager;
    const { points } = state;
    const pointPositions: number[] = [];
    const targetPosition = Math.round(state.targetPosition * range);

    if (points.length === 1) {
        pointPositions.push(targetPosition);
    }

    if (points.length === 2) {
        pointPositions[0] = Math.round(points[0].position * range);
        pointPositions[1] = Math.round(points[1].position * range);

        const [pointMin, pointMax] = pointPositions;

        if (state.pointSelected === 'min') {
            if (targetPosition >= pointPositions[1]) {
                pointPositions[0] = pointMax;
            } else {
                pointPositions[0] = targetPosition;
            }
        } else if (state.pointSelected === 'max') {
            if (targetPosition <= pointPositions[0]) {
                pointPositions[1] = pointMin;
            } else {
                pointPositions[1] = targetPosition;
            }
        } else {
            const distanceToPoints: number[] = [
                Math.abs(pointMin - targetPosition),
                Math.abs(pointMax - targetPosition),
            ];

            if (distanceToPoints[0] < distanceToPoints[1]) {
                pointPositions[0] = targetPosition;
            } else if (distanceToPoints[1] < distanceToPoints[0]) {
                pointPositions[1] = targetPosition;
            } else if (targetPosition < pointPositions[0]) {
                pointPositions[0] = targetPosition;
            } else {
                pointPositions[1] = targetPosition;
            }
        }
    }

    dataManager.pointPositions = pointPositions;
};

const getModelState = function getModelState(
    dataManager: SliderModelDataManager
): SliderModelPointsState {
    const {
        pointPositions,
        scale,
        step,
        range,
    } = dataManager;
    const points: SliderModelPointsState = [];

    if (typeof scale[0] === 'string') {
        pointPositions.forEach((position) => {
            points.push({
                position: position / range,
                value: scale[position],
            });
        });
    } else {
        const minMax = scale as number[];
        pointPositions.forEach((position) => {
            points.push({
                position: position / range,
                value: position * step + minMax[0],
            });
        });
    }

    return points;
};

export {
    calcRange,
    valueToPointPosition,
    updateModel,
    getModelState,
};
