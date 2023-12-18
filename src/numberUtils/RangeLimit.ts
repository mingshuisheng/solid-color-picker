export function rangeLimit(
  num: number | undefined,
  minimum: number,
  maximum: number
): number {
  if (!num) {
    return minimum;
  } else if (num < minimum) {
    return minimum;
  } else if (num > maximum) {
    return maximum;
  } else {
    return num;
  }
}
