import '../slider/plugin/plugin';
import initConfigPanel from './config-panel/initConfigPanel';
import './index.sass';

// eslint-disable-next-line no-undef
$(($) => {
  const exampleCustomScale = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'].reverse();

  initConfigPanel(
    $('#panel1'),
    $('#slider1').slider('init'),
  );

  initConfigPanel(
    $('#panel2'),
    $('#slider2').slider('init', {
      min: -10,
      max: 10,
      values: [-5, 5],
      prettify: (value) => `${value} -> ${value / 10}`,
    }),
  );

  initConfigPanel(
    $('#panel3'),
    $('#slider3').slider('init', {
      viewName: 'vertical',
      values: [5],
      max: 10,
      prettify: (value) => `${value} $`,
    }),
  );

  initConfigPanel(
    $('#panel4'),
    $('#slider4').slider('init', {
      customScale: exampleCustomScale,
      values: ['А', 'Я'],
      viewName: 'vertical',
      prettify: (value) => `${value} -> ${String(value).toLowerCase()}`,
    }),
  );
});
