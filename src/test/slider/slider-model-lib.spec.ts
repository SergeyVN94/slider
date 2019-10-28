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
    it('valueToPointPosition - convert value to standard range 1', () => {
        const scale: SliderScale = {
            type: 'range',
            value: [-1000, 1000]
        };
        const step: number = 1;

        const manager: ISliderModelDataManager = new SliderModelDataManager({
            scale: scale,
            rangeOfValues: calcSliderRange(scale, step),
            step: step
        });

        expect(
            valueToPointPosition(654, manager)
        ).to.equal(1654);
    });
});

describe('SliderModelLib', () => {
    it('valueToPointPosition - convert value to standard range 2', () => {
        const scale: SliderScale = {
            type: 'range',
            value: [-100, 1100]
        };
        const step: number = 100;

        const manager: ISliderModelDataManager = new SliderModelDataManager({
            scale: scale,
            rangeOfValues: calcSliderRange(scale, step),
            step: step
        });

        expect(
            valueToPointPosition(255, manager)
        ).to.equal(4);
    });
});

describe('SliderModelLib', () => {
    it('valueToPointPosition - convert value to standard range in large increments', () => {
        const scale: SliderScale = {
            type: 'range',
            value: [0, 10000]
        };
        const step: number = 250;

        const manager: ISliderModelDataManager = new SliderModelDataManager({
            scale: scale,
            rangeOfValues: calcSliderRange(scale, step),
            step: step
        });

        expect(
            valueToPointPosition(2550, manager)
        ).to.equal(10);
    });
});

describe('SliderModelLib', () => {
    it('valueToPointPosition - convert non-integer value to standard range in large increments', () => {
        const scale: SliderScale = {
            type: 'range',
            value: [-1000, 1000]
        };
        const step: number = 350;

        const manager: ISliderModelDataManager = new SliderModelDataManager({
            scale: scale,
            rangeOfValues: calcSliderRange(scale, step),
            step: step
        });

        expect(
            valueToPointPosition(623.43, manager)
        ).to.equal(5);
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