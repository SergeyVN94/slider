import {SliderModelDataManager} from './slider-model-data';
import {calcRangeOfValues} from './slider-model-lib';
import { SliderSingleStateHandler } from './slider-handler-single';

export class SliderModel implements ISliderModel {
    private readonly _dataManager: ISliderModelDataManager;
    private readonly _sliderStateHandler: ISliderModelStateHandler;
    
    constructor(config: SliderModelConfig) {
        const dataConfig: SliderModelDataConfig = {
            scale: config.scale,
            rangeOfValues: calcRangeOfValues(config.scale, config.step),
            step: config.step
        };

        this._dataManager = new SliderModelDataManager(dataConfig);

        if (config.selectMode === 'single') {
            this._sliderStateHandler = new SliderSingleStateHandler();
        }
    }

    public setState(state: SliderStateData): void {
        this._sliderStateHandler.updateModelState(state, this._dataManager);
    }

    public getState(): SliderModelStateData {        
        return this._sliderStateHandler.getModelState(this._dataManager);
    }

    public setStateThroughValue(value: number | [number, number]): void {

    }
}