const driverHorizontal = {
  getTargetPosition(ev: JQuery.Event, $pointContainer: JQuery): number {
    const containerWidth = $pointContainer.width();
    const globalMousePosition = ev.pageX;
    const mousePosition = globalMousePosition - $pointContainer.offset().left;
    const targetPosition = mousePosition / containerWidth;

    if (targetPosition < 0) {
      return 0;
    }

    if (targetPosition > 1) {
      return 1;
    }

    return targetPosition;
  },

  setPointPosition($point: JQuery, $pointContainer: JQuery, position: number): void {
    const containerWidth = $pointContainer.outerWidth();
    const offset = $point.outerWidth() / 2;
    const marginLeft = position * containerWidth - offset;
    $point.css('left', `${marginLeft}px`);
  },

  updateTooltip(
    $tooltip: JQuery,
    $tooltipContainer: JQuery,
    position: number,
    value: string,
  ): void {
    const containerWidth = $tooltipContainer.outerWidth();

    $tooltip.html(value);

    const offset = position * containerWidth - $tooltip.outerWidth() / 2;
    $tooltip.css('left', `${offset}px`);
  },

  updateBgLine(
    $bgLine: JQuery,
    $pointContainer: JQuery,
    pointPositions: number[],
  ): void {
    const containerWidth = $pointContainer.outerWidth();
    const lastPosition = pointPositions[pointPositions.length - 1];
    const marginRight = containerWidth - (lastPosition * containerWidth);
    $bgLine.css('right', `${marginRight}px`);

    if (pointPositions.length > 1) {
      const marginLeft = (pointPositions[0] * containerWidth);
      $bgLine.css('left', `${marginLeft}px`);
    }
  },
};

export default driverHorizontal;
