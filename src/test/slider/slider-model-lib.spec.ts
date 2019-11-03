import { expect } from "chai";
import {
    calcSliderRange,
    valueToPointPosition
} from '../../slider/plugin/domain-model/slider-model-lib';
import { SliderModelDataManager } from '../../slider/plugin/domain-model/slider-model-data';

function getManager(scale: SliderScale, step?: number): ISliderModelDataManager {
    return new SliderModelDataManager({
        scale: scale,
        rangeOfValues: calcSliderRange(scale, step),
        step: step
    });
}

describe('calcSliderRange', () => {
    it('calcSliderRange with array', () => {
        const scale: SliderScale = ['a', 'b', 'c', 'd', 'e'];
        expect(calcSliderRange(scale)).to.equal(4);
    });

    it('calcSliderRange with array and step', () => {
        const scale: SliderScale = ['a', 'b', 'c', 'd', 'e'];
        expect(calcSliderRange(scale, 2)).to.equal(4);
    });

    it('calcSliderRange with range', () => {
        const scale: SliderScale = [-100, 1000];
        expect(calcSliderRange(scale)).to.equal(1100);
    });

    it('calcSliderRange with range and step', () => {
        const scale: SliderScale = [-100, 1000];
        expect(calcSliderRange(scale, 3)).to.equal(366);
    });
});

describe('valueToPointPosition', () => {
    

    it('convert value to standard range 1', () => {
        expect(
            valueToPointPosition(654, getManager([-1000, 1000], 1))
        ).to.equal(1654);
    });

    it('convert value to standard range 2', () => {
        expect(
            valueToPointPosition(255, getManager([-100, 1100], 100))
        ).to.equal(4);
    });

    it('convert value to standard range in large increments', () => {
        expect(
            valueToPointPosition(2550, getManager([0, 10000], 250))
        ).to.equal(10);
    });

    it('convert non-integer value to standard range in large increments', () => {
        expect(
            valueToPointPosition(623.43, getManager([-1000, 1000], 350))
        ).to.equal(5);
    });

    it('conversion of values ​​beyond the range of the scale', () => {
        expect(
            valueToPointPosition(9999, getManager([-1000, 1000], 350))
        ).to.equal(-1);
    });

    it('conversion of values ​​beyond the range of the scale', () => {
        expect(
            valueToPointPosition(-9999, getManager([-1000, 1000], 350))
        ).to.equal(-1);
    });

    it('conversion of the correct value for the array', () => {
        const scale: SliderScale = [
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
        ];
        expect(
            valueToPointPosition('Май', getManager(scale))
        ).to.equal(4);
    });

    it('invalid conversion', () => {
        const scale: SliderScale = [
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
        ];
        expect(
            valueToPointPosition(345, getManager(scale))
        ).to.equal(-1);
    });
});