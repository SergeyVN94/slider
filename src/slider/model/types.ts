export type HandlerModelUpdate = (pointsStates: PointState[]) => void;
export type PointState = { position: number; value: number | string };

export type ModelConfig = {
  min: number;
  max: number;
  step: number;
};

export type ModelConfigWithStringsScale = {
  customScale: string[];
  step: number;
};
