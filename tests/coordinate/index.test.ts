import { describe, expect, it } from "vitest";
import { CartesianCoordinate, PolarCoordinate } from "../../src/coordinate";
import { toDegrees } from "../../src/numberUtils";

describe("coordinate", () => {
  it("Cartesian Coordinate convert to Polar Coordinate", () => {
    const cartesianCoordinate = new CartesianCoordinate(11, 100);

    expect(
      cartesianCoordinate.toPolarCoordinate().toString()
    ).toMatchInlineSnapshot(`"(100.60318086422517, 1.4612368000209524)"`);
  });

  it("Polar Coordinate convert to Cartesian Coordinate", () => {
    const polarCoordinate = new PolarCoordinate(
      1.4612368000209524,
      100.60318086422517
    );

    expect(
      polarCoordinate.toCartesianCoordinate().toString()
    ).toMatchInlineSnapshot(`"(1.45742817597921, 0.10543290566699692)"`);
  });

  it("theta to angle", () => {
    const cartesianCoordinate = new CartesianCoordinate(-1, -1);
    const polarCoordinate = cartesianCoordinate.toPolarCoordinate();
    expect(toDegrees(polarCoordinate.theta)).toMatchInlineSnapshot(`225`);
  });
});
