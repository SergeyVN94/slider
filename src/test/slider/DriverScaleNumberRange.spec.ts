import { expect } from 'chai';
import driverScaleNumberRange from '../../desktop.blocks/slider/scripts/domain-model/scale-drivers/driverScaleNumberRange';
import DataManager from '../../desktop.blocks/slider/scripts/domain-model/DataManager';

const scale: [number, number] = [-1000, 2000];

describe('[DriverScaleNumberRange]', () => {
  describe('[getAllSteps]', () => {
    const templates = [
      {
        stepSize: 23,
        allSteps: 130,
      },
      {
        stepSize: 0,
        allSteps: -1,
      },
      {
        stepSize: -222,
        allSteps: -1,
      },
      {
        stepSize: 100,
        allSteps: 30,
      },
      {
        stepSize: 2000,
        allSteps: 1,
      },
      {
        stepSize: 3000,
        allSteps: 1,
      },
      {
        stepSize: 3001,
        allSteps: -1,
      },
    ];

    templates.forEach(({
      stepSize,
      allSteps,
    }) => {
      it(
        `[range: (${scale.join(',')}); stepSize: ${stepSize}]`,
        () => expect(driverScaleNumberRange.getAllSteps(scale, stepSize)).to.equal(allSteps),
      );
    });
  });

  describe('[valueToStep]', () => {
    const dataManager = new DataManager({
      scale,
      pointSteps: [0],
      stepSize: 10,
      steps: driverScaleNumberRange.getAllSteps(scale, 10),
    });

    const template = [
      {
        value: -1111,
        step: -1,
      },
      {
        value: 2222,
        step: -1,
      },
      {
        value: 1,
        step: 100,
      },
      {
        value: 1990,
        step: 299,
      },
      {
        value: -1000,
        step: 0,
      },
      {
        value: 1000,
        step: 200,
      },
      {
        value: -555,
        step: 45,
      },
      {
        value: 0,
        step: 100,
      },
    ];

    template.forEach((
      {
        value,
        step,
      },
    ) => {
      it(
        `[range: (${scale.join(',')}); value: ${value}]`,
        () => expect(driverScaleNumberRange.valueToStep(value, dataManager)).to.equal(step),
      );
    });
  });

  describe('[isCorrectStepSize]', () => {
    const template = [
      {
        stepSize: -1,
        isCorrect: false,
      },
      {
        stepSize: 0,
        isCorrect: false,
      },
      {
        stepSize: 3333,
        isCorrect: false,
      },
      {
        stepSize: 333,
        isCorrect: true,
      },
      {
        stepSize: 2999,
        isCorrect: true,
      },
      {
        stepSize: 10,
        isCorrect: true,
      },
      {
        stepSize: 1000,
        isCorrect: true,
      },
    ];

    template.forEach((
      {
        stepSize,
        isCorrect,
      },
    ) => {
      it(
        `[range: (${scale.join(',')}); stepSize: ${stepSize}]`,
        () => expect(driverScaleNumberRange.isCorrectStepSize(scale, stepSize)).to.equal(isCorrect),
      );
    });
  });

  describe('[stepToValue]', () => {
    const dataManager = new DataManager({
      scale,
      pointSteps: [0],
      stepSize: 100,
      steps: driverScaleNumberRange.getAllSteps(scale, 100),
    });

    const template = [
      {
        step: -1,
        value: null,
      },
      {
        step: 31,
        value: null,
      },
      {
        step: 0,
        value: -1000,
      },
      {
        step: 30,
        value: 2000,
      },
      {
        step: 22,
        value: 1200,
      },
      {
        step: 6,
        value: -400,
      },
    ];

    template.forEach((
      {
        step,
        value,
      },
    ) => {
      it(
        `[range: (${scale.join(',')}); step: ${step}]`,
        () => expect(driverScaleNumberRange.stepToValue(step, dataManager)).to.equal(value),
      );
    });
  });
});
