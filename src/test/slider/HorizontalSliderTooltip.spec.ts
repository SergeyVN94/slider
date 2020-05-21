import { expect } from 'chai';
import getComponentsFactory from '../../desktop.blocks/slider/scripts/view/components-factory/getComponentsFactory';

require('../../desktop.blocks/slider/slider.sass');

const $body = $(document.body);
$body.css('padding', '50px');

const $slider = $('<div class="slider"><div class="slider__tooltip-container js-slider__tooltip-container"></div></div>');
const factory = getComponentsFactory('horizontal');
const tooltip = factory.createTooltip();
const $tooltip = tooltip.getElement();

$slider.append($tooltip);
$body.append($slider);

describe('[HorizontalSliderTooltip]', () => {
  describe('[setState]', () => {
    describe('[Random point position]', () => {
      for (let i = 0; i < 20; i += 1) {
        // minimum slider size 100px
        const sliderSize = Math.round(Math.random() * 1000 + 100);
        // minimum tooltip width 16px
        const tooltipSize = Math.round(Math.random() * 30 + 16);
        const position = Math.random();

        // eslint-disable-next-line no-loop-func
        it(`[Tooltip size: ${tooltipSize}, position ${position}]`, () => {
          $slider.css('width', `${sliderSize}px`);
          $tooltip.css('width', `${tooltipSize}px`);

          tooltip.setState(position, '');

          const targetPos = (sliderSize * position) - (tooltipSize / 2);
          const currentPos = parseInt($tooltip.css('left'), 10);

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(Math.abs(targetPos - currentPos) < 1).to.be.true;
        });
      }
    });
  });
});
