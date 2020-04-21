import ConfigPanel from './ConfigPanel';

const initConfigPanel = function initConfigPanel($panel: JQuery, $slider: JQuery): void {
  new ConfigPanel($panel, $slider);
};

export default initConfigPanel;
