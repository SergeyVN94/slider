import { expect } from 'chai';

import { isStartValuesCorrect } from '../../slider/plugin/Slider';

describe('Slider isStartValuesCorrect.', () => {
    describe('Scale range number.', () => {
        const scale: SliderScale = [0, 1000];

        describe('1 value.', () => {
            it('Minimal value.', () => {
                expect(isStartValuesCorrect([0], scale)).to.be.true;
            });

            it('Maximum value.', () => {
                expect(isStartValuesCorrect([1000], scale)).to.be.true;
            });

            it('Incorrect value less than minimum.', () => {
                expect(isStartValuesCorrect([-1000], scale)).to.be.false;
            });

            it('Incorrect value greater than maximum.', () => {
                expect(isStartValuesCorrect([2000], scale)).to.be.false;
            });

            it('Incorrect value type.', () => {
                expect(isStartValuesCorrect(['ss'], scale)).to.be.false;
            });
        });

        describe('2 value.', () => {
            it('Correct minimum and maximum value.', () => {
                expect(isStartValuesCorrect(scale, scale)).to.be.true;
            });

            it('Incorrect minimum and maximum value.', () => {
                expect(isStartValuesCorrect([-1000, 2000], scale)).to.be.false;
            });

            it('Incorrect minimum and maximum value.', () => {
                expect(isStartValuesCorrect([-1000, 2000], scale)).to.be.false;
            });

            it('Incorrect minimum and correct maximum value.', () => {
                expect(isStartValuesCorrect([-1000, 777], scale)).to.be.false;
            });

            it('Incorrect maximum and correct minimum value.', () => {
                expect(isStartValuesCorrect([333, 7777], scale)).to.be.false;
            });

            it('Minimum and maximum are swapped.', () => {
                expect(isStartValuesCorrect([888, 222], scale)).to.be.false;
            });

            it('Incorrect value types.', () => {
                expect(isStartValuesCorrect(['s', 'M'], scale)).to.be.false;
            });
        });
    });

    describe('Scale string array.', () => {
        const scale: SliderScale = ['a', 'B', 'c', 'D'];

        describe('1 value.', () => {
            it('Correct value.', () => {
                expect(isStartValuesCorrect(['B'], scale)).to.be.true;
            });

            it('Incorrect value.', () => {
                expect(isStartValuesCorrect(['b'], scale)).to.be.false;
            });

            it('Incorrect value type.', () => {
                expect(isStartValuesCorrect([888], scale)).to.be.false;
            });
        });

        describe('2 value.', () => {
            it('Correct minimum and maximum value.', () => {
                expect(isStartValuesCorrect(['B', 'D'], scale)).to.be.true;
            });

            it('Incorrect minimum and maximum value.', () => {
                expect(isStartValuesCorrect(['f', 'y'], scale)).to.be.false;
            });

            it('Incorrect minimum and correct maximum value.', () => {
                expect(isStartValuesCorrect(['m', 'D'], scale)).to.be.false;
            });

            it('Incorrect maximum and correct minimum value.', () => {
                expect(isStartValuesCorrect(['c', 'h'], scale)).to.be.false;
            });

            it('Minimum and maximum are swapped.', () => {
                expect(
                    isStartValuesCorrect([scale[scale.length - 1], scale[0]], scale)
                ).to.be.false;
            });

            it('Incorrect value types.', () => {
                expect(isStartValuesCorrect([11, 333], scale)).to.be.false;
            });
        });
    });
});
