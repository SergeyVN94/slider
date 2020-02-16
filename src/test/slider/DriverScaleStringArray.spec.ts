import { expect } from 'chai';

import DriverScaleRangeArray from '../../slider/plugin/domain-model/scale-drivers/DriverScaleStringArray';
import DataManager from '../../slider/plugin/domain-model/DataManager';

const scaleDriver = new DriverScaleRangeArray();
const scale: string[] = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
];

describe('[DriverScaleRangeArray]', () => {
    describe('[getAllSteps]', () => {
        const template = [
            {
                _scale: ['a', 'b', 'd', 'f'],
                allSteps: 3,
            },
            {
                _scale: ['ff', 'dd', 'ff'],
                allSteps: 2,
            },
            {
                _scale: ['ff'],
                allSteps: 0,
            },
        ];

        template.forEach(({
            _scale,
            allSteps,
        }) => {
            it(`scale: (${_scale.join(',')})`, () => {
                expect(scaleDriver.getAllSteps(_scale)).to.equal(allSteps);
            });
        });
    });

    describe('[valueToStep]', () => {
        const dataManager = new DataManager({
            scale,
            stepSize: 1,
            pointSteps: [0],
            steps: scaleDriver.getAllSteps(scale),
        });

        const template = [
            {
                value: 'fsfwefw',
                step: -1,
            },
            {
                value: 'C',
                step: -1,
            },
            {
                value: 'c',
                step: 2,
            },
            {
                value: 'a',
                step: 0,
            },
            {
                value: 'g',
                step: 6,
            },
        ];

        template.forEach(({
            step,
            value,
        }) => {
            it(`value: ${value}`, () => {
                expect(scaleDriver.valueToStep(value, dataManager)).to.equal(step);
            });
        });
    });

    describe('[stepToValue]', () => {
        const dataManager = new DataManager({
            scale,
            stepSize: 1,
            pointSteps: [0],
            steps: scaleDriver.getAllSteps(scale),
        });

        const template = [
            {
                step: -1,
                value: null,
            },
            {
                step: 555,
                value: null,
            },
            {
                step: 0,
                value: 'a',
            },
            {
                step: 3,
                value: 'd',
            },
            {
                step: 6,
                value: 'g',
            },
        ];

        template.forEach(({
            step,
            value,
        }) => {
            it(`step: ${step}`, () => {
                expect(scaleDriver.stepToValue(step, dataManager)).to.equal(value);
            });
        });
    });
});
