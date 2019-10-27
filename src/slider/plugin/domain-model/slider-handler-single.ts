export class SliderSingleStateHandler implements ISliderModelStateHandler {
    constructor() {
        
    }

    public updateModelState(state: SliderStateData, dataManager: ISliderModelDataManager): void {
        const range: number = dataManager.getRangeOfValues();
        const newPointPosition = Math.round(state.targetPosition * range) / range;
        dataManager.setPointPosition(newPointPosition);
    }

    public getModelState(dataManager: ISliderModelDataManager): SliderModelStateData {
        const pointPosition: number = dataManager.getPointPosition() as number;
        const range: number = dataManager.getRangeOfValues();
        const scale: SliderScale = dataManager.getScale();
        let pointValue: number | string;

        if (scale.type === 'array') {
            pointValue = scale.value[Math.round(pointPosition * range)];
        } else {
            pointValue = Math.round(pointPosition * range) + scale.value[0];
        }

        return {
            pointPosition: pointPosition,
            pointValue: pointValue
        };
    }
}