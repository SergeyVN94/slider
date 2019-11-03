import { expect } from "chai";
import { SliderStateHandler } from '../../slider/plugin/domain-model/slider-handler';
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

function getViewState(target: number,
    pointsPositions: number[],
    pointSelected: 'min' | 'max' | null = null): SliderViewStateData {

    const points: SliderPointState[] = [];

    pointsPositions.forEach((item: number): void => {
        points.push({
            position: item
        });
    });

    return {
        targetPosition: target,
        points: points,
        pointSelected: pointSelected
    }
}

describe('handler.updateModelState with one point', () => {
    const handler: ISliderModelStateHandler = new SliderStateHandler();
    const scale1: SliderScale = [-1000, 1000];
    const scale2: SliderScale = ['a', 'b', 'c', 'd', 'e'];

    it('Calculate point position for a range of numbers', () => {
        const manager: ISliderModelDataManager = getManager(scale1);
        handler.updateModelState(getViewState(0.4, [0]), manager);
        expect(manager.getPointsPosition()[0]).to.equal(800);
    });

    it('Calculate point position for a range of numbers with big step', () => {
        const manager: ISliderModelDataManager = getManager(scale1, 250);
        handler.updateModelState(getViewState(0.6, [0]), manager);
        expect(manager.getPointsPosition()[0]).to.equal(5);
    });

    it('Calculation of the position of a point with a step by which the range is not divided', () => {
        const manager: ISliderModelDataManager = getManager(scale1, 350);
        handler.updateModelState(getViewState(0.8, [0]), manager);
        expect(manager.getPointsPosition()[0]).to.equal(4);
    });

    it('Calculation of the position of a point for an array', () => {
        const manager: ISliderModelDataManager = getManager(scale2);
        handler.updateModelState(getViewState(0.2, [1]), manager);
        expect(manager.getPointsPosition()[0]).to.equal(1);
    });
});

describe('handler.updateModelState with two points', () => {
    const handler: ISliderModelStateHandler = new SliderStateHandler();
    const scale1: SliderScale = [-1000, 1000];
    const scale2: SliderScale = ['a', 'b', 'c', 'd', 'e'];

    describe('Simple click on slider without dragging points', () => {
        it('Click on a random spot slider 1', () => {
            const manager: ISliderModelDataManager = getManager(scale1);
            handler.updateModelState(getViewState(0.4, [0, 1]), manager);
            expect(manager.getPointsPosition()[0]).to.equal(800);
            expect(manager.getPointsPosition()[1]).to.equal(2000);
        });

        it('Click on a random spot slider 2', () => {
            const manager: ISliderModelDataManager = getManager(scale1);
            handler.updateModelState(getViewState(0.7, [0, 1]), manager);
            expect(manager.getPointsPosition()[0]).to.equal(0);
            expect(manager.getPointsPosition()[1]).to.equal(1400);
        });

        it('Click on a random spot of a slider with a random position of dots 1', () => {
            const manager: ISliderModelDataManager = getManager(scale1);
            handler.updateModelState(getViewState(0.7, [0.3, 0.8]), manager);
            expect(manager.getPointsPosition()[0]).to.equal(600);
            expect(manager.getPointsPosition()[1]).to.equal(1400);
        });

        it('Click on a random spot of a slider with a random position of dots 2', () => {
            const manager: ISliderModelDataManager = getManager(scale1);
            handler.updateModelState(getViewState(0.35, [0, 0.8]), manager);
            expect(manager.getPointsPosition()[0]).to.equal(700);
            expect(manager.getPointsPosition()[1]).to.equal(1600);
        });

        it('Click on a random spot of slider with the same distance to the points', () => {
            const manager: ISliderModelDataManager = getManager(scale1);
            handler.updateModelState(getViewState(0.5, [0.25, 0.75]), manager);
            expect(manager.getPointsPosition()[0]).to.equal(500);
            expect(manager.getPointsPosition()[1]).to.equal(1000);
        });

        it('Target position less than points positions. Points are in the same position.', () => {
            const manager: ISliderModelDataManager = getManager(scale1);
            handler.updateModelState(getViewState(0.5, [0.75, 0.75]), manager);
            expect(manager.getPointsPosition()[0]).to.equal(1000);
            expect(manager.getPointsPosition()[1]).to.equal(1500);
        });

        it('Target position more points positions. Points are in the same position.', () => {
            const manager: ISliderModelDataManager = getManager(scale1);
            handler.updateModelState(getViewState(0.7, [0.3, 0.3]), manager);
            expect(manager.getPointsPosition()[0]).to.equal(600);
            expect(manager.getPointsPosition()[1]).to.equal(1400);
        });

        it('Click on a random position of a slider initialized by an array', () => {
            const manager: ISliderModelDataManager = getManager(scale2);            
            handler.updateModelState(getViewState(0.4, [0, 1]), manager);
            expect(manager.getPointsPosition()[0]).to.equal(0);
            expect(manager.getPointsPosition()[1]).to.equal(2);
        });
    });

    describe('Click on a point with dragging a point', () => {
        it('Dragging a point with a minimum value', () => {
            const manager: ISliderModelDataManager = getManager(scale1, 250);
            handler.updateModelState(getViewState(0.2, [0, 1], 'min'), manager);
            expect(manager.getPointsPosition()[0]).to.equal(2);
            expect(manager.getPointsPosition()[1]).to.equal(8);
        });

        it('Dragging a point with a minimum value', () => {
            const manager: ISliderModelDataManager = getManager(scale1, 250);
            handler.updateModelState(getViewState(0.8, [0, 1], 'max'), manager);
            expect(manager.getPointsPosition()[0]).to.equal(0);
            expect(manager.getPointsPosition()[1]).to.equal(6);
        });

        it('Dragging a point with a minimum value beyond the position of another point', () => {
            const manager: ISliderModelDataManager = getManager(scale1, 250);
            handler.updateModelState(getViewState(0.6, [0.4, 0.5], 'min'), manager);
            expect(manager.getPointsPosition()[0]).to.equal(4);
            expect(manager.getPointsPosition()[1]).to.equal(4);
        });

        it('Dragging a point with a maximum value beyond the position of another point', () => {
            const manager: ISliderModelDataManager = getManager(scale1, 250);
            handler.updateModelState(getViewState(0, [0.4, 0.5], 'max'), manager);
            expect(manager.getPointsPosition()[0]).to.equal(3);
            expect(manager.getPointsPosition()[1]).to.equal(3);
        });
    });
});