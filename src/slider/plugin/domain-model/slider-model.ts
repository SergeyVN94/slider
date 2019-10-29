import {SliderModelDataManager} from './slider-model-data';
import { 
    calcSliderRange,
    valueToPointPosition
} from './slider-model-lib';
import { SliderSingleStateHandler } from './slider-handler-single';
import { SliderRangeStateHandler } from './slider-handler-range';

export class SliderModel implements ISliderModel {
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

        if (config.selectMode === 'single') {
            this._sliderStateHandler = new SliderSingleStateHandler();
        } else {
            this._sliderStateHandler = new SliderRangeStateHandler();
        }
        
        this._callbackList = [];
    }

    public setState(state: SliderViewStateData): void {
        this._sliderStateHandler.updateModelState(state, this._dataManager);
        this._eventUpdateState();
    }

    public onChangeState(callback: SliderModelCallback): void {
        this._callbackList.push(callback);  
    }

    public setStateThroughValue(value: number | string): void {
        const pointPosition: number = valueToPointPosition(value, this._dataManager);
        if (pointPosition >= 0) {
            if (this._selectMode === 'single') {
                this._dataManager.setPointPosition(pointPosition);
            } else {
                this._dataManager.setPointPosition([pointPosition, this._dataManager.getRangeOfValues()]);
            }
            this._eventUpdateState();
        }
    }

    public setStateThroughValues(value: [number, number] | [string, string]): void {
        const pointPosition: [number, number] = [
            valueToPointPosition(value[0], this._dataManager),
            valueToPointPosition(value[1], this._dataManager)
        ];
        if (pointPosition[0] >= 0 && pointPosition[1] >= 0 ) {
            this._dataManager.setPointPosition(pointPosition);
            this._eventUpdateState();
        }
    }

    private _eventUpdateState(): void {
        this._callbackList.forEach((callback: SliderModelCallback) => {
            callback(this._sliderStateHandler.getModelState(this._dataManager));
        });
    }

    public getValue(): number | string | CoupleNum | CoupleStr {
        return this._sliderStateHandler.getModelState(this._dataManager).pointValue;
    }
}