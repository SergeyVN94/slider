import './index.scss';
import './demo-panel/demo-panel';
import './slider/slider';
import * as jQuery from 'jquery';
import { DemoPanel } from './demo-panel/demo-panel';

(function (fun: Function) {
    jQuery(fun(jQuery, window, document));
}(function($: JQueryStatic, window: Window, document: Document) {
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
    
    const slider1: JQuery = $('#slider1');
    const panel1: DemoPanel = new DemoPanel($('#panel1'));    

    slider1.slider('init', {
        viewName: 'horizontal',
        selectMode: 'single',
        scale: {
            type: 'range',
            value: [-10000, 10000]
        },
        step: 500
    } as SliderConfig);

    slider1.slider('onInput', (value: string | number | CoupleNum | CoupleStr) => {
        panel1.setValue(value);
    });

    panel1.onChangeValue((value: string | CoupleStr | number | CoupleNum): void => {
        slider1.slider('setValue', value);
    });

    panel1.onShowValue((state: boolean): void => {
        slider1.slider('showValue', state);
    });
}));