import { ISliderModel } from './domain-model/Model';
import { ISliderView } from './view/View';

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
  }
}

export default Presenter;
