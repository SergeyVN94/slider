import { expect } from 'chai';
import * as $ from 'jquery';

import { DriverVertical } from '../../slider/plugin/view/drivers/slider-driver-vertical';
import { SliderPacket, createSlider } from './slider-tests-lib';

const driver: SliderViewDriver = new DriverVertical();

document.body.style.padding = '50px';

describe('DriverVertical driver.getPointPosition', () => {
    afterEach((): void => {
        $(document.body).remove('.slider');
    });

    it('Minimum point position', () => {
        const packet: SliderPacket = createSlider({
            size: 540,
            viewName: 'vertical',
            pointPosition: [0],
            pointSize: 14,
        });

        $(document.body).append(packet.slider);

        expect(driver.getPointPosition(packet.points[0], packet.pointContainer)).to.equal(0);
    });

    it('Maximum point position', () => {
        const packet: SliderPacket = createSlider({
            size: 640,
            viewName: 'vertical',
            pointPosition: [1],
            pointSize: 16,
        });

        $(document.body).append(packet.slider);

        expect(driver.getPointPosition(packet.points[0], packet.pointContainer)).to.equal(1);
    });

    for (let i = 0; i < 15; i++) {
        const pointPosition: number = Math.random();
        const pointSize: number = Math.round(Math.random() * 10 + 5);
        const sliderSize: number = Math.round(Math.random() * 1000 + 100); // minimum slider size 100px

        it(`Random point position: ${pointPosition}`, () => {
            const packet: SliderPacket = createSlider({
                size: sliderSize,
                viewName: 'vertical',
                pointPosition: [pointPosition],
                pointSize: pointSize,
            });

            $(document.body).append(packet.slider);

            expect(
                Math.abs(
                    driver.getPointPosition(packet.points[0], packet.pointContainer) - pointPosition
                ) < 0.01
            ).to.be.true;
        });
    }
});

describe('DriverVertical driver.setPointPosition', () => {
    afterEach((): void => {
        $(document.body).remove('.slider');
    });

    for (let i = 0; i < 15; i++) {
        const pointPosition: number = Math.random();
        const pointSize: number = Math.round(Math.random() * 10 + 5);
        const sliderSize: number = Math.round(Math.random() * 1000 + 100); // minimum slider size 100px
        it(`Set random point position: ${pointPosition}`, () => {
            const packet: SliderPacket = createSlider({
                size: sliderSize,
                viewName: 'vertical',
                pointPosition: [0],
                pointSize: pointSize,
            });

            $(document.body).append(packet.slider);
            driver.setPointPosition(packet.points[0], packet.pointContainer, pointPosition);

            const targetPos: number = sliderSize * pointPosition - pointSize / 2;
            const currentPos: number = parseInt(packet.points[0].css('bottom'), 10);

            expect(Math.abs(targetPos - currentPos) < 1).to.be.true;
        });
    }
});

describe('DriverVertical driver.updateTooltip', () => {
    afterEach((): void => {
        $(document.body).remove('.slider');
    });

    for (let i = 0; i < 20; i++) {
        const pointPosition: number = Math.random();
        const pointSize: number = Math.round(Math.random() * 10 + 5);
        const sliderSize: number = Math.round(Math.random() * 1000 + 100); // minimum slider size 100px
        const tooltipSize: number = Math.round(Math.random() * 5 + 16); // minimum tooltip height 16px
        it(`Set random tooltip position and random size: ${pointPosition} ${tooltipSize}`, () => {
            const packet: SliderPacket = createSlider({
                size: sliderSize,
                viewName: 'vertical',
                pointPosition: [0],
                pointSize: pointSize,
            });

            $(document.body).append(packet.slider);
            packet.tooltips[0].css('height', `${tooltipSize}px`);
            driver.updateTooltip(packet.tooltips[0], packet.tooltipContainer, pointPosition, '');

            const targetPos: number = sliderSize * pointPosition - tooltipSize / 2;
            const currentPos: number = parseInt(packet.tooltips[0].css('bottom'), 10);

            expect(Math.abs(targetPos - currentPos) < 1).to.be.true;
        });
    }
});

describe('DriverVertical driver.updateBgLine', () => {
    afterEach((): void => {
        $(document.body).remove('.slider');
    });

    describe('1 point', () => {
        for (let i = 0; i < 20; i++) {
            const pointPosition: number = Math.random();
            const sliderSize: number = Math.round(Math.random() * 1000 + 100); // minimum slider size 100px
            it(`Set random position: ${pointPosition}`, () => {
                const packet: SliderPacket = createSlider({
                    size: sliderSize,
                    viewName: 'vertical',
                    pointPosition: [1],
                    pointSize: 10,
                });

                $(document.body).append(packet.slider);

                driver.updateBgLine(packet.bgLine, packet.pointContainer, [
                    {
                        position: pointPosition,
                    },
                ]);

                expect(Math.abs(packet.bgLine.height() - sliderSize * pointPosition) < 1).to.be
                    .true;
            });
        }
    });

    describe('2 point', () => {
        for (let i = 0; i < 20; i++) {
            const pointPosition1: number = Math.random() * 0.5;
            const pointPosition2: number = Math.random() * 0.4 + 0.6;
            const sliderSize: number = Math.round(Math.random() * 1000 + 100); // minimum slider size 100px
            it(`Set random positions: ${pointPosition1} ${pointPosition2}`, () => {
                const packet: SliderPacket = createSlider({
                    size: sliderSize,
                    viewName: 'vertical',
                    pointPosition: [1],
                    pointSize: 10,
                });

                $(document.body).append(packet.slider);

                driver.updateBgLine(packet.bgLine, packet.pointContainer, [
                    {
                        position: pointPosition1,
                    },
                    {
                        position: pointPosition2,
                    },
                ]);

                expect(
                    Math.abs(
                        packet.bgLine.height() - sliderSize * (pointPosition2 - pointPosition1)
                    ) < 1
                ).to.be.true;
            });
        }
    });
});
