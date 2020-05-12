import { expect } from 'chai';
import ComponentsFactory from '../../desktop.blocks/slider/scripts/view/components-factory/ComponentsFactory';

require('../../desktop.blocks/slider/slider.scss');

const $body = $(document.body);
$body.css('padding', '50px');

const $slider = $('<div class="slider"></div>');

const factory = new ComponentsFactory('vertical');
const pointContainer = factory.createPointContainer();
const point = factory.createPoint(0, pointContainer);
const $pointContainer = pointContainer.getElement();

$slider.append($pointContainer);
$body.append($slider);

describe('[HorizontalSliderPoint]', () => {
  describe('[setPosition]', () => {
    const $point = point.getElement();

    describe('[Random point position]', () => {
      for (let i = 0; i < 15; i += 1) {
        // minimum slider size 100px
        const sliderSize = Math.round(Math.random() * 1000 + 100);
        const pointSize = Math.round(Math.random() * 10 + 5);
        const pointPosition = Math.random();

        it(`Set random point position: ${pointPosition}`, () => {
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