class SliderStateHandler implements SliderModelStateHandler {
    public updateModelState(state: SliderViewState, dataManager: SliderModelDataManager): void {
        const { range } = dataManager;
        const { points } = state;
        const pointPositions: number[] = [];
        const targetPosition = Math.round(state.targetPosition * range);

        if (points.length === 1) {
            pointPositions.push(targetPosition);
        }

        if (points.length === 2) {
            pointPositions[0] = Math.round(points[0].position * range);
            pointPositions[1] = Math.round(points[1].position * range);

            const [pointMin, pointMax] = pointPositions;

            if (state.pointSelected === 'min') {
                if (targetPosition >= pointPositions[1]) {
                    pointPositions[0] = pointMax;
                } else {
                    pointPositions[0] = targetPosition;
                }
            } else if (state.pointSelected === 'max') {
                if (targetPosition <= pointPositions[0]) {
                    pointPositions[1] = pointMin;
                } else {
                    pointPositions[1] = targetPosition;
                }
            } else {
                const distanceToPoints: number[] = [
                    Math.abs(pointMin - targetPosition),
                    Math.abs(pointMax - targetPosition),
                ];

                if (distanceToPoints[0] < distanceToPoints[1]) {
                    pointPositions[0] = targetPosition;
                } else if (distanceToPoints[1] < distanceToPoints[0]) {
                    pointPositions[1] = targetPosition;
                } else if (targetPosition < pointPositions[0]) {
                    pointPositions[0] = targetPosition;
                } else {
                    pointPositions[1] = targetPosition;
                }
            }
        }

        dataManager.pointPositions = pointPositions;
    }

    public getModelState(dataManager: SliderModelDataManager): SliderModelPointsState {
        const { pointPositions, scale, step, range } = dataManager;
        const points: SliderModelPointsState = [];

        if (typeof scale[0] === 'string') {
            pointPositions.forEach((position) => {
                points.push({
                    position: position / range,
                    value: scale[position],
                });
            });
        } else {
            const minMax = scale as number[];
            pointPositions.forEach((position) => {
                points.push({
                    position: position / range,
                    value: position * step + minMax[0],
                });
            });
        }

        return points;
    }
}

export { SliderStateHandler };
