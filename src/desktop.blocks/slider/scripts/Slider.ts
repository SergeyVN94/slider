class Slider {
  private readonly model: ISliderModelStateManager;

  private readonly view: ISliderViewConfigManager;

  constructor(view: ISliderViewConfigManager, model: ISliderModelStateManager) {
    this.view = view;
    this.model = model;
  }

  public get value(): string[] | number[] {
    return this.model.value;
  }

  public set value(value: string[] | number[]) {
    this.model.value = value;
  }

  public get step(): number {
    return this.model.step;
  }

  public set step(value: number) {
    this.model.step = value;
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

  public get viewName(): 'horizontal' | 'vertical' {
    return this.view.viewName;
  }

  public set viewName(viewName: 'horizontal' | 'vertical') {
    this.view.viewName = viewName;
  }
}

export default Slider;
