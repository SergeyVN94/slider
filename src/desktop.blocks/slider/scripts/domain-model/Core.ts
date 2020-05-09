class Core {
  public static updatePointSteps(
    targetPosition: number,
    pointIndex: number,
    dataManager: IDataGateway,
  ): void {
    if (pointIndex === -1) {
      Core._updatePointStepsForNull(targetPosition, dataManager);
    } else {
      Core._updatePointStepsForPoint(targetPosition, pointIndex, dataManager);
    }
  }

  private static _updatePointStepsForPoint(
    targetPosition: number,
    pointIndex: number,
    dataManager: IDataGateway,
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
      pointSteps[0] = targetStep;
      return true;
    }

    if (targetStep > currentPointStep) {
      if (pointIndex === pointSteps.length - 1) {
        pointSteps[pointIndex] = targetStep;
        return true;
      }

      const stepPointRight = pointSteps[pointIndex + 1];

      if (targetStep > stepPointRight) {
        pointSteps[pointIndex] = stepPointRight;
        return true;
      }

      pointSteps[pointIndex] = targetStep;
      return true;
    }

    if (pointIndex === 0) {
      pointSteps[pointIndex] = targetStep;
      return true;
    }

    const stepPointLeft = pointSteps[pointIndex - 1];

    if (targetStep < stepPointLeft) {
      pointSteps[pointIndex] = stepPointLeft;
      return true;
    }

    pointSteps[pointIndex] = targetStep;
    return true;
  }

  private static _updatePointStepsForNull(
    targetPosition: number,
    dataManager: IDataGateway,
  ): boolean {
    const {
      steps,
      pointSteps,
    } = dataManager;

    const targetStep = Math.round(targetPosition * steps);

    if (pointSteps.length === 1) {
      pointSteps[0] = targetStep;
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

      return true;
    }

    if (!isAllPointsInOnePosition) {
      const index = pointSteps.lastIndexOf(tmpStep);
      pointSteps[index] = targetStep;
      return true;
    }

    return true;
  }
}

export default Core;
