class Presenter {
  readonly view: ISliderView;

  readonly model: ISliderModel;

  constructor(view: ISliderView, model: ISliderModel) {
    this.view = view;
    this.model = model;

    this._initEventListeners();
    this.view.update(this.model.getPointPositions(), model.values);
  }

  private _initEventListeners(): void {
    this.view.onSelect(this._handleViewSelect.bind(this));
    this.model.onUpdate(this._handleModelUpdate.bind(this));
  }

  private _handleViewSelect(targetPosition: number, pointSelected: number): void {
    this.model.update(targetPosition, pointSelected);
  }

  private _handleModelUpdate(pointPositions: number[]): void {
    this.view.update(pointPositions, this.model.values);
  }
}

export default Presenter;
