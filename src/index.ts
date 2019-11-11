import './index.scss';
import './demo-panel/demo-panel';
import './slider/slider';
import * as jQuery from 'jquery';
import { DemoPanel } from './demo-panel/demo-panel';

(function (fun: Function) {
    jQuery(fun(jQuery, window, document));
}(function($: JQueryStatic, window: Window, document: Document) {
    const scale1: SliderScale = [
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
        ];

    const scale2: SliderScale = [-1000, 1000];

    // slider 1

    const slider1: JQuery = $('#slider1');
       
    slider1.slider('init', {
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

    // slider 3

    const slider3: JQuery = $('#slider3');

    slider3.slider('init', {
        viewName: 'vertical',
        selectMode: 'single',
        scale: [0, 1000],
        prettify: (value: string): string => {
            return `${value}$`;
        }
    } as SliderConfig);

    const panel3: DemoPanel = new DemoPanel($('#panel3'), slider3);

    // slider 4

    const slider4: JQuery = $('#slider4');

    slider4.slider('init', {
        viewName: 'vertical',
        selectMode: 'range',
        scale: [
            'А','Б','В','Г','Д','Е','Ё','Ж','З','И'
            ,'Й','К','Л','М','Н','О','П','Р','С','Т'
            ,'У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь'
            ,'Э','Ю','Я'
        ].reverse()
    } as SliderConfig);

    const panel4: DemoPanel = new DemoPanel($('#panel4'), slider4);
}));