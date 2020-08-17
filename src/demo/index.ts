import initConfigPanel from '../components/config-panel/initConfigPanel';

const importAll = (resolve: __WebpackModuleApi.RequireContext): void => {
  resolve.keys().forEach(resolve);
};

importAll(require.context('../components', true, /.ts$/));
importAll(require.context('../components', true, /.(sa|sc|c)ss$/));
require('./index.sass');

((fun: Function): void => {
  jQuery(fun(jQuery));
})(($: JQueryStatic): void => {
  const scale1 = [
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
  const scale2 = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'].reverse();

  initConfigPanel(
    $('#panel1'),
    $('#slider1').slider('init', {
      customScale: scale1,
    }),
  );

  initConfigPanel(
    $('#panel2'),
    $('#slider2').slider('init', {
      min: -10,
      max: 10,
      prettify: (value: number) => `${value} -> ${value / 10}`,
    }),
  );

  initConfigPanel(
    $('#panel3'),
    $('#slider3').slider('init', {
      viewName: 'vertical',
      values: ['5'],
      max: 10,
      prettify: (value: number) => `${value} $`,
    }),
  );

  initConfigPanel(
    $('#panel4'),
    $('#slider4').slider('init', {
      customScale: scale2,
      viewName: 'vertical',
      prettify: (value: string) => `${value} -> ${String(value).toLowerCase()}`,
    }),
  );
});
