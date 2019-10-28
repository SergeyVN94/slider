import { expect } from "chai";
import {
    calcSliderRange,
    valueToPointPosition
} from '../../slider/plugin/domain-model/slider-model-lib';
import {SliderModelDataManager} from '../../slider/plugin/domain-model/slider-model-data';

// calcSliderRange

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

// valueToPointPosition

describe('SliderModelLib', () => {
    it('valueToPointPosition - convert value to standard range', () => {
        const manager: ISliderModelDataManager = new SliderModelDataManager({
            scale: {
                type: 'range',
                value: [-100, 100]
            },
            rangeOfValues: 200,
            step: 1
        });
        expect(
            valueToPointPosition(55, manager)
        ).to.equal(155);
    });
});

describe('SliderModelLib', () => {
    it('valueToPointPosition - convert value to standard range', () => {
        const manager: ISliderModelDataManager = new SliderModelDataManager({
            scale: {
                type: 'range',
                value: [-100, 1100]
            },
            rangeOfValues: 200,
            step: 1
        });
        expect(
            valueToPointPosition(255, manager)
        ).to.equal(355);
    });
});

describe('SliderModelLib', () => {
    it('valueToPointPosition - convert value to standard range in large increments', () => {
        const manager: ISliderModelDataManager = new SliderModelDataManager({
            scale: {
                type: 'range',
                value: [0, 1000]
            },
            rangeOfValues: 200,
            step: 250
        });
        expect(
            valueToPointPosition(255, manager)
        ).to.equal(250);
    });
});

describe('SliderModelLib', () => {
    it('valueToPointPosition - convert non-integer value to standard range in large increments', () => {
        const manager: ISliderModelDataManager = new SliderModelDataManager({
            scale: {
                type: 'range',
                value: [0, 1000]
            },
            rangeOfValues: 200,
            step: 250
        });
        expect(
            valueToPointPosition(623.43, manager)
        ).to.equal(500);
    });
});

describe('SliderModelLib', () => {
    it('valueToPointPosition - convert non-integer value to standard range in large increments', () => {
        const manager: ISliderModelDataManager = new SliderModelDataManager({
            scale: {
                type: 'array',
                value: [
                    'Январь',
                    'Февраль',
                    'Март',
                    'Апрель',
                    'Май',
                    'Июнь',
                    'Июль',
                    'Август',
                    'Сентябрь',
                    'Октябрь',
                    'Ноябрь',
                    'Декабрь'
                ]
            },
            rangeOfValues: 0,
            step: 1
        });
        expect(
            valueToPointPosition('Май', manager)
        ).to.equal(4);
    });
});