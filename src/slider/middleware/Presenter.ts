import Model from '../model/Model';
import ModelStringsScale from '../model/ModelStringsScale';
import { PointState } from '../model/types';
import { IView } from '../view/types';

class Presenter {
  readonly view: IView;

  readonly model: Model | ModelStringsScale;

  constructor(view: IView, model: Model | ModelStringsScale) {
    this.view = view;
    this.model = model;

    this.initEventListeners();
  }

  private initEventListeners(): void {
    this.view.onPointPositionChange(this.handlePointPositionChange.bind(this));
    this.model.onUpdate(this.handleModelUpdate.bind(this));
  }

  private handlePointPositionChange(targetPosition: number, pointIndex?: number): void {
    this.model.update(targetPosition, pointIndex);
  }

  private handleModelUpdate(pointsStates: PointState[]): void {
    console.log(pointsStates);

    this.view.update(pointsStates);
  }
}

export default Presenter;
