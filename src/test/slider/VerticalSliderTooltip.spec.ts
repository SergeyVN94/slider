import { expect } from 'chai';
import getComponentsFactory from '../../desktop.blocks/slider/scripts/view/components-factory/getComponentsFactory';
import CLASSES from '../../desktop.blocks/slider/scripts/view/classes';

require('../../desktop.blocks/slider/slider.sass');

const $body = $(document.body);
$body.css('padding', '50px');

const $slider = $('<div class="slider slider_view-name_vertical"><div class="slider__tooltip-container js-slider__tooltip-container"></div></div>');
const factory = getComponentsFactory('vertical');
const $tooltipContainer = $slider.find(`.js-${CLASSES.TOOLTIP_CONTAINER}`);
const tooltip = factory.createTooltip($tooltipContainer);

$slider.append($tooltipContainer);
$body.append($slider);

describe('[VerticalSliderTooltip]', () => {
  describe('[setState]', () => {
    describe('[Random point position]', () => {
      const $tooltip = tooltip.getElement();

      for (let i = 0; i < 20; i += 1) {
        // minimum slider size 100px
        const sliderSize = Math.round(Math.random() * 1000 + 100);
        // minimum tooltip width 16px
        const tooltipSize = $tooltip.outerHeight();
        const position = Math.random();

        // eslint-disable-next-line no-loop-func
        it(`Position ${position}`, () => {
          $slider.css('height', `${sliderSize}px`);

          tooltip.setState(position, 'Hello, World!');

          const targetPos = (sliderSize * position) - (tooltipSize / 2);
          const currentPos = parseInt($tooltip.css('bottom'), 10);

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(Math.abs(targetPos - currentPos) < 1).to.be.true;
        });
      }
    });
  });
});
