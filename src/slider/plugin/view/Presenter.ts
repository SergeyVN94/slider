class Presenter {
    readonly view: SliderView;
    readonly model: SliderModel;

    constructor(view: SliderView, model: SliderModel) {
        this.view = view;
        this.model = model;

        this.view.onSelect((viewState: SliderViewState): void => {
            this.model.update(viewState);
        });

        this.model.onUpdate((pints: SliderPointState[]) => {
            this.view.update(pints);
        });
    }
}

export default Presenter;
