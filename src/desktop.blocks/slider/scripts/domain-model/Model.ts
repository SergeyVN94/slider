import DataManager from './DataManager';
import {
    getModelValues,
    setModelValues,
    getPointPositions,
} from './lib';
import DriverScaleNumberRange from './scale-drivers/DriverScaleNumberRange';
import DriverScaleStringArray from './scale-drivers/DriverScaleStringArray';
import Core from './Core';

type SliderScale = [number, number] | string[];
type HandlerSliderModelUpdate = (pointPositions: number[]) => void;

interface ISliderModel {
    readonly value: string[] | number[];
    getPointPositions(): number[];
    update(targetPosition: number, pointIndex: number): void;
    onUpdate(callback: (pointPositions: number[]) => void): void;
}

interface ISliderModelDataManager {
    scale: SliderScale;
    scaleType: 'string' | 'number';
    pointSteps: number[];
    stepSize: number;
    steps: number;
}

interface ISliderModelStateManager {
    step: number;
    value: string[] | number[];
}

interface ISliderScaleDriver {
    getAllSteps(scale: SliderScale, stepSize: number): number;
    valueToStep(value: number | string, dataManager: ISliderModelDataManager): number;
    isCorrectStepSize(scale: SliderScale, stepSize: number): boolean;
    stepToValue(step: number, dataManager: ISliderModelDataManager): string | number | null;
}

const createSliderScale = function sliderScaleFactory(scale: SliderScale): ISliderScaleDriver {
    if (typeof scale[0] === 'number') {
        return new DriverScaleNumberRange();
    }

    return new DriverScaleStringArray();
};

class Model implements ISliderModel, ISliderModelStateManager {
    private readonly dataManager: ISliderModelDataManager;
    private readonly updateEventCallbackList: HandlerSliderModelUpdate[];
    private readonly scaleDriver: ISliderScaleDriver;
    private readonly core: Core;

    constructor(config: {
        scale: [number, number] | string[];
        start: number[] | string[];
        step: number;
    }) {
        const {
            scale,
            start,
            step: stepSize,
        } = config;

        this.scaleDriver = createSliderScale(scale);

        this.dataManager = new DataManager({
            scale,
            pointSteps: [],
            stepSize,
            steps: this.scaleDriver.getAllSteps(scale, stepSize),
        });

        this.core = new Core();

        const pointSteps: number[] = [];
        start.forEach((startValue: string | number) => pointSteps.push(
            this.scaleDriver.valueToStep(startValue, this.dataManager)
        ));

        this.dataManager.pointSteps = pointSteps;

        this.updateEventCallbackList = [];
    }

    public update(targetPosition: number, pointSelected: number): void {
        this.core.updatePointSteps(
            targetPosition,
            pointSelected,
            this.dataManager
        );
        this._toggleUpdateEvent();
    }

    public onUpdate(callback: HandlerSliderModelUpdate): void {
        this.updateEventCallbackList.push(callback);
    }

    public get step(): number {
        return this.dataManager.stepSize;
    }

    public set step(newStepSize: number) {
        const values = getModelValues(this.dataManager, this.scaleDriver);
        const { scale } = this.dataManager;

        if (this.scaleDriver.isCorrectStepSize(scale, newStepSize)) {
            this.dataManager.stepSize = newStepSize;
            this.dataManager.steps = this.scaleDriver.getAllSteps(scale, newStepSize);
            this.value = values;
        }
    }

    public get value(): string[] | number[] {
        return getModelValues(this.dataManager, this.scaleDriver);
    }

    public set value(values: string[] | number[]) {
        setModelValues(values, this.dataManager, this.scaleDriver);
        this._toggleUpdateEvent();
    }

    public getPointPositions(): number[] {
        return getPointPositions(this.dataManager);
    }

    private _toggleUpdateEvent(): void {
        this.updateEventCallbackList.forEach(
            (callback) => callback(getPointPositions(this.dataManager))
        );
    }
}

export default Model;
export {
    SliderScale,
    ISliderModel,
    ISliderModelDataManager,
    ISliderModelStateManager,
    ISliderScaleDriver,
};
