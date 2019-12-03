import { SliderView } from './view/slider-view';
import { SliderPresenter } from './view/slider-presenter';
import { SliderModel } from './domain-model/slider-model';

function hasOwnProp(obj: object, field: string | number | symbol): boolean {
    return Object.prototype.hasOwnProperty.apply(obj, [field]);
}

class Slider implements Slider {
    private readonly _presenter: SliderPresenter;
    private readonly _model: SliderModel;
    private readonly _view: SliderView;
    private readonly _callbackList: HandlerSliderSelect[];

    constructor(slider: JQuery, config: SliderConfig) {
        const {
            selectMode = 'single',
            showTooltips = true,
            viewName = 'horizontal',
            scale = [0, 100] as CoupleNum,
            step = 1,
            showBgLine = true,
            prettify = (value: string): string => {
                return value;
            },
            start = this._getDefaultScale(scale, selectMode),
        } = config;

        this._view = new SliderView({
            $slider: slider,
            selectMode: selectMode,
            showTooltips: showTooltips,
            viewName: viewName,
            prettify: prettify,
            showBgLine: showBgLine,
        });

        this._model = new SliderModel({
            selectMode: selectMode,
            scale: scale,
            step: step,
        });

        this._presenter = new SliderPresenter(this._view, this._model);
        this._callbackList = [];

        this._model.onUpdate(this.__onModelUpdateHandler.bind(this));

        this._model.value = start;
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
        return this._view.isShowTooltips;
    }

    public set isShowTooltips(state: boolean) {
        this._view.isShowTooltips = state;
    }

    public onSelect(callback: HandlerSliderSelect): void {
        this._callbackList.push(callback);
    }

    private __onModelUpdateHandler(points: SliderModelPointsState): void {
        const values = points.map((point) => {
            return point.value;
        });

        this._callbackList.forEach((callback: HandlerSliderSelect): void => {
            callback(values as string[] | number[]);
        });
    }

    private _getDefaultScale(scale: SliderScale, selectMode: SliderMode): string[] | number[] {
        const result = [scale[0]];

        if (selectMode === 'range') {
            result.push(scale[scale.length - 1]);
        }

        return result as string[] | number[];
    }
}

export { Slider, hasOwnProp };

