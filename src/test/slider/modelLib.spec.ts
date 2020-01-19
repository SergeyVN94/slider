import { expect } from 'chai';

import {
    getAllSteps,
    valueToStep,
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
        });
    });
});
