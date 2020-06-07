import { expect } from 'chai';
import createScaleDriver from '../../desktop.blocks/slider/scripts/domain-model/scale-drivers/createScaleDriver';
import Core from '../../desktop.blocks/slider/scripts/domain-model/Core';

describe('[Core]', () => {
  describe('[updatePointSteps]', () => {
    const core = new Core({
      stepSize: 1,
      scaleDriver: createScaleDriver([-1000, 1000]),
    });
  });
});
