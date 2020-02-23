class DriverScaleStringArray implements SliderScaleDriver {
    getAllSteps(scale: string[]): number {
        return scale.length - 1;
    }

    valueToStep(value: string, dataManager: SliderModelDataManager): number {
        const { scale } = dataManager;

        return (scale as string[]).indexOf(value);
    }

    isCorrectStepSize(scale: string[], stepSize: number): boolean {
        if (stepSize === 1) {
            return true;
        }

        return false;
    }

    stepToValue(step: number, dataManager: SliderModelDataManager): string | null {
        const {
            scale,
            steps,
        } = dataManager;

        const isStepOutOfStepsRange = (step < 0) || (step > steps);

        if (isStepOutOfStepsRange) {
            return null;
        }

        return (scale as string[])[step];
    }
}

export default DriverScaleStringArray;
