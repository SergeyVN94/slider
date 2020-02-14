class DriverScaleNumberRange implements ScaleDriver {
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

    valueToStep(value: number, dataManager: SliderModelDataManager): number {
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
}

export default DriverScaleNumberRange;
