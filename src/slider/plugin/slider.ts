import {SliderView} from './view/slider-view';
import {SliderPresenter} from './view/slider-presenter';
import {SliderModel} from './domain-model/slider-model';

export class Slider implements ISlider {
    readonly _presenter: ISliderPresenter;
    readonly _model: ISliderModel;
    readonly _callbackList: SliderValueCallback[];

    constructor(slider: JQuery, config: SliderConfig) {
        const defaultConfig: SliderConfig = {
            selectMode: 'single',
            showValue: true,
            viewName: 'horizontal',
            scale: {
                type: 'range',
                value: [0, 100]
            },
            step: 1
        };
        
        const view: ISliderView = new SliderView(slider, {
            selectMode: config.selectMode || defaultConfig.selectMode,
            showValue: config.showValue || defaultConfig.showValue,
            viewName: config.viewName || defaultConfig.viewName,
            prettify: config.prettify
        });

        this._model = new SliderModel({
            selectMode: config.selectMode || defaultConfig.selectMode,
            scale: config.scale || defaultConfig.scale,
            step: !isNaN(config.step) ? Math.round(config.step) : defaultConfig.step
        });

        this._presenter = new SliderPresenter(view, this._model);
        
        if (!config.start) {
            if (config.selectMode === 'single') {
                this._model.setState({
                    mode: 'single',
                    targetPosition: 0,
                    pointPosition: 0
                });
            } else {
                this._model.setState({
                    mode: 'range',
                    targetPosition: 0,
                    pointPosition: [0, 1]
                });
            }
        } else {
            this._setStartPointPosition(config.selectMode, config.start);
        }

        this._callbackList = [];

        this._model.onChangeState((state: SliderModelStateData): void => {
            this._eventUpdateValue(state.pointValue);
        });
    }

    private _setStartPointPosition(mode: SliderMode, start: number | string | CoupleStr | CoupleNum): void {
        if (typeof start === 'string' || typeof start === 'number') {
            this._model.setStateThroughValue(start);
        } else {
            if (mode === 'single') {
                throw "The slider in single mode cannot be initialized with a pair of values";
            }
            this._model.setStateThroughValues(start as CoupleStr | CoupleNum);
        }
    }

    public onStateChange(callback: SliderValueCallback): void {
        this._callbackList.push(callback);
    }

    private _eventUpdateValue(value: number | string | CoupleStr | CoupleNum): void {
        this._callbackList.forEach((callback: SliderValueCallback): void => {
            callback(value);
        });
    }
}