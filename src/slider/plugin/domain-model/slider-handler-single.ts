export class SliderSingleStateHandler implements ISliderModelStateHandler {
    constructor() {
        
    }

    public updateModelState(state: SliderStateData, dataManager: ISliderModelDataManager): void {
        const range: number = dataManager.getRangeOfValues();        
        const newPointPosition = Math.round(state.targetPosition * range);
        dataManager.setPointPosition(newPointPosition);
    }

    public getModelState(dataManager: ISliderModelDataManager): SliderModelStateData {
        const pointPosition: number = dataManager.getPointPosition() as number;
        const range: number = dataManager.getRangeOfValues();
        const scale: SliderScale = dataManager.getScale();
        const step: number = dataManager.getStep();
        let pointValue: number | string;

        if (scale.type === 'array') {
            pointValue = scale.value[pointPosition];
        } else {
            pointValue = (pointPosition * step) + scale.value[0];
        }

        return {
            pointPosition: pointPosition / range,
            pointValue: pointValue
        };
    }
}