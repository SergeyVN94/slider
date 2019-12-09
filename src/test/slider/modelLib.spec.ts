import { expect } from 'chai';

import {
    calcRange,
    valueToPointPosition,
    updateModel,
} from '../../slider/plugin/domain-model/lib';
import DataManager from '../../slider/plugin/domain-model/DataManager';

const getManager = function getManager(scale: SliderScale, step?: number): DataManager {
    return new DataManager({
        scale,
        step,
        range: calcRange(scale, step),
    });
};

const getViewState = function getViewState(
    target: number,
    pointsPositions: number[],
    pointSelected: 'min' | 'max' | null = null
): SliderViewState {
    const points: SliderPointState[] = [];

    pointsPositions.forEach((item: number): void => {
        points.push({
            position: item,
        });
    });

    return {
        points,
        pointSelected,
        targetPosition: target,
    };
};

describe('calcRange', () => {
    it('calcRange with array', () => {
        const scale: SliderScale = ['a', 'b', 'c', 'd', 'e'];
        expect(calcRange(scale)).to.equal(4);
    });

    it('calcRange with array and step', () => {
        const scale: SliderScale = ['a', 'b', 'c', 'd', 'e'];
        expect(calcRange(scale, 2)).to.equal(4);
    });

    it('calcRange with range', () => {
        const scale: SliderScale = [-100, 1000];
        expect(calcRange(scale)).to.equal(1100);
    });

    it('calcRange with range and step', () => {
        const scale: SliderScale = [-100, 1000];
        expect(calcRange(scale, 3)).to.equal(366);
    });
});

describe('valueToPointPosition', () => {
    it('convert value to standard range 1', () => {
        expect(valueToPointPosition(654, getManager([-1000, 1000], 1))).to.equal(1654);
    });

    it('convert value to standard range 2', () => {
        expect(valueToPointPosition(255, getManager([-100, 1100], 100))).to.equal(4);
    });

    it('Convert maximum value to standard range in increments of one step', () => {
        expect(valueToPointPosition(1000, getManager([0, 1000], 28))).to.equal(35);
    });

    it('convert value to standard range in large increments', () => {
        expect(valueToPointPosition(2550, getManager([0, 10000], 250))).to.equal(10);
    });

    it('convert non-integer value to standard range in large increments', () => {
        expect(valueToPointPosition(623.43, getManager([-1000, 1000], 350))).to.equal(5);
    });

    it('conversion of values ​​beyond the range of the scale', () => {
        expect(valueToPointPosition(9999, getManager([-1000, 1000], 350))).to.equal(-1);
    });

    it('conversion of values ​​beyond the range of the scale', () => {
        expect(valueToPointPosition(-9999, getManager([-1000, 1000], 350))).to.equal(-1);
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
            'Декабрь',
        ];
        expect(valueToPointPosition('Май', getManager(scale))).to.equal(4);
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
            'Декабрь',
        ];
        expect(valueToPointPosition(345, getManager(scale))).to.equal(-1);
    });
});

describe('updateModel with one point', () => {
    const scale1: SliderScale = [-1000, 1000];
    const scale2: SliderScale = ['a', 'b', 'c', 'd', 'e'];

    it('Calculate point position for a range of numbers', () => {
        const manager: SliderModelDataManager = getManager(scale1);
        updateModel(getViewState(0.4, [0]), manager);
        expect(manager.pointPositions[0]).to.equal(800);
    });

    it('Calculate point position for a range of numbers with big step', () => {
        const manager: SliderModelDataManager = getManager(scale1, 250);
        updateModel(getViewState(0.6, [0]), manager);
        expect(manager.pointPositions[0]).to.equal(5);
    });

    it('Calculation of the position of a point with a step by which the range is not divided', () => {
        const manager: SliderModelDataManager = getManager(scale1, 350);
        updateModel(getViewState(0.8, [0]), manager);
        expect(manager.pointPositions[0]).to.equal(4);
    });

    it('Calculation of the position of a point for an array', () => {
        const manager: SliderModelDataManager = getManager(scale2);
        updateModel(getViewState(0.2, [1]), manager);
        expect(manager.pointPositions[0]).to.equal(1);
    });
});

