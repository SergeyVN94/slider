export type HandlerModelUpdate = (pointsStates: PointState[]) => void;
export type PointState = { position: number; value: number | string };

export type AbstractModelConfig = {
  min: number;
  max: number;
  step: number;
};

export type ModelConfig = AbstractModelConfig & {
  values: number[];
};

export type ModelConfigWithStringsScale = {
  values: string[];
  customScale: string[];
  step: number;
};
