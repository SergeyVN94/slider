const getAllSteps = function getAllSteps(scale: SliderScale, stepSize = 1): number {
    if (typeof scale[0] === 'string') {
        return scale.length - 1;
    }

    const [
        rangeMin,
        rangeMax,
    ] = scale as [number, number];
    return Math.floor((rangeMax - rangeMin) / stepSize);
};

const valueToStep = function valueToStep(
    value: string | number,
    dataManager: SliderModelDataManager
): number {
    const {
        scale,
        scaleType,
        stepSize,
    } = dataManager;

    if (scaleType !== typeof value) {
        console.error(new TypeError(`Unable to compute step "${value}". The value type should be the same as the slider scale.`));
        return -1;
    }

    if (scaleType === 'string') {
        return (scale as string[]).indexOf(value as string);
    }

    const [
        rangeMin,
        rangeMax,
    ] = scale as [number, number];

    if (value < rangeMin) {
        return -1;
    }

    if (value > rangeMax) {
        return -1;
    }

    const valueInRange =
        value < 0 ? Math.abs(value as number) : ((value as number) + Math.abs(rangeMin));

    return Math.round(
        valueInRange / stepSize
    );
};

const updateStepSize = function updateStepSize(
    step: number,
    dataManager: SliderModelDataManager
): void {
    step;
    dataManager;
};

const updateModel = function updateModel(
    state: SliderViewState,
    dataManager: SliderModelDataManager
): void {
    state;
    dataManager;
};

const getPointStates = function getPointStates(
    dataManager: SliderModelDataManager
): SliderPointState[] {
    dataManager;
    return [
        {
            position: 0.23423,
        },
    ];
};

const getModelValues = function getModelValues(
    dataManager: SliderModelDataManager
): number[] | string[] {
    dataManager;
    return [1, 2, 3];
};

const setModelValues = function setModelValues(
    values: number[] | string[],
    dataManager: SliderModelDataManager
): void {
    values;
    dataManager;
};

export {
    getAllSteps,
    valueToStep,
    updateModel,
    updateStepSize,
    getModelValues,
    setModelValues,
    getPointStates,
};
