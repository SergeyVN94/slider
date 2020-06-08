type SliderScale = [number, number] | string[];
type HandlerSliderModelUpdate = (pointPositions: number[]) => void;

interface ISliderModel {
  readonly value: string[] | number[];
  getPointPositions(): number[];
  update(targetPosition: number, pointIndex: number): void;
  onUpdate(callback: (pointPositions: number[]) => void): void;
  onUpdateScale(callback: (maxStep: number, stepSize: number) => void): void;
  stepToValue(step: number): string;
}

interface ISliderModelStateManager {
  step: number;
  value: string[] | number[];
}

interface ISliderScaleDriver {
  getMaxStep(): number;
  valueToStep(value: number | string): number;
  stepToValue(step: number): string | number | null;
}
