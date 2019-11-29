class SliderStateHandler implements SliderModelStateHandler {
    public updateModelState(
        state: SliderViewState,
        dataManager: SliderModelDataManager
    ): void {
        const range: number = dataManager.getRangeOfValues();
        const points: SliderPointState[] = state.points;
        const pointsPosition: number[] = [];
        const targetPosition: number = Math.round(state.targetPosition * range);

        if (points.length === 1) {
            pointsPosition.push(targetPosition);
        }

        if (points.length === 2) {
            pointsPosition[0] = Math.round(points[0].position * range);
            pointsPosition[1] = Math.round(points[1].position * range);

            if (state.pointSelected === 'min') {
                if (targetPosition >= pointsPosition[1]) {
                    pointsPosition[0] = pointsPosition[1];
                } else {
                    pointsPosition[0] = targetPosition;
                }
            } else if (state.pointSelected === 'max') {
                if (targetPosition <= pointsPosition[0]) {
                    pointsPosition[1] = pointsPosition[0];
                } else {
                    pointsPosition[1] = targetPosition;
                }
            } else {
                const distanceToPoints: number[] = [
                    Math.abs(pointsPosition[0] - targetPosition),
                    Math.abs(pointsPosition[1] - targetPosition),
                ];

                if (distanceToPoints[0] < distanceToPoints[1]) {
                    pointsPosition[0] = targetPosition;
                } else if (distanceToPoints[1] < distanceToPoints[0]) {
                    pointsPosition[1] = targetPosition;
                } else if (targetPosition < pointsPosition[0]) {
                    pointsPosition[0] = targetPosition;
                } else {
                    pointsPosition[1] = targetPosition;
                }
            }
        }

        dataManager.setPointsPosition(pointsPosition);
    }

    public getModelState(dataManager: SliderModelDataManager): SliderModelPointsState {
        const pointsPosition: number[] = dataManager.getPointsPosition();
        const scale: SliderScale = dataManager.getScale();
        const step: number = dataManager.getStep();
        const points: SliderModelPointsState = [];
        const range: number = dataManager.getRangeOfValues();

        if (typeof scale[0] === 'string') {
            for (const position of pointsPosition) {
                points.push({
                    position: position / range,
                    value: scale[position].toString(),
                });
            }
        } else {
            for (const position of pointsPosition) {
                points.push({
                    position: position / range,
                    value: (position * step + scale[0]).toString(),
                });
            }
        }

        return points;
    }
}

export { SliderStateHandler };
