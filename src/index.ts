import './index.scss';
import './demo-panel/demo-panel';
import './slider/slider';
import * as jQuery from 'jquery';
import { DemoPanel } from './demo-panel/demo-panel';

(function (fun: Function) {
    jQuery(fun(jQuery, window, document));
}(function($: JQueryStatic, window: Window, document: Document) {
    const scale1: SliderScale = {
        type: 'custom',
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
    
    // slider 1

    const slider1: JQuery = $('#slider1');
       
    slider1.slider('init', {
        viewName: 'horizontal',
        selectMode: 'single',
        scale: scale1
    } as SliderConfig);

    const panel1: DemoPanel = new DemoPanel($('#panel1'), slider1); 

    // slider 2

    const slider2: JQuery = $('#slider2');

    slider2.slider('init', {
        selectMode: 'range',
        scale: scale2
    } as SliderConfig);

    const panel2: DemoPanel = new DemoPanel($('#panel2'), slider2);
}));