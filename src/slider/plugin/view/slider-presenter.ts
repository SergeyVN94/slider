export class SliderPresenter implements ISliderPresenter {
    readonly _view: ISliderView;
    readonly _model: ISliderModel;

    constructor(view: ISliderView, model: ISliderModel) {
        this._view = view;
        this._model = model;

        const modelData: SliderModelStateData = this._model.getState();
        this._view.update(modelData);

        this._view.onMouseMove((stateData: SliderStateData): void => {
            // console.log(stateData);
            this._model.setState(stateData);
            const modelData: SliderModelStateData = this._model.getState();
            // console.log(modelData);
            this._view.update(modelData);
        });
    }
}