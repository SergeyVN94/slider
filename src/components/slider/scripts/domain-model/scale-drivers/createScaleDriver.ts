import NumberRangeScaleDriver from './NumberRangeScaleDriver';
import StringArrayScaleDriver from './StringArrayScaleDriver';

const createScaleDriver = function createScaleDriver(scale: SliderScale): IScaleDriver {
  if (typeof scale[0] === 'number') {
    return new NumberRangeScaleDriver(scale as [number, number]);
  }

  return new StringArrayScaleDriver(scale as string[]);
};

export default createScaleDriver;
