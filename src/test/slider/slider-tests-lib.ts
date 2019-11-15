import * as $ from 'jquery';
import {
    createPoint,
    createTooltip
} from '../../slider/plugin/view/slider-view';

export interface TestSliderConfig {
    size: number;
    viewName: 'horizontal' | 'vertical';
    pointPosition: number[];
    pointSize: number;
}

export interface SliderPacket {
    slider: JQuery,
    points: JQuery[],
    pointContainer: JQuery
    tooltips: JQuery[];
    bgLine: JQuery;
}

export function createSlider(config: TestSliderConfig): SliderPacket {
    const slider: JQuery = $('<div class="slider"></div>');
    const pointContainer: JQuery = $('<div class="slider__container"></div>');
    const tooltipsContainer: JQuery = $('<div class="slider__bg-line"></div>');
    const bgLine: JQuery = $('<div class="slider__bg-line"></div>'); 
    const tooltips: JQuery[] = [];
    const points: JQuery[] = [];

    for (let i = 0; i < config.pointPosition.length; i++) {
        tooltips.push($('<div class="slider__tooltip"></div>'));      
    }
    
    if (config.pointPosition.length === 1) {
        points.push(createPoint());
    } else {
        points.push(createPoint('min'));
        points.push(createPoint('max'));
    }

    let marginName = '';
    if (config.viewName === 'horizontal') {
        slider.css('width', `${config.size}px`);
        marginName = 'left';
    } else {
        slider.css('height', `${config.size}px`);
        marginName = 'bottom';
    }

    const psize = `${config.pointSize}px`;
    config.pointPosition.forEach((position: number, index: number): void => {
        const newPos: number = position * config.size - (config.pointSize / 2);
        points[index].css(marginName, `${newPos}px`);
        points[index].css({
            'width': psize,
            'height': psize
        });
    });

    tooltipsContainer.append(tooltips);
    pointContainer.append(points).append(bgLine);
    slider.append(pointContainer)
    .append(tooltipsContainer);

    return {
        slider: slider,
        points: points,
        pointContainer: pointContainer,
        tooltips: tooltips,
        bgLine: bgLine
    };
}