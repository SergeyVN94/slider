import { expect } from "chai";
import {calcRangeOfValues} from '../../slider/plugin/domain-model/slider-model-lib';

describe('SliderModelLib', () => {
    it('calcRangeOfValues with array', () => {
        const scale: SliderScale = {
            type: 'array',
            value: ['a', 'b', 'c', 'd', 'e']
        };
        expect(calcRangeOfValues(scale)).to.equal(4);
    });
});

describe('SliderModelLib', () => {
    it('calcRangeOfValues with array and step', () => {
        const scale: SliderScale = {
            type: 'array',
            value: ['a', 'b', 'c', 'd', 'e']
        };
        expect(calcRangeOfValues(scale, 2)).to.equal(2);
    });
});

describe('SliderModelLib', () => {
    it('calcRangeOfValues with range', () => {
        const scale: SliderScale = {
            type: 'range',
            value: [-100, 1000]
        };
        expect(calcRangeOfValues(scale)).to.equal(1100);
    });
});

describe('SliderModelLib', () => {
    it('calcRangeOfValues with range and step', () => {
        const scale: SliderScale = {
            type: 'range',
            value: [-100, 1000]
        };
        expect(calcRangeOfValues(scale, 3)).to.equal(366);
    });
});