describe('updateModel with two points', () => {
    const scale1: SliderScale = [-1000, 1000];
    const scale2: SliderScale = ['a', 'b', 'c', 'd', 'e'];

    describe('Simple click on slider without dragging points', () => {
        it('Click on a random spot slider 1', () => {
            const manager: SliderModelDataManager = getManager(scale1);
            updateModel(getViewState(0.4, [0, 1]), manager);
            expect(manager.pointPositions[0]).to.equal(800);
            expect(manager.pointPositions[1]).to.equal(2000);
        });

        it('Click on a random spot slider 2', () => {
            const manager: SliderModelDataManager = getManager(scale1);
            updateModel(getViewState(0.7, [0, 1]), manager);
            expect(manager.pointPositions[0]).to.equal(0);
            expect(manager.pointPositions[1]).to.equal(1400);
        });

        it('Click on a random spot of a slider with a random position of dots 1', () => {
            const manager: SliderModelDataManager = getManager(scale1);
            updateModel(getViewState(0.7, [0.3, 0.8]), manager);
            expect(manager.pointPositions[0]).to.equal(600);
            expect(manager.pointPositions[1]).to.equal(1400);
        });

        it('Click on a random spot of a slider with a random position of dots 2', () => {
            const manager: SliderModelDataManager = getManager(scale1);
            updateModel(getViewState(0.35, [0, 0.8]), manager);
            expect(manager.pointPositions[0]).to.equal(700);
            expect(manager.pointPositions[1]).to.equal(1600);
        });

        it('Click on a random spot of slider with the same distance to the points', () => {
            const manager: SliderModelDataManager = getManager(scale1);
            updateModel(getViewState(0.5, [0.25, 0.75]), manager);
            expect(manager.pointPositions[0]).to.equal(500);
            expect(manager.pointPositions[1]).to.equal(1000);
        });

        it('Target position less than points positions. Points are in the same position.', () => {
            const manager: SliderModelDataManager = getManager(scale1);
            updateModel(getViewState(0.5, [0.75, 0.75]), manager);
            expect(manager.pointPositions[0]).to.equal(1000);
            expect(manager.pointPositions[1]).to.equal(1500);
        });

        it('Target position more points positions. Points are in the same position.', () => {
            const manager: SliderModelDataManager = getManager(scale1);
            updateModel(getViewState(0.7, [0.3, 0.3]), manager);
            expect(manager.pointPositions[0]).to.equal(600);
            expect(manager.pointPositions[1]).to.equal(1400);
        });

        it('Click on a random position of a slider initialized by an array', () => {
            const manager: SliderModelDataManager = getManager(scale2);
            updateModel(getViewState(0.4, [0, 1]), manager);
            expect(manager.pointPositions[0]).to.equal(0);
            expect(manager.pointPositions[1]).to.equal(2);
        });
    });

    describe('Click on a point with dragging a point', () => {
        it('Dragging a point with a minimum value', () => {
            const manager: SliderModelDataManager = getManager(scale1, 250);
            updateModel(getViewState(0.2, [0, 1], 'min'), manager);
            expect(manager.pointPositions[0]).to.equal(2);
            expect(manager.pointPositions[1]).to.equal(8);
        });

        it('Dragging a point with a minimum value', () => {
            const manager: SliderModelDataManager = getManager(scale1, 250);
            updateModel(getViewState(0.8, [0, 1], 'max'), manager);
            expect(manager.pointPositions[0]).to.equal(0);
            expect(manager.pointPositions[1]).to.equal(6);
        });

        it('Dragging a point with a minimum value beyond the position of another point', () => {
            const manager: SliderModelDataManager = getManager(scale1, 250);
            updateModel(getViewState(0.6, [0.4, 0.5], 'min'), manager);
            expect(manager.pointPositions[0]).to.equal(4);
            expect(manager.pointPositions[1]).to.equal(4);
        });

        it('Dragging a point with a maximum value beyond the position of another point', () => {
            const manager: SliderModelDataManager = getManager(scale1, 250);
            updateModel(getViewState(0, [0.4, 0.5], 'max'), manager);
            expect(manager.pointPositions[0]).to.equal(3);
            expect(manager.pointPositions[1]).to.equal(3);
        });
    });
});
