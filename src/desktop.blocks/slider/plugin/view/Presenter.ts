class Presenter {
    readonly _view: ISliderView;
    readonly _model: ISliderModel;

    constructor(view: ISliderView, model: ISliderModel) {
        this._view = view;
        this._model = model;

        this._view.onSelect((viewState: SliderViewState): void => {
            this._model.update(viewState);
        });

        this._model.onUpdate((pints: SliderPointState[]) => {
            this._view.update(pints);
        });

        this._view.update(
            this._model.getPointStates()
        );
    }
}

export default Presenter;
