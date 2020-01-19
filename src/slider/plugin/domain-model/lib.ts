const getAllSteps = function getAllSteps(scale: SliderScale, step = 1): number {
    if (typeof scale[0] === 'string') {
        return scale.length - 1;
    }

    const [
        rangeMin,
        rangeMax,
    ] = scale as [number, number];
    return Math.floor((rangeMax - rangeMin) / step);
};

const valueToStep = function valueToStep(
    value: string | number,
    dataManager: SliderModelDataManager
): number {
    value;
    dataManager;
    return 1;
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
