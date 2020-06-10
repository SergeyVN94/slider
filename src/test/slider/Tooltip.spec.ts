import { expect } from 'chai';
import Tooltip from '../../desktop.blocks/slider/scripts/view/components/Tooltip';
import CLASSES from '../../desktop.blocks/slider/scripts/view/classes';
import Slider from '../../desktop.blocks/slider/scripts/view/components/Slider';

require('../../desktop.blocks/slider/slider.sass');

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
      $tooltip.css('width', '40px');

      const tests = [
        { position: 0, result: -20 },
        { position: 1, result: 980 },
        { position: 0.5, result: 480 },
        { position: 0.333, result: 313 },
        { position: 0.777, result: 757 },
      ];

      tests.forEach(({ position, result }) => {
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
      $tooltip.css('height', '20px');

      const tests = [
        { position: 0, result: -10 },
        { position: 1, result: 990 },
        { position: 0.5, result: 490 },
        { position: 0.333, result: 323 },
        { position: 0.777, result: 767 },
      ];

      tests.forEach(({ position, result }) => {
        it(`[position: ${position}]`, () => {
          tooltip.setState(position, '');
          const reallyPosition = parseInt($tooltip.css('bottom'), 10);

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(Math.abs(reallyPosition - result) < 1).to.be.true;
        });
      });
    });
  });
});
