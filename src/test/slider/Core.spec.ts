import { expect } from 'chai';

import DataManager from '../../desktop.blocks/slider/plugin/domain-model/DataManager';
import Core from '../../desktop.blocks/slider/plugin/domain-model/Core';

const core = new Core();

describe('[Core]', () => {
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
                    core.updatePointSteps({
                        targetPosition,
                        pointSelected: -1,
                    }, dataManager);

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
                    core.updatePointSteps({
                        targetPosition,
                        pointSelected,
                    }, dataManager);

                    expect(arraysSame(targetSteps, dataManager.pointSteps)).to.be.true;
                });
            });
        });
    });
});

