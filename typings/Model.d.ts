type HandlerModelUpdate = (pointPositions: number[]) => void;
type ScaleItem = {position: number; value: string};

interface IModelConfig {
  customScale?: string[];
  min?: number;
  max?: number;
  step: number;
}

interface IModel {
  readonly values: string[] | number[];
  getPointPositions(): number[];
  update(targetPosition: number, pointIndex?: number): void;
  onUpdate(callback: HandlerModelUpdate): void;
  getScaleItems(): ScaleItem[];
}

interface IModelStateManager {
  values: string[] | number[];
  getConfig(): IModelConfig;
}

interface IScaleDriver {
  getMaxStep(): number;
  valueToStep(value: number | string): number | null;
  stepToValue(step: number): string | number | null;
}

interface ISliderConfig {
  values?: string[] | number[];
  customScale?: string[];
  min?: number;
  max?: number;
  viewName?: ViewName;
  tooltips?: boolean;
  step?: number;
  prettify?: PrettifyFunc;
  bgLine?: boolean;
}
