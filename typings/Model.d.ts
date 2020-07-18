type SliderScale = [number, number] | string[];
type HandlerModelUpdate = (pointPositions: number[]) => void;
type ScaleItem = {position: number; value: string};

interface IModel {
  readonly values: string[] | number[];
  getPointPositions(): number[];
  update(targetPosition: number, pointIndex: number): void;
  onUpdate(callback: HandlerModelUpdate): void;
  getScaleItems(): ScaleItem[];
}

interface IModelStateManager {
  values: string[] | number[];
}

interface IScaleDriver {
  getMaxStep(): number;
  valueToStep(value: number | string): number | null;
  stepToValue(step: number): string | number | null;
}
