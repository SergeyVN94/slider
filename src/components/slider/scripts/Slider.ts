class Slider {
  private readonly model: ISliderModelStateManager;

  private readonly view: ISliderViewConfigManager;

  constructor(view: ISliderViewConfigManager, model: ISliderModelStateManager) {
    this.view = view;
    this.model = model;
  }

  public get values(): string[] | number[] {
    return this.model.values;
  }

  public set values(values: string[] | number[]) {
    this.model.values = values;
  }

  public get showTooltips(): boolean {
    return this.view.showTooltips;
  }

  public set showTooltips(state: boolean) {
    this.view.showTooltips = state;
  }

  public get showBgLine(): boolean {
    return this.view.showBgLine;
  }

  public set showBgLine(state: boolean) {
    this.view.showBgLine = state;
  }
}

export default Slider;
