class SliderPresenter {
    readonly _view: SliderView;
    readonly _model: SliderModel;

    constructor(view: SliderView, model: SliderModel) {
        this._view = view;
        this._model = model;

        this._view.onSelect((viewState: SliderViewState): void => {
            // console.log(viewState);
            this._model.setState(viewState);
        });

        this._model.onUpdate((modelState: SliderModelPointsState) => {
            // console.log(modelState);
            this._view.update(modelState);
        });
    }
}

export { SliderPresenter };
