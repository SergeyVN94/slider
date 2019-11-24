import { SliderModelDataManager } from './slider-model-data';
import {
    calcSliderRange,
    valueToPointPosition
} from './slider-model-lib';
import { SliderStateHandler } from './slider-handler';

class SliderModel implements ISliderModel {
    private readonly _dataManager: ISliderModelDataManager;
    private readonly _sliderStateHandler: ISliderModelStateHandler;
    private readonly _selectMode: SliderMode;
    private readonly _callbackList: SliderModelCallback[];

    constructor(config: SliderModelConfig) {
        const dataConfig: SliderModelDataConfig = {
            scale: config.scale,
            rangeOfValues: calcSliderRange(config.scale, config.step),
            step: config.step
        };

        this._dataManager = new SliderModelDataManager(dataConfig);
        this._selectMode = config.selectMode;
        this._sliderStateHandler = new SliderStateHandler();
        this._callbackList = [];
    }

    public setState(state: SliderViewStateData): void {
        this._sliderStateHandler.updateModelState(state, this._dataManager);
        this._eventUpdateState();
    }

    public onChangeState(callback: SliderModelCallback): void {
        this._callbackList.push(callback);
    }

    public setStateThroughValue(values: number[] | string[]): void {
        const positions: number[] = [];
        let isCorrect: boolean = true;

        for (let i: number = 0; i < values.length; i++) {
            const position: number = valueToPointPosition(values[i], this._dataManager);
            if (position < 0) {
                isCorrect = false;
                break;
            }
            positions[i] = position;
        }

        if (isCorrect) {
            if (positions.length === 1) {
                this._dataManager.setPointsPosition(positions);
                this._eventUpdateState();
            } else if (positions.length === 2) {
                if (positions[0] <= positions[1]) {
                    this._dataManager.setPointsPosition(positions);
                    this._eventUpdateState();
                }    
            }
        }
    }

    private _eventUpdateState(): void {
        this._callbackList.forEach((callback: SliderModelCallback) => {
            callback(this._sliderStateHandler.getModelState(this._dataManager));
        });
    }

    public getValue(): string[] {
        return this._sliderStateHandler.getModelState(this._dataManager)
            .map<string>((point: SliderPointState): string => {
                return point.value;
            });
    }

    public step(value?: number): number | void {
        if (value === undefined) {
            return this._dataManager.getStep();
        }

        const scale: SliderScale = this._dataManager.getScale();
        if (typeof scale[0] === 'string') {
            console.error('Cannot set step for array.');
        } else {
            const sliderValues: string[] = this.getValue();
            if (value <= 0) value = 1;
            this._dataManager.setStep(value);
            this._dataManager.setRangeOfValues(calcSliderRange(scale, value));
            this.setStateThroughValue(sliderValues);
        }
    }
}

export {
    SliderModel
};