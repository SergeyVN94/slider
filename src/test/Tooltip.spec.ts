import { expect } from 'chai';
import Tooltip from '../slider/scripts/view/components/Tooltip';
import CLASSES from '../slider/scripts/view/classes';
import Slider from '../slider/scripts/view/components/Slider';

require('../slider/slider.sass');

const $body = $(document.body).css('padding', '50px');

describe('[Tooltip]', () => {
  describe('[setState]', () => {
    describe('[horizontal view]', () => {
      const $slider = $('<div class="slider"></div>');
      $body.html('').append($slider);
      new Slider($slider, 'horizontal');
      const tooltip = new Tooltip($slider, 'horizontal');
      const $tooltip = $slider.find(`.${CLASSES.TOOLTIP}`);
      $slider.css('width', '1000px');

      [
        { position: 0, result: 0 },
        { position: 1, result: 100 },
        { position: 0.5, result: 50 },
        { position: 0.333, result: 33.3 },
        { position: 0.777, result: 77.7 },
      ].forEach(({ position, result }) => {
        it(`[position: ${position}]`, () => {
          tooltip.setState(position, '');
          const reallyPosition = parseInt($tooltip.css('left'), 10);

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(Math.abs(reallyPosition - result) < 1).to.be.true;
        });
      });
    });

    describe('[vertical view]', () => {
      const $slider = $('<div class="slider"></div>');
      $body.html('').append($slider);
      new Slider($slider, 'vertical');
      const tooltip = new Tooltip($slider, 'vertical');
      const $tooltip = $slider.find(`.${CLASSES.TOOLTIP}`);
      $slider.css('height', '1000px');

      [
        { position: 0, result: 100 },
        { position: 1, result: 0 },
        { position: 0.5, result: 50 },
        { position: 0.333, result: 66.4 },
        { position: 0.777, result: 22.3 },
      ].forEach(({ position, result }) => {
        it(`[position: ${position}]`, () => {
          tooltip.setState(position, '');
          // $tooltip.css('top') возвращает значение в пикселях а не процентах.
          const reallyPosition = parseInt($tooltip.get()[0].style.top, 10);

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(Math.abs(reallyPosition - result) < 1).to.be.true;
        });
      });
    });
  });
});
