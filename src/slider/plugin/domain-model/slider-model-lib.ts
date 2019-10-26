export function calcRangeOfValues(scale: SliderScale, step?: number): number {
    if (scale.type === 'array') {
        return Math.floor((scale.value.length - 1) / (step || 1));
    }

    const minMax: [number, number] = scale.value;
    return Math.floor((minMax[1] - minMax[0]) / (step || 1));
}