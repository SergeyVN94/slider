import View from './view/View';
import Presenter from './view/Presenter';
import Model from './domain-model/Model';

class Slider implements Slider {
    private readonly presenter: Presenter;
    private readonly model: Model;
    private readonly view: View;
    private updateEventCallback: HandlerSliderSelect;

    constructor(config: {
        readonly $slider: JQuery;
        readonly start?: string[] | number[];
        readonly scale?: SliderScale;
        readonly viewName?: SliderViewName;
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

        this.view = new View({
            points: start.length,
            ...config,
        });
        this.model = new Model({
            start,
            scale,
            step,
        });

        this.presenter = new Presenter(this.view, this.model);
        this.updateEventCallback = null;
        this.model.onUpdate(this.onModelUpdateHandler.bind(this));
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

    public get isShowTooltips(): boolean {
        return this.view.showTooltips;
    }

    public set isShowTooltips(state: boolean) {
        this.view.showTooltips = state;
    }

    public onSelect(callback: HandlerSliderSelect): void {
        this.updateEventCallback = callback;
    }

    private onModelUpdateHandler(points: SliderPointState[]): void {
        const values = points.map((point) => {
            return point.value;
        });

        if (this.updateEventCallback !== null) {
            this.updateEventCallback(values as string[] | number[]);
        }
    }
}

export default Slider;
