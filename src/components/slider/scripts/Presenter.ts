class Presenter {
  readonly view: ISliderView;

  readonly model: ISliderModel;

  constructor(view: ISliderView, model: ISliderModel) {
    this.view = view;
    this.model = model;

    this._initEventListeners();
    this.view.update(this.model.getPointPositions(), model.value);
  }

  private _initEventListeners(): void {
    this.view.onSelect(this._handleViewSelect.bind(this));
    this.view.onStepToValue(this._handleViewStepToValue.bind(this));
    this.model.onUpdate(this._handleModelUpdate.bind(this));
    this.model.onUpdateScale(this._handleModelUpdateScale.bind(this));
  }

  private _handleViewSelect(targetPosition: number, pointSelected: number): void {
    this.model.update(targetPosition, pointSelected);
  }

  private _handleViewStepToValue(step: number): string {
    return this.model.stepToValue(step);
  }

  private _handleModelUpdate(pointPositions: number[]): void {
    this.view.update(pointPositions, this.model.value);
  }

  private _handleModelUpdateScale(maxStep: number, stepSize: number): void {
    this.view.updateScale(maxStep, stepSize);
  }
}

export default Presenter;
