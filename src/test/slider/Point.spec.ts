import { expect } from 'chai';
import Point from '../../components/slider/scripts/view/components/Point';
import Slider from '../../components/slider/scripts/view/components/Slider';
import CLASSES from '../../components/slider/scripts/view/classes';

require('../../desktop.blocks/slider/slider.sass');

const $body = $(document.body).css('padding', '50px');

describe('[Point]', () => {
  describe('[setPosition]', () => {
    const tests = [
      { position: 0, result: -5 },
      { position: 1, result: 995 },
      { position: 0.333, result: 328 },
      { position: 0.888, result: 883 },
      { position: 0.5, result: 495 },
    ];

    describe('[horizontal view]', () => {
      const $slider = $('<div class="slider"></div>');
      $body.html('').append($slider);
      new Slider($slider, 'horizontal');
      const point = new Point($slider, 0, 'horizontal');
      const $point = $slider.find(`.${CLASSES.POINT}`);

      $point.css('width', '10px');
      $slider.css('width', '1000px');

      tests.forEach(({ position, result }) => {
        it(`[Position: ${position}, result: ${result}]`, () => {
          point.setPosition(position);
          const reallyPosition = parseInt($point.css('left'), 10);

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(Math.abs(reallyPosition - result) < 1).to.be.true;
        });
      });
    });

    describe('[vertical view]', () => {
      const $slider = $('<div class="slider"></div>');
      $body.html('').append($slider);
      new Slider($slider, 'vertical');
      const point = new Point($slider, 0, 'vertical');
      const $point = $slider.find(`.${CLASSES.POINT}`);
      $point.css('height', '10px');
      $slider.css('height', '1000px');

      tests.forEach(({ position, result }) => {
        it(`[Position: ${position}, result: ${result}]`, () => {
          point.setPosition(position);
          const reallyPosition = parseInt($point.css('bottom'), 10);

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(Math.abs(reallyPosition - result) < 1).to.be.true;
        });
      });
    });
  });
});
