import { boundMethod } from 'autobind-decorator';

class Presenter {
  readonly view: IView;

  readonly model: IModel;

  constructor(view: IView, model: IModel) {
    this.view = view;
    this.model = model;

    this.initEventListeners();
  }

  private initEventListeners(): void {
    this.view.onPointPositionChange(this.handlePointPositionChange);
    this.model.onUpdate(this.handleModelUpdate);
  }

  @boundMethod
  private handlePointPositionChange(targetPosition: number, pointIndex?: number): void {
    this.model.update(targetPosition, pointIndex);
  }

  @boundMethod
  private handleModelUpdate(pointsPositions: number[]): void {
    this.view.update(pointsPositions, this.model.values);
  }
}

export default Presenter;
