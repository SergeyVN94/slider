export class SliderPresenter implements ISliderPresenter {
    readonly _view: ISliderView;

    constructor(view: ISliderView) {
        this._view = view;

        view.onMouseMove(function(stateData: SliderStateData): void {
            console.log(stateData);
        });
    }
}