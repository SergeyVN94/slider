export class SliderRangeStateHandler implements ISliderModelStateHandler {
    constructor() {
        
    }

    public updateModelState(state: SliderViewStateData, dataManager: ISliderModelDataManager): void {
        const range: number = dataManager.getRangeOfValues();

        const viewPositions: CoupleNum = state.pointPosition as CoupleNum;

        let positionsMin: number = Math.round(viewPositions[0] * range);
        let positionsMax: number = Math.round(viewPositions[1] * range);

        const targetPosition: number = Math.round(state.targetPosition * range);

        const distanceToMin: number = Math.abs(positionsMin - targetPosition);
        const distanceToMax: number = Math.abs(positionsMax - targetPosition);

        
        if (distanceToMin < distanceToMax) {
            positionsMin = targetPosition; 
        }

        if (distanceToMin > distanceToMax) {
            positionsMax = targetPosition; 
        }

        if (distanceToMin === distanceToMax) {
            if (targetPosition < positionsMin) {
                positionsMin = targetPosition;
            }

            if (targetPosition > positionsMin) {
                positionsMax = targetPosition;
            }
        }

        dataManager.setPointPosition([
            positionsMin,
            positionsMax
        ]);
    }

    public getModelState(dataManager: ISliderModelDataManager): SliderModelStateData {
        const pointPosition: CoupleNum = dataManager.getPointPosition() as CoupleNum;
        const range: number = dataManager.getRangeOfValues();
        const scale: SliderScale = dataManager.getScale();
        const step: number = dataManager.getStep();

        let pointValue: CoupleNum | CoupleStr;

        if (scale.type === 'array') {
            if (typeof scale.value[0] === 'string') {
                const tmp: string[] = scale.value as string[];
                pointValue = [
                    tmp[pointPosition[0]],
                    tmp[pointPosition[1]]
                ];
            } else {
                const tmp: number[] = scale.value as number[];
                pointValue = [
                    tmp[pointPosition[0]],
                    tmp[pointPosition[1]]
                ];
            }
        } else {
            pointValue = [
                (pointPosition[0] * step) + scale.value[0],
                (pointPosition[1] * step) + scale.value[0]
            ];
        }

        return {
            mode: 'range',
            pointPosition: [
                pointPosition[0] / range,
                pointPosition[1] / range
            ],
            pointValue: pointValue
        };
    }
}