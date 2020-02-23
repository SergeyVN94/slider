import * as jQuery from 'jquery';

import pluginFunction from './pluginFunction';

(function($: JQueryStatic): void {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    $.fn.slider = pluginFunction as SliderPluginFunction;
}(jQuery));
