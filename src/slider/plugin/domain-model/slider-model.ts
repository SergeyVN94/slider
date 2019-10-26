import {SliderModelData} from './slider-model-data';
import {calcRangeOfValues} from './slider-model-lib';

export class SliderModel implements ISliderModel {
    private readonly _data: ISliderModelData;
    
    constructor(config: SliderModelConfig) {
        const dataConfig: SliderModelDataConfig = {
            scale: config.scale,
            rangeOfValues: calcRangeOfValues(config.scale, config.step),
            step: config.step
        };

        this._data = new SliderModelData(dataConfig);
    }

    setState(state: SliderStateData): void {

    }

    getState(): SliderModelStateData {
        return {

        } as SliderModelStateData;
    }

    setStateThroughValue(value: number | [number, number]): void {

    }

    setStateThroughIndex(index: number | [number, number]): void {

    }
}