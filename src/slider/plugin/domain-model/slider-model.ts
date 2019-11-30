import { SliderModelDataManager } from './slider-model-data';
import { calcSliderRange, valueToPointPosition } from './slider-model-lib';
import { SliderStateHandler } from './slider-handler';

class SliderModel implements SliderModel {
    private readonly _dataManager: SliderModelDataManager;
    private readonly _sliderStateHandler: SliderModelStateHandler;
    private readonly _callbackList: SliderModelUpdateEventCallback[];

    constructor(config: SliderModelConfig) {
        const dataConfig: SliderModelDataConfig = {
            scale: config.scale,
            range: calcSliderRange(config.scale, config.step),
            step: config.step,
        };

        this._dataManager = new SliderModelDataManager(dataConfig);
        this._sliderStateHandler = new SliderStateHandler();
        this._callbackList = [];
    }

    public setState(state: SliderViewState): void {
        this._sliderStateHandler.updateModelState(state, this._dataManager);
        this._eventUpdateState();
    }

    public onUpdate(callback: SliderModelUpdateEventCallback): void {
        this._callbackList.push(callback);
    }

    public getValue(): string[] {
        const state = this._sliderStateHandler.getModelState(this._dataManager);
        return state.map<string>((point: SliderPointState): string => {
            return point.value;
        });
    }

    public step(value: number = null): number | void {
        if (value === null) {
            return this._dataManager.getStep();
        }

        const scale: SliderScale = this._dataManager.getScale();
        if (typeof scale[0] === 'string') {
            console.error('Cannot set step for array.');
        } else {
            let stepValue = value;
            const sliderValues: string[] = this.getValue();
            if (stepValue <= 0) {
                stepValue = 1;
            }
            this._dataManager.setStep(stepValue);
            this._dataManager.setRange(calcSliderRange(scale, stepValue));
            this.setStateThroughValue(sliderValues);
        }
    }

    public setStateThroughValue(values: number[] | string[]): void {
        const positions: number[] = [];
        let isCorrect = true;

        for (let i = 0; i < values.length; i++) {
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
        for (const callback of this._callbackList) {
            callback(this._sliderStateHandler.getModelState(this._dataManager));
        }
    }
}

export { SliderModel };
