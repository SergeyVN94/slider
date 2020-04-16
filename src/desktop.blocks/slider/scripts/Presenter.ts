class Presenter {
    readonly view: ISliderView;
    readonly model: ISliderModel;

    constructor(view: ISliderView, model: ISliderModel) {
        this.view = view;
        this.model = model;

        this.view.onSelect((viewState: SliderViewState): void => {
            this.model.update(viewState);
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
