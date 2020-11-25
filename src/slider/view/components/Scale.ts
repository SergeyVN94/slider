// import { boundMethod } from 'autobind-decorator';

// import CLASSES from '../classes';

// type MousedownCallback = (position: number) => void;

// class Scale {
//   private readonly $slider: JQuery;

//   private mousedownCallback: MousedownCallback;

//   constructor($slider: JQuery) {
//     this.$slider = $slider;
//     this.mousedownCallback = null;
//     this.$slider
//       .off('mousedown.slider.clickOnScale')
//       .on('mousedown.slider.clickOnScale', this.handleMousedown);
//   }

//   public onMousedown(callback: MousedownCallback): void {
//     this.mousedownCallback = callback;
//   }

//   public draw(viewName: ViewName, scaleItems: ScaleItem[]): void {
//     scaleItems.forEach(({ position, value }) => {
//       const $item = $('<div/>', {
//         class: `${CLASSES.SCALE_ITEM} js-${CLASSES.SCALE_ITEM}`,
//         'data-position': position,
//         text: value,
//       });

//       this.$slider.append($item);
//       $item.css(viewName === 'horizontal' ? 'left' : 'bottom', `${(position * 100)}%`);
//     });
//   }

//   @boundMethod
//   private handleMousedown(ev: JQuery.MouseDownEvent): void {
//     if (this.mousedownCallback) {
//       const $target = $(ev.target);
//       const position = parseFloat(String($target.data('position')));

//       if ($target.hasClass(CLASSES.SCALE_ITEM) && !Number.isNaN(position)) {
//         ev.stopPropagation(); // что бы не отрабатывал обработчик класса Slider
//         this.mousedownCallback(position);
//       }
//     }
//   }
// }

// export default Scale;
