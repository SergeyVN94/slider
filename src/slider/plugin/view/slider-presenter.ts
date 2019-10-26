export class SliderPresenter implements ISliderPresenter {
    readonly _view: ISliderView;
    readonly _model: ISliderModel;

    constructor(view: ISliderView, model: ISliderModel) {
        this._view = view;
        this._model = model;

        this._view.onMouseMove((stateData: SliderStateData): void => {
            this._model.setState(stateData);
            const modelData: SliderModelStateData = this._model.getState();
        });
    }
}