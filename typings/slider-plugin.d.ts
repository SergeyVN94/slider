interface SliderPluginFunction {
    (
        this: JQuery,
        command: 'init',
        config: {
            readonly start?: string[] | number[];
            readonly scale?: SliderScale;
            readonly viewName?: SliderViewName;
            readonly showTooltips?: boolean;
            readonly step?: number;
            readonly prettify?: PrettifyFunc;
            readonly showBgLine?: boolean;
        }
    ): JQuery;
    (
        this: JQuery,
        command: 'step'
    ): number;
    (
        this: JQuery,
        command: 'step',
        step: number
    ): JQuery;
    (
        this: JQuery,
        command: 'value'
    ): string[] | number[];
    (
        this: JQuery,
        command: 'value',
        value: string[] | number[]
    ): JQuery;
    (
        this: JQuery,
        command: 'showTooltips'
    ): boolean;
    (
        this: JQuery,
        command: 'showTooltips',
        isShow: boolean
    ): JQuery;
    (
        this: JQuery,
        command: 'viewName'
    ): 'horizontal' | 'vertical';
    (
        this: JQuery,
        command: 'viewName',
        isShow: 'horizontal' | 'vertical'
    ): JQuery;
    (
        this: JQuery,
        command: 'bg-line'
    ): boolean;
    (
        this: JQuery,
        command: 'bg-line',
        isShow: boolean
    ): JQuery;
}
