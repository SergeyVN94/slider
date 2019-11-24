import {SliderView} from './view/slider-view';
import {SliderPresenter} from './view/slider-presenter';
import {SliderModel} from './domain-model/slider-model';

class Slider implements ISlider {
    private readonly _presenter: ISliderPresenter;
    private readonly _model: ISliderModel;
    private readonly _view: ISliderView;
    private readonly _callbackList: SliderValueCallback[];

    constructor(slider: JQuery, config: SliderConfig) {
        const defaultConfig: SliderConfig = {
            selectMode: 'single',
            showValue: true,
            viewName: 'horizontal',
            scale: [0, 100],
            step: 1,
            showBgLine: true,
            showScale: true
        };
        
        this._view = new SliderView(slider, {
            selectMode: config.selectMode || defaultConfig.selectMode,
            showValue: config.showValue === undefined ? defaultConfig.showValue : config.showValue,
            viewName: config.viewName || defaultConfig.viewName,
            prettify: config.prettify,
            showBgLine: config.showBgLine === undefined ? defaultConfig.showBgLine : config.showBgLine,
            showScale: config.showScale === undefined ? defaultConfig.showScale : config.showScale,
            scale: config.scale || defaultConfig.scale
        });

        this._model = new SliderModel({
            selectMode: config.selectMode || defaultConfig.selectMode,
            scale: config.scale || defaultConfig.scale,
            step: !isNaN(config.step) ? Math.round(config.step) : defaultConfig.step
        });

        this._presenter = new SliderPresenter(this._view, this._model);
        
        if (!config.start) {
            const points: SliderPointState[] = [{
                position: 0
            }];
            if (config.selectMode === 'range') points.push({
                position: 1
            });

            this._model.setState({
                targetPosition: 0,
                points: points,
                pointSelected: 'min'
            });
        } else {
            this._model.setStateThroughValue(config.start);
        }

        this._callbackList = [];

        this._model.onChangeState((points: SliderModelPointsState): void => {
            const values: string[] = [];
            for (let i = 0; i < points.length; i++) {
                values[i] = points[i].value;
            }
            this._callbackList.forEach((callback: SliderValueCallback): void => {
                callback(values);
            });
        });
    }

    public onStateChange(callback: SliderValueCallback): void {
        this._callbackList.push(callback);
    }

    public value(value?: number[] | string[]): string[] | void {
        if (value === undefined) {
           return this._model.getValue();
        } else {
            this._model.setStateThroughValue(value);
        }
    }

    public showValue(state?: boolean): boolean | void {
        if (state === undefined) {
            return this._view.showValue();
        } else {
            this._view.showValue(state);
        }
    }

    public step(value?: number): number | void {
        if (value === undefined) {
            return this._model.step();
        }

        this._model.step(value);
    }
}

export {
    Slider
};