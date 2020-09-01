class Presenter {
  readonly view: IView;

  readonly model: IModel;

  constructor(view: IView, model: IModel) {
    this.view = view;
    this.model = model;

    this._initEventListeners();
  }

  private _initEventListeners(): void {
    this.view.onPointPositionChange(this._handlePointPositionChange.bind(this));
    this.model.onUpdate(this._handleModelUpdate.bind(this));
  }

  private _handlePointPositionChange(targetPosition: number, pointIndex?: number): void {
    this.model.update(targetPosition, pointIndex);
  }

  private _handleModelUpdate(pointsPositions: number[]): void {
    this.view.update(pointsPositions, this.model.values);
  }
}

export default Presenter;
