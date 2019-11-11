// import { expect } from "chai";
// import * as $ from 'jquery';
// import {
//     createPoint,
//     createTooltip
// } from '../../slider/plugin/view/slider-view';
// import {DriverHorizontal} from '../../slider/plugin/view/drivers/slider-driver-horizontal';

// interface TestSliderConfig {
//     size: number;
//     viewName: 'horizontal' | 'vertical';
//     pointPosition: number[];
//     pointSize: number;
// }

// interface SliderPacket {
//     slider: JQuery,
//     points: JQuery[],
//     pointContainer: JQuery
// }

// function createSlider(config: TestSliderConfig): SliderPacket {
//     const slider: JQuery = $(
//         `<div class="slider">
//             <div class="slider__tooltips-container"></div>
//         </div>`
//     );

//     const container: JQuery = $('<div class="slider__container"></div>');
//     slider.append(container);

//     const points: JQuery[] = [];
//     if (config.pointPosition.length === 1) {
//         points.push(createPoint());
//     } else {
//         points.push(createPoint('min'));
//         points.push(createPoint('max'));
//     }

//     let marginName = '';
//     if (config.viewName === 'horizontal') {
//         slider.css('width', `${config.size}px`);
//         marginName = 'left';
//     } else {
//         slider.css('height', `${config.size}px`);
//         marginName = 'bottom';
//     }

//     config.pointPosition.forEach((position: number, index: number): void => {
//         const newPos: number = position * config.size - (config.pointSize / 2);
//         points[index].css(marginName, `${newPos}px`);
//     });

//     slider.append(points);

//     return {
//         slider: slider,
//         points: points,
//         pointContainer: container
//     };
// }

// const driver: SliderViewDriver = new DriverHorizontal();

// describe('driver.getPointPosition', () => {
//     it('Get point position on horizontal slider', () => {
//         console.dir(document);
//         console.log(document.querySelector('.slider'));
//         const packet: SliderPacket = createSlider({
//             size: 540,
//             viewName: 'horizontal',
//             pointPosition: [0.345],
//             pointSize: 14
//         });
//         console.dir(packet);
//         const position: number = driver.getPointPosition(
//             packet.points[0],
//             packet.pointContainer
//         );
//         expect(position).to.equal(0.332037037);
//     });
// });