type SliderScale = CoupleNum | string[];

type PrettifyFunc = (value: string | number) => string;

type CoupleStr = [string, string];
type CoupleNum = [number, number];

type HandlerSliderSelect = (values: string[] | number[]) => void;

interface ISliderConfig {
    readonly $slider?: JQuery;
    readonly start?: string[] | number[];
    readonly scale?: SliderScale;
    readonly viewName?: ISliderViewName;
    readonly showTooltips?: boolean;
    readonly step?: number;
    readonly prettify?: PrettifyFunc;
    readonly showBgLine?: boolean;
}

