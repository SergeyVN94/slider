import View from './view/View';
import Presenter from './view/Presenter';
import Model from './domain-model/Model';

class Slider {
    private readonly _model: ISliderModelStateManager;
    private readonly _view: ISliderViewConfigManager;

    constructor(config: {
        readonly $slider: JQuery;
        readonly start?: string[] | number[];
        readonly scale?: SliderScale;
        readonly viewName?: ISliderViewName;
        readonly showTooltips?: boolean;
        readonly step?: number;
        readonly prettify?: PrettifyFunc;
        readonly showBgLine?: boolean;
    }) {
        const {
            scale = [0, 100] as CoupleNum,
            step = 1,
            start = [scale[0]] as string[] | number[],
        } = config;

        const view = new View({
            points: start.length,
            ...config,
        });

        const model = new Model({
            start,
            scale,
            step,
        });

        this._view = view;
        this._model = model;

        new Presenter(view, model);
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

    public get isShowTooltips(): boolean {
        return this._view.showTooltips;
    }

    public set isShowTooltips(state: boolean) {
        this._view.showTooltips = state;
    }

    public get isShowBgLine(): boolean {
        return this._view.showBgLine;
    }

    public set isShowBgLine(state: boolean) {
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
