class Core {
  public static getNewPointSteps(
    targetPosition: number,
    pointIndex: number,
    dataManager: IDataGateway,
  ): number[] {
    if (pointIndex === -1) {
      return Core._updatePointStepsForNull(targetPosition, dataManager);
    }

    return Core._updatePointStepsForPoint(targetPosition, pointIndex, dataManager);
  }

  private static _updatePointStepsForPoint(
    targetPosition: number,
    pointIndex: number,
    dataManager: IDataGateway,
  ): number[] {
    const {
      pointSteps,
      steps,
    } = dataManager;

    const targetStep = Math.round(targetPosition * steps);
    const currentPointStep = pointSteps[pointIndex];

    if (targetStep === currentPointStep) {
      return pointSteps;
    }

    if (pointSteps.length === 1) {
      pointSteps[0] = targetStep;
      return pointSteps;
    }

    if (targetStep > currentPointStep) {
      if (pointIndex === pointSteps.length - 1) {
        pointSteps[pointIndex] = targetStep;
        return pointSteps;
      }

      const stepPointRight = pointSteps[pointIndex + 1];

      if (targetStep > stepPointRight) {
        pointSteps[pointIndex] = stepPointRight;
        return pointSteps;
      }

      pointSteps[pointIndex] = targetStep;
      return pointSteps;
    }

    if (pointIndex === 0) {
      pointSteps[pointIndex] = targetStep;
      return pointSteps;
    }

    const stepPointLeft = pointSteps[pointIndex - 1];

    if (targetStep < stepPointLeft) {
      pointSteps[pointIndex] = stepPointLeft;
      return pointSteps;
    }

    pointSteps[pointIndex] = targetStep;
    return pointSteps;
  }

  private static _updatePointStepsForNull(
    targetPosition: number,
    dataManager: IDataGateway,
  ): number[] {
    const {
      steps,
      pointSteps,
    } = dataManager;

    const targetStep = Math.round(targetPosition * steps);

    if (pointSteps.length === 1) {
      return [targetStep];
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
      return pointSteps;
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

      return pointSteps;
    }

    if (!isAllPointsInOnePosition) {
      const index = pointSteps.lastIndexOf(tmpStep);
      pointSteps[index] = targetStep;
      return pointSteps;
    }

    return pointSteps;
  }
}

export default Core;
