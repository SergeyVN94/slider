import {
    createPoint,
    createTooltip,
} from '../../desktop.blocks/slider/plugin/view/View';

const createSlider = function createSlider(config: {
    pointSize: number;
    sliderSize: number;
    points: number[];
    viewName?: 'horizontal' | 'vertical';
}): {
        $slider: JQuery;
        $bgLine: JQuery;
        $pointContainer: JQuery;
        $tooltipContainer: JQuery;
        points: JQuery[];
        tooltips: JQuery[];
    } {
    const $slider = $('<div class="slider"></div>');
    const $pointContainer = $('<div class="slider__point-container"></div>');
    const $tooltipContainer = $('<div class="slider__tooltip-container"></div>');
    const $bgLine = $('<div class="slider__bg-line"></div>');
    const tooltips: JQuery[] = [];
    const points: JQuery[] = [];

    const {
        pointSize,
        sliderSize,
        points: pointsPositions,
        viewName = 'horizontal',
    } = config;

    const pointOffset = pointSize / 2;
    const indentSide = viewName === 'horizontal' ? 'left' : 'bottom';

    pointsPositions.forEach((position, index) => {
        points.push(
            createPoint(index)
        );
        tooltips.push(
            createTooltip()
        );

        points[index]
            .css('width', `${pointSize}px`)
            .css('height', `${pointSize}px`);

        const margin = (position * sliderSize) - pointOffset;
        points[index].css(indentSide, `${margin}px`);
    });

    $slider.css(viewName === 'horizontal' ? 'width' : 'height', `${sliderSize}px`);

    if (viewName === 'vertical') {
        $slider.addClass('slider_theme_vertical');
    }

    $tooltipContainer.append(tooltips);
    $pointContainer.append(points).append($bgLine);
    $slider.append($pointContainer, $tooltipContainer);

    return {
        $slider,
        points,
        $pointContainer,
        $tooltipContainer,
        tooltips,
        $bgLine,
    };
};

export { createSlider };
