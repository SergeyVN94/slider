import { expect } from 'chai';

import {
    getAllSteps,
    valueToStep,
    updateStepSize,
} from '../../slider/plugin/domain-model/lib';
import DataManager from '../../slider/plugin/domain-model/DataManager';

describe('[Domain model lib]', () => {
    describe('[getAllSteps]', () => {
        describe('[number range]', () => {
            it('[step 1]', () => {
                expect(getAllSteps([-1000, 1000], 1)).to.equal(2000);
            });

            it('[step 3]', () => {
                expect(getAllSteps([-1000, 1000], 3)).to.equal(666);
            });

            it('[step 10]', () => {
                expect(getAllSteps([-1000, 1000], 3)).to.equal(666);
            });
        });

        describe('[string array]', () => {
            it('[step 1]', () => {
                expect(getAllSteps(['a', 'b', 'c'], 1)).to.equal(2);
            });

            it('[step 2]', () => {
                expect(getAllSteps(['a', 'b', 'c'], 2)).to.equal(2);
            });
        });
    });

    describe('[valueToStep]', () => {
        const scala1 = ['a', 'b', 'c', 'd', 'e'];
        const scala2 = [-1000, 1000] as [number, number];

        describe(`[scala: (${scala1.join(',')})]`, () => {
            const dataManager = new DataManager({
                stepSize: 1,
                steps: 5,
                scale: scala1,
                pointSteps: [1, 3],
            });

            it('[value "a"]', () => {
                expect(valueToStep('a', dataManager)).to.equal(0);
            });

            it('[value "d"]', () => {
                expect(valueToStep('d', dataManager)).to.equal(3);
            });

            it('[value "d"]', () => {
                expect(valueToStep('fv', dataManager)).to.equal(-1);
            });

            it('[value number 444]', () => {
                expect(valueToStep(444, dataManager)).to.equal(-1);
            });
        });

        describe(`[scala: (${scala2.join(',')})]`, () => {
            const dataManager = new DataManager({
                stepSize: 10,
                steps: 5,
                scale: scala2,
                pointSteps: [1, 3],
            });

            it('[value 222]', () => {
                expect(valueToStep(222, dataManager)).to.equal(122);
            });

            it('[value -554.6546]', () => {
                expect(valueToStep(-554.6546, dataManager)).to.equal(55);
            });

            it('[value -1001]', () => {
                expect(valueToStep(-1001, dataManager)).to.equal(-1);
            });

            it('[value 1111]', () => {
                expect(valueToStep(1111, dataManager)).to.equal(-1);
            });

            it('[value string "fds"]', () => {
                expect(valueToStep('fds', dataManager)).to.equal(-1);
            });
        });
    });

    describe('[updateStepSize]', () => {
        const scala1 = ['a', 'b', 'c', 'd', 'e'];
        const scala2 = [-1000, 1000] as [number, number];

        describe(`[scala: (${scala1.join(',')})]`, () => {
            const dataManager = new DataManager({
                stepSize: 1,
                steps: 5,
                scale: scala1,
                pointSteps: [1, 3],
            });

            it('[step 3]', () => {
                updateStepSize(3, dataManager);
                expect(dataManager.stepSize).to.equal(1);
            });
        });

        describe(`[scala: (${scala2.join(',')})]`, () => {
            const dataManager = new DataManager({
                stepSize: 10,
                steps: 5,
                scale: scala2,
                pointSteps: [1, 3],
            });

            it('[step -3]', () => {
                updateStepSize(-3, dataManager);
                expect(dataManager.stepSize).to.equal(10);
            });

            it('[step -0]', () => {
                updateStepSize(0, dataManager);
                expect(dataManager.stepSize).to.equal(10);
            });

            it('[step 2345]', () => {
                updateStepSize(2345, dataManager);
                expect(dataManager.stepSize).to.equal(10);
            });

            it('[step 1000]', () => {
                updateStepSize(1000, dataManager);
                expect(dataManager.stepSize).to.equal(1000);
            });

            it('[step 33]', () => {
                updateStepSize(33, dataManager);
                expect(dataManager.stepSize).to.equal(33);
            });
        });
    });
});
