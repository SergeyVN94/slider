import * as jQuery from 'jquery';

import initSlider from './initSlider';
import pluginFunctionSingle from './pluginFuncSingle';
import pluginFunction from './pluginFunc';

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
            return pluginFunctionSingle.call(this, command);
        }

        return pluginFunction.call(this, command, params);
    };
}(jQuery));
