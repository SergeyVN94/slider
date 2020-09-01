import { expect } from 'chai';

import CustomScaleDriver from './CustomScaleDriver';

describe('[CustomScaleDriver]', () => {
  describe('[getMaxStep]', () => {
    [
      { scale: ['a', 'b', 'c', 'd'], result: 3 },
      { scale: ['a', 'b'], result: 1 },
      { scale: ['a', 'b', 'c', 'd', 'a', 'b', 'c', 'd'], result: 7 },
    ].forEach(({ scale, result }) => {
      it(`[scale: [${scale.join()}], result: ${result}]`, () => {
        expect((new CustomScaleDriver(scale).getMaxStep())).equal(result);
      });
    });
  });

  describe('[valueToStep]', () => {
    const driver = new CustomScaleDriver(['a', 'b', 'c', 'd', 'a1', 'b1', 'c1', 'd1']);

    [
      { value: 'g', result: null },
      { value: 'A', result: null },
      { value: 'a', result: 0 },
      { value: 'a1', result: 4 },
      { value: 'c1', result: 6 },
      { value: 'b', result: 1 },
    ].forEach(({ value, result }) => {
      it(`[value: ${value}, result: ${result}]`, () => {
        expect(driver.valueToStep(value)).equal(result);
      });
    });
  });

  describe('[stepToValue]', () => {
    const driver = new CustomScaleDriver(['a', 'b', 'c', 'd', 'a1', 'b1', 'c1', 'd1']);

    [
      { step: -123, result: null },
      { step: 123, result: null },
      { step: 0, result: 'a' },
      { step: 7, result: 'd1' },
      { step: 4, result: 'a1' },
    ].forEach(({ step, result }) => {
      it(`[step: ${step}, result: ${result}]`, () => {
        expect(driver.stepToValue(step)).equal(result);
      });
    });
  });
});
