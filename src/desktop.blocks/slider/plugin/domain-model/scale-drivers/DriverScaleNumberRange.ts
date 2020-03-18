class DriverScaleNumberRange implements ISliderScaleDriver {
    getAllSteps(scale: [number, number], stepSize: number): number {
        const [
            rangeMin,
            rangeMax,
        ] = scale;

        const range = rangeMax - rangeMin;

        const isStepSizeTooBig = stepSize > range;
        const isStepSizeLessThan1 = stepSize < 1;

        if (isStepSizeTooBig || isStepSizeLessThan1) {
            return -1;
        }

        return Math.floor(range / stepSize);
    }

    valueToStep(value: number, dataManager: ISliderModelDataManager): number {
        const {
            scale,
            stepSize,
        } = dataManager;

        const [
            rangeMin,
            rangeMax,
        ] = scale as [number, number];

        const isValueOutOfRange = (value < rangeMin) || (value > rangeMax);

        if (isValueOutOfRange) {
            return -1;
        }

        return Math.round((value - rangeMin) / stepSize);
    }

    isCorrectStepSize(scale: [number, number], stepSize: number): boolean {
        const isStepSizeLessThan1 = stepSize < 1;

        if (isStepSizeLessThan1) {
            return false;
        }

        const [
            rangeMin,
            rangeMax,
        ] = scale;

        const range = rangeMax - rangeMin;
        const isStepSizeTooBig = stepSize > range;

        if (isStepSizeTooBig) {
            return false;
        }

        return true;
    }

    stepToValue(step: number, dataManager: ISliderModelDataManager): number | null {
        const {
            scale,
            steps,
            stepSize,
        } = dataManager;

        const isCorrectStep = (step >= 0) && (step <= steps);

        if (!isCorrectStep) {
            return null;
        }

        const [rangeMin] = scale as [number, number];
        return (step * stepSize) + rangeMin;
    }
}

export default DriverScaleNumberRange;
