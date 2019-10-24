import { expect } from "chai";
import {
    createPoint
} from '../../slider/plugin/view/slider-view';

describe('slider-view', () => {
    it('no argument', () => {
        const point: JQuery = createPoint();
        expect(point.attr('data-type')).to.equal('');
    });
});

describe('slider-view', () => {
    it('type "min"', () => {
        const point: JQuery = createPoint('min');
        expect(point.attr('data-type')).to.equal('min');
    });
});

describe('slider-view', () => {
    it('type "max"', () => {
        const point: JQuery = createPoint('max');
        expect(point.attr('data-type')).to.equal('max');
    });
});