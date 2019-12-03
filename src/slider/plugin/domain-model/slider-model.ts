import { SliderModelDataManager } from './slider-data-manager';
import { calcRange, valueToPointPosition } from './slider-model-lib';
import { SliderStateHandler } from './slider-handler';

class SliderModel implements SliderModel {
    private readonly _dataManager: SliderModelDataManager;
    private readonly _stateHandler: SliderModelStateHandler;
    private readonly _updateEventCallbackList: HandlerSliderModelUpdate[];

    constructor(config: SliderModelConfig) {
        const managerConfig: SliderDataManagerConfig = {
            scale: config.scale,
            range: calcRange(config.scale, config.step),
            step: config.step,
        };

        this._dataManager = new SliderModelDataManager(managerConfig);
        this._stateHandler = new SliderStateHandler();
        this._updateEventCallbackList = [];
    }

    public get step(): number {
        return this._dataManager.step;
    }

    public set step(value: number) {
        const { scale } = this._dataManager;

        if (typeof scale[0] === 'string') {
            console.error('Cannot set step for array.');
        } else {
            let newStep = value;

            if (newStep < 1) {
                newStep = 1;
            }

            const sliderValues = this.value;
            this._dataManager.step = newStep;
            this._dataManager.range = calcRange(scale, newStep);

            if (this._setStateThroughValues(sliderValues)) {
                this._eventUpdateState();
            } else {
                console.error(new Error('Failed to set step.'));
            }
        }
    }

    public get value(): string[] | number[] {
        const state = this._stateHandler.getModelState(this._dataManager);
        return state.map((point: SliderPointState) => {
            return point.value;
        }) as string[] | number[];
    }

    public set value(values: string[] | number[]) {
        if (this._setStateThroughValues(values)) {
            this._eventUpdateState();
        }
    }

    public setState(state: SliderViewState): void {
        this._stateHandler.updateModelState(state, this._dataManager);
        this._eventUpdateState();
    }

    public onUpdate(callback: HandlerSliderModelUpdate): void {
        this._updateEventCallbackList.push(callback);
    }

    private _isPointPositionsCorrect(positions: number[]): boolean {
        let isCorrect = true;

        positions.forEach((position, index) => {
            if (index > 0 && position < positions[index - 1]) {
                isCorrect = false;
            }

            if (position < 0) {
                isCorrect = false;
            }
        });

        return isCorrect;
    }

    private _setStateThroughValues(values: string[] | number[]): boolean {
        const positions: number[] = [];

        values.forEach((val: string | number) => {
            const position: number = valueToPointPosition(val, this._dataManager);
            positions.push(position);
        });

        if (!this._isPointPositionsCorrect(positions)) {
            return false;
        }

        this._dataManager.pointPositions = positions;
        return true;
    }

    private _eventUpdateState(): void {
        for (const callback of this._updateEventCallbackList) {
            callback(this._stateHandler.getModelState(this._dataManager));
        }
    }
}

export { SliderModel };
