class Presenter {
    readonly _view: SliderView;
    readonly _model: SliderModel;

    constructor(view: SliderView, model: SliderModel) {
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
