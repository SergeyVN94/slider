import {SliderView} from './view/slider-view';
import {SliderPresenter} from './view/slider-presenter';
import {SliderModel} from './domain-model/slider-model';

export class Slider implements ISlider {
    readonly _presenter: ISliderPresenter;
    readonly _model: ISliderModel;

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
            this._model.setState({
                targetPosition: 0,
                pointPosition: config.selectMode === 'single' ? 0 : [0, 1]
            });
        } else {
            this._setStartPointPosition(config.selectMode, config.start);
        }
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
}