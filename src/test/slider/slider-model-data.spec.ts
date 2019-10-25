import { expect } from "chai";
import {SliderModelData} from '../../slider/plugin/domain-model/slider-model-data';

describe('SliderModelData', () => {
    it('check parameter step', () => {
        const step = Math.round(Math.random() * 100000);
        const modelData: ISliderModelData = new SliderModelData({
            step: step
        } as SliderModelDataConfig)
        expect(modelData.getStep()).to.equal(step);
    });
});

describe('SliderModelData', () => {
    it('check set negative step', () => {
        const modelData: ISliderModelData = new SliderModelData({
            step: 1
        } as SliderModelDataConfig);
        expect(modelData.setStep.bind(modelData, -1)).to.throw("The step must be greater than zero");
    });
});