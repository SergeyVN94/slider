export class SliderPresenter implements ISliderPresenter {
    readonly _view: ISliderView;
    readonly _model: ISliderModel;

    constructor(view: ISliderView, model: ISliderModel) {
        this._view = view;
        this._model = model;

        this._view.onMouseMove((viewState: SliderViewStateData): void => {
            // console.log(viewState);
            this._model.setState(viewState);
        });

        this._model.onChangeState((modelState: SliderModelStateData) => {
            // console.log(modelState);
            this._view.update(modelState);
        });
    }
}