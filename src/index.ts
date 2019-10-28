import './index.scss';
import './demo-panel/demo-panel';
import './slider/slider';
import * as jQuery from 'jquery';

(function (fun: Function) {
    jQuery(fun(jQuery, window, document));
}(function($: JQueryStatic, window: Window, document: Document) {
    const slider: JQuery = $('#slider1');
    const scale1: SliderScale = {
        type: 'array',
        value: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ]
    };
    const scale2: SliderScale = {
        type: 'range',
        value: [-1000, 1000]
    };

    slider.slider('init', {
        viewName: 'horizontal',
        selectMode: 'single',
        scale: scale1,
        step: 2,
        start: scale1.value[0]
    } as SliderConfig);      
}));