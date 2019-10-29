export class SliderPresenter implements ISliderPresenter {
    readonly _view: ISliderView;
    readonly _model: ISliderModel;

    constructor(view: ISliderView, model: ISliderModel) {
        this._view = view;
        this._model = model;

        this._view.onMouseMove((stateData: SliderViewStateData): void => {
            // console.log(stateData);
            this._model.setState(stateData);
        });

        this._model.onChangeState((modelState: SliderModelStateData) => {
            // console.log(modelData);
            this._view.update(modelState);
        });
    }
}