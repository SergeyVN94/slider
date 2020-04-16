import DataManager from './DataManager';
import {
    getModelValues,
    setModelValues,
    getPointStates,
} from './lib';
import DriverScaleNumberRange from './scale-drivers/DriverScaleNumberRange';
import DriverScaleStringArray from './scale-drivers/DriverScaleStringArray';
import Core from './Core';

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

    public update(state: SliderViewState): void {
        this.core.updatePointSteps(state, this.dataManager);
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

    public getPointStates(): SliderPointState[] {
        return getPointStates(this.dataManager, this.scaleDriver);
    }

    private _toggleUpdateEvent(): void {
        const pointStates = getPointStates(this.dataManager, this.scaleDriver);
        this.updateEventCallbackList.forEach((callback) => callback(pointStates));
    }
}

export default Model;
