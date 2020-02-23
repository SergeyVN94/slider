import { expect } from 'chai';
import * as $ from 'jquery';

import { createSlider } from './lib';
import DriverHorizontal from '../../desktop.blocks/slider/plugin/view/drivers/DriverHorizontal';

document.body.style.padding = '50px';

const driver: SliderViewDriver = new DriverHorizontal();

describe('[DriverHorizontal]', () => {
    describe('[getPointPosition]', () => {
        afterEach((): void => {
            $(document.body).remove('.slider');
        });

        it('[Leftmost point position]', () => {
            const packet = createSlider({
                sliderSize: 540,
                points: [0],
                pointSize: 14,
            });

            $(document.body).append(packet.$slider);

            expect(driver.getPointPosition(packet.points[0], packet.$pointContainer)).to.equal(0);
        });

        it('[Rightmost point position]', () => {
            const packet = createSlider({
                sliderSize: 640,
                points: [1],
                pointSize: 16,
            });

            $(document.body).append(packet.$slider);

            expect(driver.getPointPosition(packet.points[0], packet.$pointContainer)).to.equal(1);
        });

        describe('[Random point position]', () => {
            for (let i = 0; i < 15; i += 1) {
                const pointPosition = Math.random();
                const pointSize = Math.round(Math.random() * 10 + 5);
                // minimum slider size 100px
                const sliderSize = Math.round(Math.random() * 1000 + 100);

                it(`[position: ${pointPosition}]`, () => {
                    const packet = createSlider({
                        sliderSize,
                        pointSize,
                        points: [pointPosition],
                    });

                    $(document.body).append(packet.$slider);

                    expect(
                        Math.abs(
                            driver.getPointPosition(
                                packet.points[0],
                                packet.$tooltipContainer
                            ) - pointPosition
                        ) < 0.01
                    ).to.be.true;
                });
            }
        });
    });

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
                it(`Set random point position: ${pointPosition}`, () => {
                    const packet = createSlider({
                        pointSize,
                        sliderSize,
                        points: [0],
                    });

                    $(document.body).append(packet.$slider);
                    driver.setPointPosition(
                        packet.points[0],
                        packet.$pointContainer,
                        pointPosition
                    );

                    const targetPos = (sliderSize * pointPosition) - (pointSize / 2);
                    const currentPos = parseInt(packet.points[0].css('left'), 10);

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
                // minimum tooltip width 16px
                const tooltipSize = Math.round(Math.random() * 30 + 16);
                const pointPosition = Math.random();
                const pointSize = Math.round(Math.random() * 10 + 5);
                it(`Set random tooltip position and random size: ${pointPosition} ${tooltipSize}`, () => {
                    const packet = createSlider({
                        pointSize,
                        sliderSize,
                        points: [0],
                    });

                    $(document.body).append(packet.$slider);
                    packet.tooltips[0].css('width', `${tooltipSize}px`);
                    driver.updateTooltip(packet.tooltips[0], packet.$tooltipContainer, pointPosition, '');

                    const targetPos = sliderSize * pointPosition - tooltipSize / 2;
                    const currentPos = parseInt(packet.tooltips[0].css('left'), 10);

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
                        points: [pointPosition],
                        pointSize: 10,
                    });

                    $(document.body).append(packet.$slider);

                    driver.updateBgLine(packet.$bgLine, packet.$pointContainer, [
                        {
                            position: pointPosition,
                        },
                    ]);

                    expect(
                        Math.abs(packet.$bgLine.width() - (sliderSize * pointPosition)) < 1
                    ).to.be.true;
                });
            }
        });

        describe('2 point', () => {
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
                        pointSize: 10,
                    });

                    $(document.body).append(packet.$slider);

                    driver.updateBgLine(
                        packet.$bgLine,
                        packet.$pointContainer,
                        points.map((position) => {
                            return {
                                position,
                            };
                        })
                    );

                    const bgLineWidth = packet.$bgLine.width();
                    const targetWidth = (sliderSize * (points[points.length - 1] - points[0]));
                    expect(
                        Math.abs(bgLineWidth - targetWidth) < 1
                    ).to.be.true;
                });
            }
        });
    });
});
