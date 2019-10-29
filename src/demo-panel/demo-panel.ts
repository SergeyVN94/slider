import '../slider/slider';

interface DemoPanelCallback {
    (value: string | CoupleStr | number | CoupleNum): void;
}

interface DemoPanelCallbackShowValue {
    (value: boolean): void;
}

export class DemoPanel {
    private readonly _panel: JQuery;
    private readonly _inputs: JQuery;
    private readonly _mode: 'single' | 'range';
    private readonly _showValue: JQuery;

    constructor(panel: JQuery) {
        this._panel = panel;
        this._mode = this._panel.attr('data-mode') as 'single' | 'range';
        this._inputs = panel.find('.demo-panel__input-value');
        this._showValue = panel.find('.demo-panel__show-value');
    }

    public onChangeValue(callback: DemoPanelCallback): void {
        this._inputs.focusout(() => {
            if (this._mode === 'single') {
                callback(String(this._inputs.val() as string));
            } else {
                callback([
                    this._inputs.find('[data-type="min"]').val() as string,
                    this._inputs.find('[data-type="max"]').val() as string
                ]);
            }
        });
    }

    public setValue(value: string | CoupleStr | number | CoupleNum): void {
        if (typeof value === 'string' || typeof value === 'number') {
            this._inputs.val(value);
        } else {
            this._inputs.find('[data-type="min"]').val(value[0]);
            this._inputs.find('[data-type="min"]').val(value[1]);
        }
    }

    public onShowValue(callback: DemoPanelCallbackShowValue): void {
        this._showValue.change((): void => {
            callback(this._showValue.is(':checked'));
        });
    }
}