import * as $ from 'jquery';

import { createPoint } from '../../slider/plugin/view/slider-view';

interface TestSliderConfig {
    size: number;
    viewName: 'horizontal' | 'vertical';
    pointPosition: number[];
    pointSize: number;
}

interface SliderPacket {
    $slider: JQuery;
    points: JQuery[];
    tooltips: JQuery[];
    $pointContainer: JQuery;
    $tooltipContainer: JQuery;
    $bgLine: JQuery;
}

function createSlider(config: TestSliderConfig): SliderPacket {
    const $slider: JQuery = $('<div class="slider"></div>');
    const $pointContainer: JQuery = $('<div class="slider__point-container"></div>');
    const $tooltipContainer: JQuery = $('<div class="slider__tooltip-container"></div>');
    const $bgLine: JQuery = $('<div class="slider__bg-line"></div>');
    const tooltips: JQuery[] = [];
    const points: JQuery[] = [];

    const amountPoints = config.pointPosition.length;

    for (let i = 0; i < amountPoints; i++) {
        tooltips.push($('<div class="slider__tooltip"></div>'));
    }

    if (amountPoints === 1) {
        points.push(createPoint());
    } else {
        points.push(createPoint('min'));
        points.push(createPoint('max'));
    }

    let marginName = '';
    if (config.viewName === 'horizontal') {
        $slider.css('width', `${config.size}px`);
        marginName = 'left';
    } else {
        $slider.addClass('slider_theme_vertical');
        $slider.css('height', `${config.size}px`);
        marginName = 'bottom';
    }

    const psize = `${config.pointSize}px`;
    config.pointPosition.forEach((position: number, index: number): void => {
        const newPos: number = position * config.size - config.pointSize / 2;
        points[index].css(marginName, `${newPos}px`);
        points[index].css({
            width: psize,
            height: psize,
        });
    });

    $tooltipContainer.append(tooltips);
    $pointContainer.append(points).append($bgLine);
    $slider.append($pointContainer, $tooltipContainer);

    return {
        $slider: $slider,
        points: points,
        $pointContainer: $pointContainer,
        $tooltipContainer: $tooltipContainer,
        tooltips: tooltips,
        $bgLine: $bgLine,
    };
}

export { TestSliderConfig, SliderPacket, createSlider };
