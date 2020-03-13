class Core {
    public updatePointSteps(
        state: SliderViewState,
        dataManager: SliderModelDataManager
    ): void {
        const { pointSelected } = state;

        if (pointSelected === -1) {
            this._updatePointStepsForNull(state, dataManager);
        } else {
            this._updatePointStepsForPoint(state, dataManager);
        }
    }

    private _updatePointStepsForPoint(
        state: SliderViewState,
        dataManager: SliderModelDataManager
    ): boolean {
        const {
            targetPosition,
            pointSelected,
        } = state;

        const {
            pointSteps,
            steps,
        } = dataManager;

        const targetStep = Math.round(targetPosition * steps);
        const currentPointStep = pointSteps[pointSelected];

        if (targetStep === currentPointStep) {
            return true;
        }

        if (pointSteps.length === 1) {
            dataManager.pointSteps[0] = targetStep;
            return true;
        }

        if (targetStep > currentPointStep) {
            if (pointSelected === pointSteps.length - 1) {
                dataManager.pointSteps[pointSelected] = targetStep;
                return true;
            }

            const stepPointRight = pointSteps[pointSelected + 1];

            if (targetStep > stepPointRight) {
                dataManager.pointSteps[pointSelected] = stepPointRight;
                return true;
            }

            dataManager.pointSteps[pointSelected] = targetStep;
            return true;
        }

        if (pointSelected === 0) {
            dataManager.pointSteps[pointSelected] = targetStep;
            return true;
        }

        const stepPointLeft = pointSteps[pointSelected - 1];

        if (targetStep < stepPointLeft) {
            dataManager.pointSteps[pointSelected] = stepPointLeft;
            return true;
        }

        dataManager.pointSteps[pointSelected] = targetStep;
        return true;
    }

    private _updatePointStepsForNull(
        state: SliderViewState,
        dataManager: SliderModelDataManager
    ): boolean {
        const { targetPosition } = state;
        const {
            steps,
            pointSteps,
        } = dataManager;

        const targetStep = Math.round(targetPosition * steps);

        if (pointSteps.length === 1) {
            dataManager.pointSteps = [targetStep];
            return true;
        }

        let minDistance = Infinity;

        pointSteps.forEach((step) => {
            const distance = Math.abs((step / steps) - targetPosition);

            if (distance < minDistance) {
                minDistance = distance;
            }
        });

        const nearestPoints = pointSteps.filter((step) => {
            const distance = Math.abs((step / steps) - targetPosition);
            if (distance === minDistance) {
                return true;
            }

            return false;
        });

        if (nearestPoints.length === 1) {
            const index = pointSteps.indexOf(nearestPoints[0]);
            pointSteps[index] = targetStep;
            dataManager.pointSteps = pointSteps;
            return true;
        }

        let isAllPointsInOnePosition = true;
        const [tmpStep] = nearestPoints;

        nearestPoints.forEach((step) => {
            if (step !== tmpStep) {
                isAllPointsInOnePosition = false;
            }
        });

        if (isAllPointsInOnePosition) {
            if (targetStep > tmpStep) {
                const index = pointSteps.lastIndexOf(nearestPoints[0]);
                pointSteps[index] = targetStep;
            }

            if (targetStep < tmpStep) {
                const index = pointSteps.indexOf(nearestPoints[0]);
                pointSteps[index] = targetStep;
            }

            dataManager.pointSteps = pointSteps;
            return true;
        }

        if (!isAllPointsInOnePosition) {
            const index = pointSteps.lastIndexOf(tmpStep);
            pointSteps[index] = targetStep;
            dataManager.pointSteps = pointSteps;
            return true;
        }

        return true;
    }
}

export default Core;
