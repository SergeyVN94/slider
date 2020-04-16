import {
    ISliderModelDataManager,
    ISliderScaleDriver,
    SliderPointState,
} from './Model';

const SCALE_TYPES = {
    STRING: 'string',
};

const getPointStates = function getPointStates(
    dataManager: ISliderModelDataManager,
    scaleDriver: ISliderScaleDriver,
): SliderPointState[] {
    const {
        pointSteps,
        steps,
    } = dataManager;

    const pointStates: SliderPointState[] = [];

    pointSteps.forEach((pointStep) => pointStates.push({
        position: pointStep / steps,
        value: scaleDriver.stepToValue(pointStep, dataManager),
    }));

    return pointStates;
};

const getModelValues = function getModelValues(
    dataManager: ISliderModelDataManager,
    scaleDriver: ISliderScaleDriver,
): number[] | string[] {
    const {
        pointSteps,
        scaleType,
    } = dataManager;

    if (scaleType === SCALE_TYPES.STRING) {
        return pointSteps.map<number>(
            (step): number => scaleDriver.stepToValue(step, dataManager) as number
        );
    }

    return pointSteps.map<string>(
        (step): string => scaleDriver.stepToValue(step, dataManager) as string
    );
};

const isCorrectSteps = function isCorrectSteps(
    steps: number[],
    dataManager: ISliderModelDataManager
): boolean {
    const { steps: maxSteps } = dataManager;
    let isCorrect = true;
    let lastStep = 0;

    steps.forEach((step): boolean => {
        if (step < 0) {
            isCorrect = false;
            return false;
        }

        if (step > maxSteps) {
            isCorrect = false;
            return false;
        }

        if (step < lastStep) {
            isCorrect = false;
            return false;
        }

        lastStep = step;

        return true;
    });

    return isCorrect;
};

const setModelValues = function setModelValues(
    values: number[] | string[],
    dataManager: ISliderModelDataManager,
    scaleDriver: ISliderScaleDriver
): boolean {
    if (values.length < 1) {
        console.error(new Error('At least one value must be passed.'));
    }

    const steps: number[] = [];
    values.forEach(
        (value: string | number) => steps.push(scaleDriver.valueToStep(value, dataManager))
    );

    if (isCorrectSteps(steps, dataManager)) {
        dataManager.pointSteps = steps;
        return true;
    }

    console.error(new Error(`[${values.join(',')}] values are not valid.`));

    return false;
};

export {
    getModelValues,
    setModelValues,
    getPointStates,
    isCorrectSteps,
};
