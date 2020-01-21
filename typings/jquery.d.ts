interface JQuery {
    slider(this: JQuery, command: 'init', config: {
        readonly start?: string[] | number[];
        readonly scale?: [number, number] | string[];
        readonly viewName?: 'horizontal' | 'vertical';
        readonly showTooltips?: boolean;
        readonly step?: number;
        readonly prettify?: (value: string | number) => string;
        readonly showBgLine?: boolean;
    }): JQuery;

    slider(
        this: JQuery,
        command: 'step'
    ): number;
    slider(
        this: JQuery,
        command: 'step',
        step: number
    ): JQuery;

    slider(
        this: JQuery,
        command: 'value'
    ): string[] | number[];
    slider(
        this: JQuery,
        command: 'value',
        value: string[] | number[]
    ): JQuery;

    slider(
        this: JQuery,
        command: 'showTooltips'
    ): boolean;
    slider(
        this: JQuery,
        command: 'showTooltips',
        isShow: boolean
    ): JQuery;
}
