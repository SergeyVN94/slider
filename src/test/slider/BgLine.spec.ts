import { expect } from 'chai';
import BgLine from '../../components/slider/scripts/view/components/BgLine';
import CLASSES from '../../components/slider/scripts/view/classes';
import Slider from '../../components/slider/scripts/view/components/Slider';

require('../../components/slider/slider.sass');

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
            max: 40,
          },
        },
        {
          sliderSize: 1000,
          min: 0.33,
          max: 0.65,
          result: {
            min: 33,
            max: 35,
          },
        },
        {
          sliderSize: 555,
          min: 0.342,
          max: 0.789,
          result: {
            min: 34.2,
            max: 21.1,
          },
        },
        {
          sliderSize: 555,
          min: 0.225,
          max: 0.345,
          result: {
            min: 22.5,
            max: 65.5,
          },
        },
        {
          sliderSize: 555,
          min: 0.888,
          max: 0.999,
          result: {
            min: 88.8,
            max: 0.1,
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

          const reallyMax = parseFloat($bgLine.get()[0].style.right);
          const reallyMin = parseFloat($bgLine.get()[0].style.left);
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
            max: 40,
          },
        },
        {
          sliderSize: 1000,
          min: 0.33,
          max: 0.65,
          result: {
            min: 33,
            max: 35,
          },
        },
        {
          sliderSize: 555,
          min: 0.342,
          max: 0.789,
          result: {
            min: 34.2,
            max: 21.1,
          },
        },
        {
          sliderSize: 555,
          min: 0.225,
          max: 0.345,
          result: {
            min: 22.5,
            max: 65.5,
          },
        },
        {
          sliderSize: 555,
          min: 0.888,
          max: 0.999,
          result: {
            min: 88.8,
            max: 0.1,
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

          const reallyMax = parseFloat($bgLine.get()[0].style.top);
          const reallyMin = parseFloat($bgLine.get()[0].style.bottom);
          const isCorrectMax = (Math.abs(result.max - reallyMax) < 1);
          const isCorrectMin = (Math.abs(result.min - reallyMin) < 1);

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(isCorrectMax && isCorrectMin).to.be.true;
        });
      });
    });
  });
});
