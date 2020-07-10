import { expect } from 'chai';
import NumberRangeScaleDriver from '../../components/slider/scripts/domain-model/scale-drivers/NumberRangeScaleDriver';

describe('[NumberRangeScaleDriver]', () => {
  describe('[getMaxStep]', () => {
    [
      { scale: [0, 1000], result: 1000 },
      { scale: [-1000, 1000], result: 2000 },
      { scale: [-3000, -1000], result: 2000 },
      { scale: [444, 777], result: 333 },
    ].forEach(({ scale, result }) => {
      it(`[scale: [${scale.join()}], result: ${result}]`, () => {
        expect((new NumberRangeScaleDriver(scale as [number, number]).getMaxStep())).equal(result);
      });
    });
  });

  describe('[valueToStep]', () => {
    const driver = new NumberRangeScaleDriver([-1000, 1000]);

    [
      { value: 2222, result: null },
      { value: -2222, result: null },
      { value: -1000, result: 0 },
      { value: 1000, result: 2000 },
      { value: 0, result: 1000 },
      { value: 555, result: 1555 },
      { value: -333, result: 667 },
    ].forEach(({ value, result }) => {
      it(`[value: ${value}, result: ${result}]`, () => {
        expect(driver.valueToStep(value)).equal(result);
      });
    });
  });

  describe('[stepToValue]', () => {
    const driver = new NumberRangeScaleDriver([-1000, 1000]);

    [
      { step: -123, result: null },
      { step: 3000, result: null },
      { step: 0, result: -1000 },
      { step: 2000, result: 1000 },
      { step: 555, result: -445 },
      { step: 777, result: -223 },
      { step: 1333, result: 333 },
    ].forEach(({ step, result }) => {
      it(`[step: ${step}, result: ${result}]`, () => {
        expect(driver.stepToValue(step)).equal(result);
      });
    });
  });
});
