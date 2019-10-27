import './index.scss';
import './demo-panel/demo-panel';
import './slider/slider';
import * as jQuery from 'jquery';

(function (fun: Function) {
    jQuery(fun(jQuery, window, document));
}(function($: JQueryStatic, window: Window, document: Document) {
    const slider: JQuery = $('#slider1');
    slider.slider('init', {
        viewName: 'horizontal',
        selectMode: 'single',
        scale: {
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
        }
    } as SliderConfig);    
}));