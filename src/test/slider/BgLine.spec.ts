import { expect } from 'chai';
import BgLine from '../../components/slider/scripts/view/components/BgLine';
import CLASSES from '../../components/slider/scripts/view/classes';
import Slider from '../../components/slider/scripts/view/components/Slider';

require('../../desktop.blocks/slider/slider.sass');

const $body = $(document.body).css('padding', '50px');

describe('[BgLine]', () => {
  describe('[update]', () => {
    describe('[horizontal view]', () => {
      const $slider = $('<div class="slider"></div>');
      $body.html('').append($slider);
      new Slider($slider, 'horizontal');
      const bgLine = new BgLine($slider, 'horizontal');
      const $bgLine = $slider.find(`.${CLASSES.BG_LINE}`);

      const tests = [
        {
          sliderSize: 1000,
          min: 0,
          max: 1,
          result: {
            min: 0,
            max: 0,
          },
        },
        {
          sliderSize: 1000,
          min: 0,
          max: 0.6,
          result: {
            min: 0,
            max: 400,
          },
        },
        {
          sliderSize: 1000,
          min: 0.33,
          max: 0.65,
          result: {
            min: 330,
            max: 350,
          },
        },
        {
          sliderSize: 555,
          min: 0.342,
          max: 0.789,
          result: {
            min: 189.81,
            max: 117.105,
          },
        },
        {
          sliderSize: 555,
          min: 0.225,
          max: 0.345,
          result: {
            min: 124.875,
            max: 363.525,
          },
        },
        {
          sliderSize: 555,
          min: 0.888,
          max: 0.999,
          result: {
            min: 492.84,
            max: 0.555,
          },
        },
      ];

      tests.forEach(({
        sliderSize,
        min,
        max,
        result,
      }) => {
        it(`[Slider size: ${sliderSize}, min: ${min}, max: ${max}]`, () => {
          $slider.css('width', `${sliderSize}px`);
          bgLine.update(max, min);

          const reallyMax = parseInt($bgLine.css('right'), 10);
          const reallyMin = parseInt($bgLine.css('left'), 10);
          const isCorrectMax = (Math.abs(result.max - reallyMax) < 1);
          const isCorrectMin = (Math.abs(result.min - reallyMin) < 1);

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(isCorrectMax && isCorrectMin).to.be.true;
        });
      });
    });

    describe('[vertical view]', () => {
      const $slider = $('<div class="slider"></div>');
      $body.html('').append($slider);
      new Slider($slider, 'vertical');
      const bgLine = new BgLine($slider, 'vertical');
      const $bgLine = $slider.find(`.${CLASSES.BG_LINE}`);

      const tests = [
        {
          sliderSize: 1000,
          min: 0,
          max: 1,
          result: {
            min: 0,
            max: 0,
          },
        },
        {
          sliderSize: 1000,
          min: 0,
          max: 0.6,
          result: {
            min: 0,
            max: 400,
          },
        },
        {
          sliderSize: 1000,
          min: 0.33,
          max: 0.65,
          result: {
            min: 330,
            max: 350,
          },
        },
        {
          sliderSize: 555,
          min: 0.342,
          max: 0.789,
          result: {
            min: 189.81,
            max: 117.105,
          },
        },
        {
          sliderSize: 555,
          min: 0.225,
          max: 0.345,
          result: {
            min: 124.875,
            max: 363.525,
          },
        },
        {
          sliderSize: 555,
          min: 0.888,
          max: 0.999,
          result: {
            min: 492.84,
            max: 0.555,
          },
        },
      ];

      tests.forEach(({
        sliderSize,
        min,
        max,
        result,
      }) => {
        it(`[Slider size: ${sliderSize}, min: ${min}, max: ${max}]`, () => {
          $slider.css('height', `${sliderSize}px`);
          bgLine.update(max, min);

          const reallyMax = parseInt($bgLine.css('top'), 10);
          const reallyMin = parseInt($bgLine.css('bottom'), 10);
          const isCorrectMax = (Math.abs(result.max - reallyMax) < 1);
          const isCorrectMin = (Math.abs(result.min - reallyMin) < 1);

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(isCorrectMax && isCorrectMin).to.be.true;
        });
      });
    });
  });
});
