class Slider {
  private readonly model: IModelStateManager;

  private readonly view: IViewConfigManager;

  constructor(view: IViewConfigManager, model: IModelStateManager) {
    this.view = view;
    this.model = model;
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

  public get areBgLineVisible(): boolean {
    return this.view.areBgLineVisible;
  }

  public set areBgLineVisible(state: boolean) {
    this.view.areBgLineVisible = state;
  }
}

export default Slider;
