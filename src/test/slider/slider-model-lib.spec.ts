import { expect } from "chai";
import {calcSliderRange} from '../../slider/plugin/domain-model/slider-model-lib';

describe('SliderModelLib', () => {
    it('calcSliderRange with array', () => {
        const scale: SliderScale = {
            type: 'array',
            value: ['a', 'b', 'c', 'd', 'e']
        };
        expect(calcSliderRange(scale)).to.equal(4);
    });
});

describe('SliderModelLib', () => {
    it('calcSliderRange with array and step', () => {
        const scale: SliderScale = {
            type: 'array',
            value: ['a', 'b', 'c', 'd', 'e']
        };
        expect(calcSliderRange(scale, 2)).to.equal(2);
    });
});

describe('SliderModelLib', () => {
    it('calcSliderRange with range', () => {
        const scale: SliderScale = {
            type: 'range',
            value: [-100, 1000]
        };
        expect(calcSliderRange(scale)).to.equal(1100);
    });
});

describe('SliderModelLib', () => {
    it('calcSliderRange with range and step', () => {
        const scale: SliderScale = {
            type: 'range',
            value: [-100, 1000]
        };
        expect(calcSliderRange(scale, 3)).to.equal(366);
    });
});