type SliderScale = [number, number] | string[];
type HandlerModelUpdate = (pointPositions: number[]) => void;
type HandlerModelUpdateScale = (maxStep: number, stepSize: number) => void;
type ScaleItem = {position: number; value: string};

interface ISliderModel {
  readonly values: string[] | number[];
  getPointPositions(): number[];
  update(targetPosition: number, pointIndex: number): void;
  onUpdate(callback: HandlerModelUpdate): void;
  getScaleItems(): ScaleItem[];
}

interface ISliderModelStateManager {
  values: string[] | number[];
}

interface ISliderScaleDriver {
  getMaxStep(): number;
  valueToStep(value: number | string): number;
  stepToValue(step: number): string | number | null;
}
