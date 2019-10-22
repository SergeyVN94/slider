import './index.scss';
import './demo-panel/demo-panel';
import './slider/slider-plugin';
import jQuery from 'jquery';

(function (fun: Function) {
    jQuery(fun(jQuery, window, document));
}(function($: JQueryStatic, window: Window, document: Document) {
    const slider: JQuery = $('#slider1');
    // slider.slider('Hello, World!');
    console.log(slider);
}));