import { expect } from 'chai';
import driverScaleNumberRange from '../../desktop.blocks/slider/scripts/domain-model/scale-drivers/driverScaleNumberRange';
import driverScaleStringArray from '../../desktop.blocks/slider/scripts/domain-model/scale-drivers/driverScaleStringArray';
import {
  getModelValues,
  isCorrectSteps,
} from '../../desktop.blocks/slider/scripts/domain-model/lib';
import DataManager from '../../desktop.blocks/slider/scripts/domain-model/DataManager';

describe('[Domain model lib]', () => {
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
        ] = getModelValues(dataManager, driverScaleStringArray);

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
        ] = getModelValues(dataManager, driverScaleNumberRange);

        expect(value1 === -650 && value2 === -350 && value3 === 600).to.equal(true);
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
        () => expect(isCorrectSteps(steps, dataManager)).to.equal(result),
      );
    });
  });
});
