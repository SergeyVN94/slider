import * as jQuery from 'jquery';

import { initSlider } from './slider-plugin-func-init';
import { sliderPluginFunctionSingle } from './slider-plugin-func-single';
import { sliderPluginFunction } from './slider-plugin-func';

(function($: JQueryStatic): void {
    $.fn.slider = function(
        this: JQuery,
        command: Command,
        params: SliderPluginParams = null
    ): SliderPluginResponse {
        if (command === 'init') {
            initSlider.call(this, params as SliderConfig);
            return this;
        }

        if (params === null) {
            return sliderPluginFunctionSingle.call(this, command);
        }

        return sliderPluginFunction.call(this, command, params);
    };
}(jQuery));
