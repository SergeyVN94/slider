import initConfigPanel from './components/config-panel/initConfigPanel';

const importAll = function importAll(resolve: __WebpackModuleApi.RequireContext): void {
  resolve.keys().forEach(resolve);
};

importAll(require.context('./components', true, /.ts$/));
importAll(require.context('./components', true, /.(sa|sc|c)ss$/));
require('./index.sass');

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
  const scale2: SliderScale = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'].reverse();

  initConfigPanel(
    $('#panel1'),
    $('#slider1').slider('init', {
      start: ['Январь'],
      customScale: scale1,
    }),
  );

  // initConfigPanel(
  //   $('#panel2'),
  //   $('#slider2').slider('init', {
  //     min: -1000,
  //     max: 1000,
  //     start: [-444, 777],
  //     prettify: (value: number) => `${value} -> ${value / 10}`,
  //   }),
  // );

  // initConfigPanel(
  //   $('#panel3'),
  //   $('#slider3').slider('init', {
  //     viewName: 'vertical',
  //     start: [555],
  //     max: 1000,
  //     prettify: (value: number) => `${value} $`,
  //   }),
  // );

  // initConfigPanel(
  //   $('#panel4'),
  //   $('#slider4').slider('init', {
  //     viewName: 'vertical',
  //     start: ['Ю', 'М'],
  //     customScale: scale2,
  //     prettify: (value: string) => `${value} -> ${value.toLowerCase()}`,
  //   }),
  // );
});
