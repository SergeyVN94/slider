import { expect } from "chai";
import {Slider} from '../../slider/slider';

let i: number = 10;
while(i--) {
    describe('Slider', () => {
        it('abc', () => {
            const a: string = String(Math.round(Math.random() * 1000));
            expect(a).to.equal(a);
        });
    });
}