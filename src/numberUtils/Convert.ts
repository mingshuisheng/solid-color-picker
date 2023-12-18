export function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

export function toDegrees(radians: number) {
  let degrees = radians * (180 / Math.PI);
  return (degrees < 0 ? degrees + 360 : degrees) % 360;
}
