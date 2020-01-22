import { expect } from 'chai';

import {
    getAllSteps,
    valueToStep,
    updateStepSize,
    stepToValue,
    getPointStates,
    getModelValues,
    setModelValues,
    updatePointSteps,
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
                steps: 4,
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

        describe(`[scala: (${scala2.join(',')}), step 10]`, () => {
            const dataManager = new DataManager({
                stepSize: 10,
                steps: 200,
                scale: scala2,
                pointSteps: [1, 3],
            });

            it('[value 222]', () => {
                expect(valueToStep(222, dataManager)).to.equal(122);
            });

            it('[value -554.6546]', () => {
                expect(valueToStep(-554.6546, dataManager)).to.equal(45);
            });

            it('[value -444]', () => {
                expect(valueToStep(-444, dataManager)).to.equal(56);
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

        describe(`[scala: (${scala2.join(',')}), step 1]`, () => {
            const dataManager = new DataManager({
                stepSize: 1,
                steps: 2000,
                scale: scala2,
                pointSteps: [1, 3],
            });

            it('[value 222]', () => {
                expect(valueToStep(222, dataManager)).to.equal(1222);
            });

            it('[value -444]', () => {
                expect(valueToStep(-444, dataManager)).to.equal(556);
            });
        });
    });

    describe('[updateStepSize]', () => {
        const scala1 = ['a', 'b', 'c', 'd', 'e'];
        const scala2 = [-1000, 1000] as [number, number];

        describe(`[scala: (${scala1.join(',')})]`, () => {
            const dataManager = new DataManager({
                stepSize: 1,
                steps: 4,
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

    describe('[stepToValue]', () => {
        const scala1 = ['a', 'b', 'c', 'd', 'e'];
        const scala2 = [-1000, 1000] as [number, number];

        describe(`[scala: (${scala1.join(',')})]`, () => {
            const dataManager = new DataManager({
                stepSize: 1,
                steps: 4,
                scale: scala1,
                pointSteps: [1, 3],
            });

            it('[step 33]', () => {
                expect(stepToValue(33, dataManager)).to.equal(null);
            });

            it('[step -123]', () => {
                expect(stepToValue(-123, dataManager)).to.equal(null);
            });

            it('[step 0]', () => {
                expect(stepToValue(0, dataManager)).to.equal('a');
            });

            it('[step 1]', () => {
                expect(stepToValue(1, dataManager)).to.equal('b');
            });

            it('[step 4]', () => {
                expect(stepToValue(4, dataManager)).to.equal('e');
            });
        });

        describe(`[scala: (${scala2.join(',')})]`, () => {
            const dataManager = new DataManager({
                stepSize: 100,
                steps: 20,
                scale: scala2,
                pointSteps: [1, 3],
            });

            it('[step 33]', () => {
                expect(stepToValue(33, dataManager)).to.equal(null);
            });

            it('[step -123]', () => {
                expect(stepToValue(-123, dataManager)).to.equal(null);
            });

            it('[step 0]', () => {
                expect(stepToValue(0, dataManager)).to.equal(-1000);
            });

            it('[step 8]', () => {
                expect(stepToValue(8, dataManager)).to.equal(-200);
            });

            it('[step 15]', () => {
                expect(stepToValue(15, dataManager)).to.equal(500);
            });
        });
    });

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
                const pointStates = getPointStates(dataManager);

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
                const pointStates = getPointStates(dataManager);

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
                ] = getModelValues(dataManager);

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
                ] = getModelValues(dataManager);

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
                setModelValues(['a', 'c'], dataManager);

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
                setModelValues([-777, 754], dataManager);

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
                    updatePointSteps({
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
                    updatePointSteps({
                        targetPosition,
                        pointSelected,
                    }, dataManager);

                    expect(arraysSame(targetSteps, dataManager.pointSteps)).to.be.true;
                });
            });
        });
    });
});
