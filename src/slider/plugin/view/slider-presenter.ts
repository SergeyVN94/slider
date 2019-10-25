export class SliderPresenter implements ISliderPresenter {
    readonly _view: ISliderView;
    readonly _model: ISliderModel;

    constructor(view: ISliderView, model: ISliderModel) {
        this._view = view;
        this._model = model;

        view.onMouseMove(function(stateData: SliderStateData): void {
            console.log(stateData);
        });
    }
}