/* eslint-disable no-loop-func */
import { expect } from 'chai';
import driverVertical from '../../desktop.blocks/slider/scripts/view/drivers/driverVertical';
import createSlider from './createSlider';

document.body.style.padding = '50px';

describe('[DriverVertical]', () => {
  describe('[setPointPosition]', () => {
    afterEach((): void => {
      $(document.body).remove('.slider');
    });

    describe('[Random point position]', () => {
      for (let i = 0; i < 15; i += 1) {
        // minimum slider size 100px
        const sliderSize = Math.round(Math.random() * 1000 + 100);
        const pointPosition = Math.random();
        const pointSize = Math.round(Math.random() * 10 + 5);
        it(`[position: ${pointPosition}]`, () => {
          const packet = createSlider({
            pointSize,
            sliderSize,
            viewName: 'vertical',
            points: [0],
          });

          $(document.body).append(packet.$slider);
          driverVertical.setPointPosition(
            packet.points[0],
            packet.$pointContainer,
            pointPosition,
          );

          const targetPos = (sliderSize * pointPosition) - (pointSize / 2);
          const currentPos = parseInt(packet.points[0].css('bottom'), 10);

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(Math.abs(targetPos - currentPos) < 1).to.be.true;
        });
      }
    });
  });

  describe('[updateTooltip]', () => {
    afterEach((): void => {
      $(document.body).remove('.slider');
    });

    describe('[Random point position]', () => {
      for (let i = 0; i < 20; i += 1) {
        // minimum slider size 100px
        const sliderSize = Math.round(Math.random() * 1000 + 100);
        const pointPosition = Math.random();

        // minimum tooltip width 16px
        const tooltipSize = Math.round(Math.random() * 30 + 16);
        it(`[Set random tooltip position and random size: ${pointPosition} ${tooltipSize}]`, () => {
          const packet = createSlider({
            sliderSize,
            pointSize: 10,
            viewName: 'vertical',
            points: [pointPosition],
          });

          $(document.body).append(packet.$slider);
          packet.tooltips[0].css('height', `${tooltipSize}px`);
          driverVertical.updateTooltip(
            packet.tooltips[0],
            packet.$tooltipContainer,
            pointPosition,
            '',
          );

          const targetPos = (sliderSize * pointPosition) - (tooltipSize / 2);
          const currentPos = parseInt(packet.tooltips[0].css('bottom'), 10);

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(Math.abs(targetPos - currentPos) < 1).to.be.true;
        });
      }
    });
  });

  describe('[updateBgLine]', () => {
    afterEach((): void => {
      $(document.body).remove('.slider');
    });

    describe('[1 point]', () => {
      for (let i = 0; i < 20; i += 1) {
        // minimum slider size 100px
        const sliderSize = Math.round(Math.random() * 1000 + 100);
        const pointPosition = Math.random();
        it(`[position: ${pointPosition}]`, () => {
          const packet = createSlider({
            sliderSize,
            viewName: 'vertical',
            points: [pointPosition],
            pointSize: 10,
          });

          $(document.body).append(packet.$slider);

          driverVertical.updateBgLine(packet.$bgLine, packet.$pointContainer, [pointPosition]);

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(
            Math.abs(packet.$bgLine.height() - (sliderSize * pointPosition)) < 1,
          ).to.be.true;
        });
      }
    });

    describe('[Many points]', () => {
      for (let i = 0; i < 20; i += 1) {
        // minimum slider size 100px
        const sliderSize = Math.round(Math.random() * 1000 + 100);

        let points: number[] = [];
        const allPoints = Math.round(Math.random() * 10 + 3);
        for (let j = 0; j < allPoints; j += 1) {
          points.push(Math.random());
        }
        points = points.sort();
        it(`[positions: (${points.join(', ')})]`, () => {
          const packet = createSlider({
            sliderSize,
            points,
            viewName: 'vertical',
            pointSize: 10,
          });

          $(document.body).append(packet.$slider);

          driverVertical.updateBgLine(
            packet.$bgLine,
            packet.$pointContainer,
            points,
          );

          const bgLineHeight = packet.$bgLine.height();
          const targetHeight = (sliderSize * (points[points.length - 1] - points[0]));

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(
            Math.abs(bgLineHeight - targetHeight) < 1,
          ).to.be.true;
        });
      }
    });
  });
});
