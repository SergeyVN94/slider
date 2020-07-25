class Slider {
  private readonly model: IModelStateManager;

  private readonly view: IViewConfigManager;

  constructor(view: IViewConfigManager, model: IModelStateManager) {
    this.view = view;
    this.model = model;
  }

  public getConfig(): ISliderConfig {
    return this.model.getConfig();
  }

  public get values(): string[] | number[] {
    return this.model.values;
  }

  public set values(values: string[] | number[]) {
    this.model.values = values;
  }

  public get areTooltipsVisible(): boolean {
    return this.view.areTooltipsVisible;
  }

  public set areTooltipsVisible(state: boolean) {
    this.view.areTooltipsVisible = state;
  }

  public get isBgLineVisible(): boolean {
    return this.view.isBgLineVisible;
  }

  public set isBgLineVisible(state: boolean) {
    this.view.isBgLineVisible = state;
  }
}

export default Slider;
