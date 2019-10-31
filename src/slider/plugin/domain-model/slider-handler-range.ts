export class SliderRangeStateHandler implements ISliderModelStateHandler {
    constructor() {

    }

    public updateModelState(state: SliderViewStateData, dataManager: ISliderModelDataManager): void {
        const range: number = dataManager.getRangeOfValues();
        const targetPosition: number = Math.round(state.targetPosition * range);
        const oldPositions: CoupleNum = state.pointPosition as CoupleNum;

        let positionMin: number = Math.round(oldPositions[0] * range);
        let positionMax: number = Math.round(oldPositions[1] * range);

        if (state.pointSelected === 'min') {
            if (targetPosition > positionMax) {
                positionMin = positionMax;
            } else {
                positionMin = targetPosition;
            }  
        }

        if (state.pointSelected === 'max') {
            if (targetPosition < positionMin) {
                positionMax = positionMin;
            } else {
                positionMax = targetPosition;
            }
        }

        if (state.pointSelected === null) {
            const distanceToMin: number = Math.abs(positionMin - targetPosition);
            const distanceToMax: number = Math.abs(positionMax - targetPosition);

            if (distanceToMin < distanceToMax) {
                positionMin = targetPosition;
            } else if (distanceToMax < distanceToMin) {
                positionMax = targetPosition;
            } else if (targetPosition !== distanceToMin) {
                if (targetPosition < positionMin) {
                    positionMin = targetPosition;
                }

                if (targetPosition > positionMin) {
                    positionMax = targetPosition;
                }
            }
        }


        dataManager.setPointPosition([
            positionMin,
            positionMax
        ]);
    }

    public getModelState(dataManager: ISliderModelDataManager): SliderModelStateData {
        const pointPosition: CoupleNum = dataManager.getPointPosition() as CoupleNum;
        const range: number = dataManager.getRangeOfValues();
        const scale: SliderScale = dataManager.getScale();
        const step: number = dataManager.getStep();

        let pointValue: CoupleStr;

        if (scale.type === 'custom') {
            pointValue = [
                scale.value[pointPosition[0]],
                scale.value[pointPosition[1]]
            ];
        } else {
            pointValue = [
                String((pointPosition[0] * step) + scale.value[0]),
                String((pointPosition[1] * step) + scale.value[0])
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