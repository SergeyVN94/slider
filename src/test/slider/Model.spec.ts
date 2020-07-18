import { expect } from 'chai';
import Model from '../../components/slider/scripts/domain-model/Model';

describe('[Model]', () => {
  describe('[update]', () => {
    describe('[1 point]', () => {
      describe('[step size 1]', () => {
        const model = new Model({
          step: 1,
          scale: [-1000, 1000], // maxStep = 2000
          start: [0],
        });

        [
          { targetPos: 0, result: [-1000] },
          { targetPos: 1, result: [1000] },
          { targetPos: 0.345, result: [-310] },
          { targetPos: 0.754, result: [508] },
          { targetPos: 0.973, result: [946] },
        ].forEach(({ targetPos, result }) => {
          it(`[targetPos: ${targetPos}, result: [${result.join()}]]`, () => {
            model.values = [0];

            model.update(targetPos, -1);

            let isCorrectValues = true;
            model.values.forEach((value, index) => {
              if (value !== result[index]) isCorrectValues = false;
            });

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(isCorrectValues).to.be.true;
          });
        });
      });
      describe('[step size 333]', () => {
        const model = new Model({
          step: 333,
          scale: [-1000, 1000], // maxStep = 2000
          start: [0],
        });

        [
          { targetPos: 0, result: [-1000] },
          { targetPos: 1, result: [1000] },
          { targetPos: 0.345, result: [-334] },
          { targetPos: 0.754, result: [665] },
          { targetPos: 0.973, result: [998] },
          { targetPos: 0.995, result: [998] },
        ].forEach(({ targetPos, result }) => {
          it(`[targetPos: ${targetPos}, result: [${result.join()}]]`, () => {
            model.values = [0];

            model.update(targetPos, -1);

            let isCorrectValues = true;
            model.values.forEach((value, index) => {
              if (value !== result[index]) isCorrectValues = false;
            });

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(isCorrectValues).to.be.true;
          });
        });
      });
    });
    describe('[2 point]', () => {
      const model = new Model({
        step: 1,
        scale: [-1000, 1000], // maxStep = 2000
        start: [0, 0],
      });

      [
        { targetPos: 0, result: [-1000, 1000] },
        { targetPos: 1, result: [-1000, 1000] },
        { targetPos: 0.345, result: [-310, 1000] },
        { targetPos: 0.5, result: [0, 1000] },
        { targetPos: 0.754, result: [-1000, 508] },
        { targetPos: 0.973, result: [-1000, 946] },
      ].forEach(({ targetPos, result }) => {
        it(`[targetPos: ${targetPos}, result: [${result.join()}]]`, () => {
          model.values = [-1000, 1000];

          model.update(targetPos, -1);

          let isCorrectValues = true;
          model.values.forEach((value, index) => {
            if (value !== result[index]) isCorrectValues = false;
          });

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(isCorrectValues).to.be.true;
        });
      });
    });
    describe('[2 point, witch a specific point]', () => {
      const model = new Model({
        step: 1,
        scale: [-1000, 1000], // maxStep = 2000
        start: [0, 0],
      });

      [
        {
          values: [-1000, 1000], point: 0, targetPos: 0, result: [-1000, 1000],
        },
        {
          values: [-1000, 1000], point: 0, targetPos: 1, result: [1000, 1000],
        },
        {
          values: [-1000, 1000], point: 1, targetPos: 0, result: [-1000, -1000],
        },
        {
          values: [-1000, 1000], point: 1, targetPos: 1, result: [-1000, 1000],
        },
        {
          values: [-555, 555], point: 0, targetPos: 1, result: [555, 555],
        },
        {
          values: [-555, 555], point: 1, targetPos: 0, result: [-555, -555],
        },
      ].forEach(({
        targetPos,
        result,
        values,
        point,
      }) => {
        it(`[values: [${values.join()}], point: ${point}, targetPos: ${targetPos}, result: [${result.join()}]]`, () => {
          model.values = values;

          model.update(targetPos, point);

          let isCorrectValues = true;
          model.values.forEach((value, index) => {
            if (value !== result[index]) isCorrectValues = false;
          });

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(isCorrectValues).to.be.true;
        });
      });
    });
  });
});
