class Presenter {
  readonly view: ISliderView;

  readonly model: ISliderModel;

  constructor(view: ISliderView, model: ISliderModel) {
    this.view = view;
    this.model = model;

    this.view.onSelect((targetPosition, pointSelected): void => {
      this.model.update(targetPosition, pointSelected);
    });

    this.model.onUpdate((pointPositions: number[]) => {
      this.view.update(pointPositions, model.value);
    });

    this.view.update(
      this.model.getPointPositions(),
      model.value,
    );

    this.model.onChangeAllSteps(this._handleModelChangeAllSteps.bind(this));
  }

  private _handleModelChangeAllSteps(allSteps: number): void {
    this.view.setAllSteps(allSteps);
  }
}

export default Presenter;
