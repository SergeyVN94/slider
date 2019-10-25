import {SliderModelData} from './slider-model-data';

export class SliderModel implements ISliderModel {
    private readonly _data: ISliderModelData;
    
    constructor(config: SliderModelConfig) {
        const dataConfig: SliderModelDataConfig = {
            step: config.step || 1,
            minMax: config.minMax,
            customValues: config.customValues,
            value: config.value,
            lengthValues: 0
        };

        this._data = new SliderModelData(dataConfig);

        if (!config.customValues && !config.minMax) {
            this._data.setMinMax([0, 100]);
        }

        if (config.customValues) {
            this._data.setLengthValues(config.customValues.length - 1);
        } else {
            const minMax: [number, number] = this._data.getMinMax();
            const len: number = Math.round((minMax[1] - minMax[0]) / this._data.getStep());
            this._data.setLengthValues(len);
        }       
    }

    setState(state: SliderStateData): void {
        
    }

    getState(): SliderModelStateData {
        return {

        } as SliderModelStateData;
    }

    setStateThroughValue(value: number | [number, number] | string | [string, string]): void {

    }

    setStateThroughIndex(index: number | [number, number]): void {

    }
}