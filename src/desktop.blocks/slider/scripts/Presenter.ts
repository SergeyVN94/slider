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

    this.view.onStepToValue((step: number): string => this.model.stepToValue(step));

    this.model.onUpdateScale((maxStep, stepSize) => {
      this.view.updateScale(maxStep, stepSize);
    });
  }
}

export default Presenter;
