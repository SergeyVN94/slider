class Slider {
    private readonly _model: ISliderModelStateManager;
    private readonly _view: ISliderViewConfigManager;

    constructor(view: ISliderViewConfigManager, model: ISliderModelStateManager) {
        this._view = view;
        this._model = model;
    }

    public get value(): string[] | number[] {
        return this._model.value;
    }

    public set value(value: string[] | number[]) {
        this._model.value = value;
    }

    public get step(): number {
        return this._model.step;
    }

    public set step(value: number) {
        this._model.step = value;
    }

    public get showTooltips(): boolean {
        return this._view.showTooltips;
    }

    public set showTooltips(state: boolean) {
        this._view.showTooltips = state;
    }

    public get showBgLine(): boolean {
        return this._view.showBgLine;
    }

    public set showBgLine(state: boolean) {
        this._view.showBgLine = state;
    }

    public get viewName(): 'horizontal' | 'vertical' {
        return this._view.viewName;
    }

    public set viewName(viewName: 'horizontal' | 'vertical') {
        this._view.viewName = viewName;
    }
}

export default Slider;
