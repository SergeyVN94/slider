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
    this.handlePointPositionChange = this.handlePointPositionChange.bind(this);
    this.handleModelUpdate = this.handleModelUpdate.bind(this);

    this.view.onPointPositionChange(this.handlePointPositionChange);
    this.model.onUpdate(this.handleModelUpdate);
  }

  private handlePointPositionChange(targetPosition: number, pointIndex?: number): void {
    console.log('View', targetPosition, pointIndex);

    this.model.update(targetPosition, pointIndex);
  }

  private handleModelUpdate(pointsStates: PointState[]): void {
    console.log('Model', pointsStates);

    this.view.update(pointsStates);
  }
}

export default Presenter;
