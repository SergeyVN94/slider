import * as jQuery from 'jquery';

import './slider/slider';
import { DemoPanel } from './demo-panel/demo-panel';

((fun: Function): void => {
    jQuery(fun(jQuery));
})(($: JQueryStatic): void => {
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
        'Декабрь',
    ];

    const scale2: SliderScale = [-1000, 1000];
    const scale3: SliderScale = [0, 1000];
    const scale4: SliderScale = [
        'А',
        'Б',
        'В',
        'Г',
        'Д',
        'Е',
        'Ё',
        'Ж',
        'З',
        'И',
        'Й',
        'К',
        'Л',
        'М',
        'Н',
        'О',
        'П',
        'Р',
        'С',
        'Т',
        'У',
        'Ф',
        'Х',
        'Ц',
        'Ч',
        'Ш',
        'Щ',
        'Ъ',
        'Ы',
        'Ь',
        'Э',
        'Ю',
        'Я',
    ].reverse();

    // slider 1
    const $slider1: JQuery = $('#slider1');

    $slider1.slider('init', {
        selectMode: 'single',
        scale: scale1,
    });

    new DemoPanel({
        $slider: $slider1,
        selector: '#panel1',
        selectMode: 'single',
        scale: scale1,
    });

    // slider 2
    const $slider2: JQuery = $('#slider2');

    $slider2.slider('init', {
        selectMode: 'range',
        scale: scale2,
        prettify: (value: number) => {
            return `${value} -> ${value / 10}`;
        },
    });

    new DemoPanel({
        $slider: $slider2,
        selector: '#panel2',
        selectMode: 'range',
        scale: scale2,
    });

    // slider 3
    const $slider3: JQuery = $('#slider3');

    $slider3.slider('init', {
        viewName: 'vertical',
        selectMode: 'single',
        scale: [0, 1000],
        start: [1000],
        prettify: (value: string | number): string => {
            return `${value} $`;
        },
    });

    new DemoPanel({
        $slider: $slider3,
        selector: '#panel3',
        selectMode: 'single',
        scale: scale3,
    });

    // slider 4
    const $slider4: JQuery = $('#slider4');

    $slider4.slider('init', {
        viewName: 'vertical',
        selectMode: 'range',
        scale: scale4,
        prettify: (value: string) => {
            return `${value} -> ${value.toLowerCase()}`;
        },
    });

    new DemoPanel({
        $slider: $slider4,
        selector: '#panel4',
        selectMode: 'range',
        scale: scale4,
    });
});
