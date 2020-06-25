type SliderScale = [number, number] | string[];
type HandlerModelUpdate = (pointPositions: number[]) => void;
type HandlerModelUpdateScale = (maxStep: number, stepSize: number) => void;

interface ISliderModel {
  readonly value: string[] | number[];
  getPointPositions(): number[];
  update(targetPosition: number, pointIndex: number): void;
  onUpdate(callback: HandlerModelUpdate): void;
  onUpdateScale(callback: HandlerModelUpdateScale): void;
  stepToValue(step: number): string;
}

interface ISliderModelStateManager {
  step: number;
  value: string[] | number[];
  scale: SliderScale;
}

interface ISliderScaleDriver {
  getMaxStep(): number;
  valueToStep(value: number | string): number;
  stepToValue(step: number): string | number | null;
}
