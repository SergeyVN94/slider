import '../slider/plugin/plugin';
import '../slider/slider.sass';
import initConfigPanel from './config-panel/initConfigPanel';
import './config-panel/config-panel.sass';
import './index.sass';

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
      values: [-5, 5],
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
      values: ['А', 'Я'],
      viewName: 'vertical',
      prettify: (value: string) => `${value} -> ${String(value).toLowerCase()}`,
    }),
  );
});
