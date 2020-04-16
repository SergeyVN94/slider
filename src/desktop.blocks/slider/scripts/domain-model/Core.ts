import { ISliderModelDataManager } from './Model';

class Core {
    public updatePointSteps(
        targetPosition: number,
        pointIndex: number,
        dataManager: ISliderModelDataManager
    ): void {
        if (pointIndex === -1) {
            this._updatePointStepsForNull(targetPosition, dataManager);
        } else {
            this._updatePointStepsForPoint(targetPosition, pointIndex, dataManager);
        }
    }

    private _updatePointStepsForPoint(
        targetPosition: number,
        pointIndex: number,
        dataManager: ISliderModelDataManager
    ): boolean {
        const {
            pointSteps,
            steps,
        } = dataManager;

        const targetStep = Math.round(targetPosition * steps);
        const currentPointStep = pointSteps[pointIndex];

        if (targetStep === currentPointStep) {
            return true;
        }

        if (pointSteps.length === 1) {
            dataManager.pointSteps[0] = targetStep;
            return true;
        }

        if (targetStep > currentPointStep) {
            if (pointIndex === pointSteps.length - 1) {
                dataManager.pointSteps[pointIndex] = targetStep;
                return true;
            }

            const stepPointRight = pointSteps[pointIndex + 1];

            if (targetStep > stepPointRight) {
                dataManager.pointSteps[pointIndex] = stepPointRight;
                return true;
            }

            dataManager.pointSteps[pointIndex] = targetStep;
            return true;
        }

        if (pointIndex === 0) {
            dataManager.pointSteps[pointIndex] = targetStep;
            return true;
        }

        const stepPointLeft = pointSteps[pointIndex - 1];

        if (targetStep < stepPointLeft) {
            dataManager.pointSteps[pointIndex] = stepPointLeft;
            return true;
        }

        dataManager.pointSteps[pointIndex] = targetStep;
        return true;
    }

    private _updatePointStepsForNull(
        targetPosition: number,
        dataManager: ISliderModelDataManager
    ): boolean {
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
