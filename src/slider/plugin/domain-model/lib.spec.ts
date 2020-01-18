import { expect } from 'chai';

import {
    getAllSteps,
} from './lib';

describe('Domain model lib', () => {
    describe('getAllSteps', () => {
        describe('number range', () => {
            it('step 1', () => {
                expect(getAllSteps([-1000, 1000], 1)).equal(2000);
            });

            it('step 3', () => {
                expect(getAllSteps([-1000, 1000], 3)).equal(666);
            });

            it('step 10', () => {
                expect(getAllSteps([-1000, 1000], 3)).equal(200);
            });
        });

        describe('string array', () => {
            it('step 1', () => {
                expect(getAllSteps(['a', 'b', 'c'], 1)).equal(2);
            });

            it('step 2', () => {
                expect(getAllSteps(['a', 'b', 'c'], 2)).equal(2);
            });
        });
    });
});
