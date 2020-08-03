class Presenter {
  readonly view: IView;

  readonly model: IModel;

  constructor(view: IView, model: IModel) {
    this.view = view;
    this.model = model;

    this._initEventListeners();
  }

  private _initEventListeners(): void {
    this.view.onThumbPositionChange(this._handleViewPositionChange.bind(this));
    this.model.onUpdate(this._handleModelUpdate.bind(this));
  }

  private _handleViewPositionChange(targetPosition: number, pointSelected: number): void {
    this.model.update(targetPosition, pointSelected);
  }

  private _handleModelUpdate(pointPositions: number[]): void {
    this.view.update(pointPositions, this.model.values);
  }
}

export default Presenter;
