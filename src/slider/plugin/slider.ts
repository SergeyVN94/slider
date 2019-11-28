import { SliderView } from './view/slider-view';
import { SliderPresenter } from './view/slider-presenter';
import { SliderModel } from './domain-model/slider-model';
import { isNull } from 'util';

function hasOwnProp(obj: object, field: string | number | symbol): boolean {
    return Object.prototype.hasOwnProperty.apply(obj, [field]);
}

class Slider implements Slider {
    private readonly _presenter: SliderPresenter;
    private readonly _model: SliderModel;
    private readonly _view: SliderView;
    private readonly _callbackList: SliderValueCallback[];

    constructor(slider: JQuery, config: SliderConfig) {
        const {
            selectMode = 'single',
            showTooltips = true,
            viewName = 'horizontal',
            scale = [0, 100],
            step = 1,
            showBgLine = true,
            prettify = (value: string): string => {
                return value;
            },
        } = config;

        this._view = new SliderView({
            slider: slider,
            selectMode: selectMode,
            showTooltips: showTooltips,
            viewName: viewName,
            prettify: prettify,
            showBgLine: showBgLine,
        });

        this._model = new SliderModel({
            selectMode: selectMode,
            scale: scale as SliderScale,
            step: step,
        });

        this._presenter = new SliderPresenter(this._view, this._model);

        if (!hasOwnProp(config, 'start')) {
            const points: SliderPointState[] = [
                {
                    position: 0,
                },
            ];

            if (config.selectMode === 'range') {
                points.push({
                    position: 1,
                });
            }

            this._model.setState({
                targetPosition: 0,
                points: points,
                pointSelected: 'min',
            });
        } else {
            this._model.setStateThroughValue(config.start);
        }

        this._callbackList = [];

        this._model.onChangeState((points: SliderModelPointsState): void => {
            const values: string[] = [];
            for (const point of points) {
                values.push(point.value);
            }

            this._callbackList.forEach((callback: SliderValueCallback): void => {
                callback(values);
            });
        });
    }

    public onSelect(callback: SliderValueCallback): void {
        this._callbackList.push(callback);
    }

    public value(value: number[] | string[] = null): string[] | void {
        if (isNull(value)) {
            return this._model.getValue();
        }

        this._model.setStateThroughValue(value);
    }

    public showTooltips(state: boolean = null): boolean | void {
        if (isNull(state)) {
            return this._view.showTooltips();
        }

        this._view.showTooltips(state);
    }

    public step(value: number = null): number | void {
        if (isNull(value)) {
            return this._model.step();
        }

        this._model.step(value);
    }
}

export { Slider, hasOwnProp };
