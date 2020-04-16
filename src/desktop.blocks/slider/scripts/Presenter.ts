import {
    ISliderModel,
    SliderPointState,
} from './domain-model/Model';
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

        this.model.onUpdate((pints: SliderPointState[]) => {
            this.view.update(pints);
        });

        this.view.update(
            this.model.getPointStates()
        );
    }
}

export default Presenter;
