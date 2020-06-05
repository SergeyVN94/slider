import { expect } from 'chai';
import getComponentsFactory from '../../desktop.blocks/slider/scripts/view/components-factory/getComponentsFactory';

require('../../desktop.blocks/slider/slider.sass');

const $body = $(document.body);
$body.css('padding', '50px');

const $slider = $('<div class="slider"></div>');
const factory = getComponentsFactory('vertical');
const point = factory.createPoint(0);
const $point = point.getElement();

point.draw($slider);
$body.append($slider);

describe('[VerticalSliderPoint]', () => {
  describe('[setPosition]', () => {
    describe('[Random point position]', () => {
      for (let i = 0; i < 15; i += 1) {
        // minimum slider size 100px
        const sliderSize = Math.round(Math.random() * 1000 + 100);
        const pointSize = Math.round(Math.random() * 10 + 5);
        const pointPosition = Math.random();

        it(`[Set random point position: ${pointPosition}]`, () => {
          $slider.css('height', `${sliderSize}px`);
          $point.css('height', `${pointSize}px`);

          point.setPosition(pointPosition);
          const targetPos = (sliderSize * pointPosition) - (pointSize / 2);
          const currentPos = parseInt($point.css('bottom'), 10);

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(Math.abs(targetPos - currentPos) < 1).to.be.true;
        });
      }
    });
  });
});
