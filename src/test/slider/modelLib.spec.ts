import { expect } from 'chai';

import {
    getPointStates,
    getModelValues,
    setModelValues,
    isCorrectSteps,
} from '../../desktop.blocks/slider/scripts/domain-model/lib';
import DataManager from '../../desktop.blocks/slider/scripts/domain-model/DataManager';
import DriverScaleNumberRange from '../../desktop.blocks/slider/scripts/domain-model/scale-drivers/DriverScaleNumberRange';
import DriverScaleStringArray from '../../desktop.blocks/slider/scripts/domain-model/scale-drivers/DriverScaleStringArray';
import Core from '../../desktop.blocks/slider/scripts/domain-model/Core';
import { SliderPointState } from '../../desktop.blocks/slider/scripts/domain-model/Model';

const scaleDriverNumRange = new DriverScaleNumberRange();
const scaleDriverStrArr = new DriverScaleStringArray();
const core = new Core();

describe('[Domain model lib]', () => {
    describe('[getPointStates]', () => {
        const scala1 = ['a', 'b', 'c', 'd', 'e'];
        const scala2 = [-1000, 1000] as [number, number];

        const arraysSame = function arraysSame(
            arr1: SliderPointState[],
            arr2: SliderPointState[]
        ): boolean {
            let isCorrectStates = true;

            arr1.forEach((state, index) => {
                const isCorrectPosition = state.position === arr2[index].position;
                const isCorrectValue = state.value === arr2[index].value;
                isCorrectStates = isCorrectPosition && isCorrectValue;
            });

            return isCorrectStates;
        };

        describe(`[scala: (${scala1.join(',')})]`, () => {
            const dataManager = new DataManager({
                stepSize: 1,
                steps: 4,
                scale: scala1,
                pointSteps: [0, 2, 3],
            });

            it('[pointSteps: (0, 2, 3)]', () => {
                const targetStates = [
                    {
                        position: 0,
                        value: 'a',
                    },
                    {
                        position: 2 / 4,
                        value: 'c',
                    },
                    {
                        position: 3 / 4,
                        value: 'd',
                    },
                ];
                const pointStates = getPointStates(dataManager, scaleDriverStrArr);

                expect(arraysSame(targetStates, pointStates)).to.equal(true);
            });
        });

        describe(`[scala: (${scala2.join(',')})]`, () => {
            const dataManager = new DataManager({
                stepSize: 100,
                steps: 20,
                scale: scala2,
                pointSteps: [1, 3, 7, 13, 16, 17, 20],
            });

            it('[pointSteps: (1, 3, 7, 13, 16, 17, 20)]', () => {
                const targetStates = [
                    {
                        position: 1 / 20,
                        value: -900,
                    },
                    {
                        position: 3 / 20,
                        value: -700,
                    },
                    {
                        position: 7 / 20,
                        value: -300,
                    },
                    {
                        position: 13 / 20,
                        value: 300,
                    },
                    {
                        position: 16 / 20,
                        value: 600,
                    },
                    {
                        position: 17 / 20,
                        value: 700,
                    },
                    {
                        position: 20 / 20,
                        value: 1000,
                    },
                ];
                const pointStates = getPointStates(dataManager, scaleDriverNumRange);

                expect(arraysSame(targetStates, pointStates)).to.equal(true);
            });
        });
    });

    describe('[getModelValues]', () => {
        const scala1 = ['a', 'b', 'c', 'd', 'e'];
        const scala2 = [-1000, 1000] as [number, number];

        describe(`[scala: (${scala1.join(',')})]`, () => {
            const dataManager = new DataManager({
                stepSize: 1,
                steps: 4,
                scale: scala1,
                pointSteps: [0, 2, 4],
            });

            it('[pointSteps: (0, 2, 4)]', () => {
                const [
                    value1,
                    value2,
                    value3,
                ] = getModelValues(dataManager, scaleDriverStrArr);

                expect(value1 === 'a' && value2 === 'c' && value3 === 'e').to.equal(true);
            });
        });

        describe(`[scala: (${scala2.join(',')})]`, () => {
            const dataManager = new DataManager({
                stepSize: 50,
                steps: 40,
                scale: scala2,
                pointSteps: [7, 13, 32],
            });

            it('[pointSteps: (7, 13, 32)]', () => {
                const [
                    value1,
                    value2,
                    value3,
                ] = getModelValues(dataManager, scaleDriverNumRange);

                expect(value1 === -650 && value2 === -350 && value3 === 600).to.equal(true);
            });
        });
    });

    describe('[setModelValues]', () => {
        const scala1 = ['a', 'b', 'c', 'd', 'e'];
        const scala2 = [-1000, 1000] as [number, number];

        describe(`[scala: (${scala1.join(',')})]`, () => {
            const dataManager = new DataManager({
                stepSize: 1,
                steps: 4,
                scale: scala1,
                pointSteps: [0],
            });

            it('[values: ("a", "c")]', () => {
                setModelValues(['a', 'c'], dataManager, scaleDriverStrArr);

                const [
                    step1,
                    step2,
                ] = dataManager.pointSteps;

                expect(step1 === 0 && step2 === 2).to.equal(true);
            });
        });

        describe(`[scala: (${scala2.join(',')})]`, () => {
            const dataManager = new DataManager({
                stepSize: 50,
                steps: 40,
                scale: scala2,
                pointSteps: [0],
            });

            it('[values: (-777, 754)]', () => {
                setModelValues([-777, 754], dataManager, scaleDriverNumRange);

                const [
                    step1,
                    step2,
                ] = dataManager.pointSteps;

                expect(step1 === 4 && step2 === 35).to.equal(true);
            });
        });
    });

    describe('[updatePointSteps]', () => {
        const scale = ['a', 'b', 'c', 'd', 'e', 'f', 'q', 'w', 'r', 't', 'g'];

        const arraysSame = function arraysSame(arr1: number[], arr2: number[]): boolean {
            if (arr1.length !== arr2.length) {
                return false;
            }

            for (let i = 0; i < arr1.length; i += 1) {
                if (arr1[i] !== arr2[i]) {
                    return false;
                }
            }

            return true;
        };

        describe('[simple click on the slider]', () => {
            const dataManagerConfig = {
                scale,
                stepSize: 1,
                steps: 10,
            };

            const template = [
                {
                    targetPosition: 1,
                    targetSteps: [10],
                    pointSteps: [4],
                },
                {
                    targetPosition: 0,
                    targetSteps: [0],
                    pointSteps: [5],
                },
                {
                    targetPosition: 1,
                    targetSteps: [
                        4,
                        10,
                    ],
                    pointSteps: [
                        4,
                        4,
                    ],
                },
                {
                    targetPosition: 0,
                    targetSteps: [
                        0,
                        4,
                    ],
                    pointSteps: [
                        4,
                        4,
                    ],
                },
                {
                    targetPosition: 1,
                    targetSteps: [
                        0,
                        3,
                        4,
                        10,
                    ],
                    pointSteps: [0, 3, 4, 8],
                },
                {
                    targetPosition: 0.5,
                    targetSteps: [
                        0,
                        3,
                        5,
                        8,
                    ],
                    pointSteps: [0, 3, 4, 8],
                },
                {
                    targetPosition: 0.9,
                    targetSteps: [
                        0,
                        3,
                        4,
                        9,
                    ],
                    pointSteps: [0, 3, 4, 8],
                },
                {
                    targetPosition: 0.35,
                    targetSteps: [
                        0,
                        4,
                        4,
                        8,
                    ],
                    pointSteps: [0, 3, 4, 8],
                },
                {
                    targetPosition: 0.6,
                    targetSteps: [
                        0,
                        4,
                        6,
                        8,
                        8,
                        10,
                    ],
                    pointSteps: [0, 4, 4, 8, 8, 10],
                },
                {
                    targetPosition: 0.2,
                    targetSteps: [
                        0,
                        2,
                        4,
                        8,
                        8,
                        10,
                    ],
                    pointSteps: [0, 0, 4, 8, 8, 10],
                },
                {
                    targetPosition: 0.5,
                    targetSteps: [
                        0,
                        0,
                        5,
                        10,
                        10,
                        10,
                    ],
                    pointSteps: [0, 0, 0, 10, 10, 10],
                },
                {
                    targetPosition: 1,
                    targetSteps: [
                        0,
                        2,
                        3,
                        6,
                        7,
                        10,
                    ],
                    pointSteps: [0, 2, 3, 6, 7, 8],
                },
            ];

            template.forEach((tmp) => {
                const {
                    targetPosition,
                    targetSteps,
                    pointSteps,
                } = tmp;

                const pointStepsCopy = [...pointSteps];

                it(`[target: ${targetPosition}, startSteps: (${pointStepsCopy.join(',')})]`, () => {
                    const dataManager = new DataManager({
                        pointSteps,
                        ...dataManagerConfig,
                    });
                    const pointSelected = -1;
                    core.updatePointSteps(
                        targetPosition,
                        pointSelected,
                        dataManager
                    );

                    expect(arraysSame(targetSteps, dataManager.pointSteps)).to.be.true;
                });
            });
        });

        describe('[selected point]', () => {
            const dataManagerConfig = {
                scale,
                stepSize: 1,
                steps: 10,
            };

            const template = [
                {
                    targetPosition: 1,
                    targetSteps: [10],
                    pointSteps: [4],
                    pointSelected: 0,
                },
                {
                    targetPosition: 0,
                    targetSteps: [0],
                    pointSteps: [5],
                    pointSelected: 0,
                },
                {
                    targetPosition: 1,
                    targetSteps: [
                        6,
                        6,
                    ],
                    pointSteps: [
                        4,
                        6,
                    ],
                    pointSelected: 0,
                },
                {
                    targetPosition: 0.2,
                    targetSteps: [
                        0,
                        3,
                        3,
                        8,
                    ],
                    pointSteps: [0, 3, 4, 8],
                    pointSelected: 2,
                },
                {
                    targetPosition: 0.9,
                    targetSteps: [
                        0,
                        3,
                        8,
                        8,
                    ],
                    pointSteps: [0, 3, 4, 8],
                    pointSelected: 2,
                },
                {
                    targetPosition: 0.75,
                    targetSteps: [
                        0,
                        8,
                        8,
                        8,
                    ],
                    pointSteps: [0, 4, 8, 8],
                    pointSelected: 1,
                },
                {
                    targetPosition: 0.45,
                    targetSteps: [
                        0,
                        4,
                        4,
                        5,
                        8,
                        10,
                    ],
                    pointSteps: [0, 4, 4, 8, 8, 10],
                    pointSelected: 3,
                },
                {
                    targetPosition: 1,
                    targetSteps: [
                        2,
                        2,
                        3,
                        6,
                        7,
                        8,
                    ],
                    pointSteps: [0, 2, 3, 6, 7, 8],
                    pointSelected: 0,
                },
            ];

            template.forEach((tmp) => {
                const {
                    targetPosition,
                    targetSteps,
                    pointSteps,
                    pointSelected,
                } = tmp;

                const pointStepsCopy = [...pointSteps];

                it(`[target: ${targetPosition}, startSteps: (${pointStepsCopy.join(',')}), pointSelected: ${pointSelected}]`, () => {
                    const dataManager = new DataManager({
                        pointSteps,
                        ...dataManagerConfig,
                    });
                    core.updatePointSteps(
                        targetPosition,
                        pointSelected,
                        dataManager
                    );

                    expect(arraysSame(targetSteps, dataManager.pointSteps)).to.be.true;
                });
            });
        });
    });

    describe('[isCorrectSteps]', () => {
        const dataManager = new DataManager({
            stepSize: 1,
            scale: [-1000, 1000],
            steps: 2000,
            pointSteps: [0, 333, 555],
        });

        const template = [
            {
                steps: [0, 345, 2222],
                result: false,
            },
            {
                steps: [-34, 345, 111],
                result: false,
            },
            {
                steps: [34, -1, 111],
                result: false,
            },
            {
                steps: [1, 44, 111, 110],
                result: false,
            },
            {
                steps: [1, 3, 111, 2000],
                result: true,
            },
            {
                steps: [3],
                result: true,
            },
            {
                steps: [3, 8, 1166],
                result: true,
            },
        ];

        template.forEach(({
            steps,
            result,
        }) => {
            it(
                `[steps: (${steps.join(',')}), result: ${result}]`,
                () => expect(isCorrectSteps(steps, dataManager)).to.equal(result)
            );
        });
    });
});
