import * as $ from 'jquery';

import '../slider/slider';
import CLASSES from './classes';

class DemoPanel {
    private readonly $panel: JQuery;
    private readonly $configPanel: JQuery;
    private readonly $slider: JQuery;

    constructor(config: {
        $slider: JQuery;
        $panel: JQuery;
    }) {
        const {
            $slider,
            $panel,
        } = config;

        this.$panel = $panel;
        this.$slider = $slider;
        this.$configPanel = this.$panel.find(`.${CLASSES.CONFIG_PANEL}`);
    }
}

export { DemoPanel };
