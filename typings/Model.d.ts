type SliderScale = [number, number] | string[];
type HandlerSliderModelUpdate = (pointPositions: number[]) => void;

interface IDataGateway {
  scale: SliderScale;
  scaleType: 'string' | 'number';
  pointSteps: number[];
  stepSize: number;
  steps: number;
}

interface ISliderModel {
  readonly value: string[] | number[];
  getPointPositions(): number[];
  update(targetPosition: number, pointIndex: number): void;
  onUpdate(callback: (pointPositions: number[]) => void): void;
  onChangeAllSteps(callback: (allSteps: number) => void): void;
}

interface ISliderModelStateManager {
  step: number;
  value: string[] | number[];
}

interface ISliderScaleDriver {
  getAllSteps(scale: SliderScale, stepSize?: number): number;
  valueToStep(value: number | string, dataManager: IDataGateway): number;
  isCorrectStepSize(scale: SliderScale, stepSize: number): boolean;
  stepToValue(step: number, dataManager: IDataGateway): string | number | null;
}
