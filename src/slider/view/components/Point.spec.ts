// import { expect } from 'chai';

// import '../../../slider.sass';
// import CLASSES from '../classes';

// import Point from './Point';
// import Slider from './Slider';

// const $body = $(document.body).css('padding', '50px');

// describe('[Point]', () => {
//   describe('[setPosition]', () => {
//     describe('[horizontal view]', () => {
//       const $slider = $('<div class="slider"></div>');
//       $body.html('').append($slider);
//       new Slider($slider, 'horizontal');
//       const point = new Point($slider, 0, 'horizontal');
//       const $point = $slider.find(`.${CLASSES.POINT}`);
//       $slider.css('width', '1000px');

//       [
//         { position: 0, result: 0 },
//         { position: 1, result: 100 },
//         { position: 0.333, result: 33.3 },
//         { position: 0.888, result: 88.8 },
//         { position: 0.5, result: 50 },
//       ].forEach(({ position, result }) => {
//         it(`[Position: ${position}, result: ${result}]`, () => {
//           point.setPosition(position);
//           const reallyPosition = parseInt($point.css('left'), 10);

//           // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//           expect(Math.abs(reallyPosition - result) < 1).to.be.true;
//         });
//       });
//     });

//     describe('[vertical view]', () => {
//       const $slider = $('<div class="slider"></div>');
//       $body.html('').append($slider);
//       new Slider($slider, 'vertical');
//       const point = new Point($slider, 0, 'vertical');
//       const $point = $slider.find(`.${CLASSES.POINT}`);
//       $slider.css('height', '1000px');

//       [
//         { position: 0, result: 100 },
//         { position: 1, result: 0 },
//         { position: 0.333, result: 66.4 },
//         { position: 0.888, result: 11.3 },
//         { position: 0.5, result: 50 },
//       ].forEach(({ position, result }) => {
//         it(`[Position: ${position}, result: ${result}]`, () => {
//           point.setPosition(position);
//           const reallyPosition = parseInt($point.css('top'), 10);

//           // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//           expect(Math.abs(reallyPosition - result) < 1).to.be.true;
//         });
//       });
//     });
//   });
// });
