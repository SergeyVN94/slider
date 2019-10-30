export class SliderSingleStateHandler implements ISliderModelStateHandler {
    constructor() {
        
    }

    public updateModelState(state: SliderViewStateData, dataManager: ISliderModelDataManager): void {
        const range: number = dataManager.getRangeOfValues();        
        const newPointPosition = Math.round(state.targetPosition * range);
        dataManager.setPointPosition(newPointPosition);
    }

    public getModelState(dataManager: ISliderModelDataManager): SliderModelStateData {
        const pointPosition: number = dataManager.getPointPosition() as number;
        const range: number = dataManager.getRangeOfValues();
        const scale: SliderScale = dataManager.getScale();
        const step: number = dataManager.getStep();
        let pointValue: string;

        if (scale.type === 'custom') {
            pointValue = scale.value[pointPosition];
        } else {
            pointValue = String((pointPosition * step) + scale.value[0]);
        }

        return {
            mode: 'single',
            pointPosition: pointPosition / range,
            pointValue: pointValue
        };
    }
}