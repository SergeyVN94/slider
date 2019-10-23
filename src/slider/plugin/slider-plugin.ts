import * as jQuery from 'jquery';
import {initSlider} from './slider-plugin-func-init';
import {sliderPluginFunctionSingle} from './slider-plugin-func-single';
import {sliderPluginFunction} from './slider-plugin-func';
import { isNull } from 'util';


(function ($: JQueryStatic) {
    $.fn.slider = function(this: JQuery, command: string, params: any = null): any {
        if (command === 'init') {
            params = params as SliderConfig;
            params.slider = this;
            initSlider.call(this, params as SliderConfig);
            return this;
        }

        if (isNull(params)) {
            return sliderPluginFunctionSingle.call(this, command);
        } 

        return sliderPluginFunction.call(this, command, params);
    }
}(jQuery));