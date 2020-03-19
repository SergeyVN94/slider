import ConfigPanel from './desktop.blocks/config-panel/config-panel';

const importAll = function importAll(resolve: __WebpackModuleApi.RequireContext): void {
    resolve.keys().forEach(resolve);
};

importAll(require.context('./desktop.blocks', true, /.ts$/));
importAll(require.context('./desktop.blocks', true, /.(sa|sc|c)ss$/));
require('./index.scss');

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
        start: ['Январь'],
        scale: scale1,
    });

    new ConfigPanel({
        $slider: $slider1,
        $panel: $('#panel1'),
    });

    // slider 2
    const $slider2: JQuery = $('#slider2');

    $slider2.slider('init', {
        start: [-444, 777],
        scale: scale2,
        prettify: (value: number) => {
            return `${value} -> ${value / 10}`;
        },
    });

    new ConfigPanel({
        $slider: $slider2,
        $panel: $('#panel2'),
    });

    // slider 3
    const $slider3: JQuery = $('#slider3');

    $slider3.slider('init', {
        viewName: 'vertical',
        start: [555],
        scale: scale3,
        prettify: (value: number): string => {
            return `${value} $`;
        },
    });

    new ConfigPanel({
        $slider: $slider3,
        $panel: $('#panel3'),
    });

    // slider 4
    const $slider4: JQuery = $('#slider4');

    $slider4.slider('init', {
        viewName: 'vertical',
        start: ['Ю', 'М'],
        scale: scale4,
        prettify: (value: string) => {
            return `${value} -> ${value.toLowerCase()}`;
        },
    });

    new ConfigPanel({
        $slider: $slider4,
        $panel: $('#panel4'),
    });
});
