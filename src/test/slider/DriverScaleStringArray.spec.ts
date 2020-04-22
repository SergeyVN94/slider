import { expect } from 'chai';
import driverScaleStringArray from '../../desktop.blocks/slider/scripts/domain-model/scale-drivers/driverScaleStringArray';
import DataManager from '../../desktop.blocks/slider/scripts/domain-model/DataManager';

const scale: string[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
];

describe('[DriverScaleStringArray]', () => {
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
      it(
        `scale: (${_scale.join(',')})`,
        () => expect(driverScaleStringArray.getAllSteps(_scale, allSteps)).to.equal(allSteps),
      );
    });
  });

  describe('[valueToStep]', () => {
    const dataManager = new DataManager({
      scale,
      stepSize: 1,
      pointSteps: [0],
      steps: driverScaleStringArray.getAllSteps(scale),
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
      it(
        `value: ${value}`,
        () => expect(driverScaleStringArray.valueToStep(value, dataManager)).to.equal(step),
      );
    });
  });

  describe('[stepToValue]', () => {
    const dataManager = new DataManager({
      scale,
      stepSize: 1,
      pointSteps: [0],
      steps: driverScaleStringArray.getAllSteps(scale),
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
      it(
        `step: ${step}`,
        () => expect(driverScaleStringArray.stepToValue(step, dataManager)).to.equal(value),
      );
    });
  });
});
