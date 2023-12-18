export class CartesianCoordinate {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  translateX(translateX: number): CartesianCoordinate {
    return new CartesianCoordinate(this.x + translateX, this.y);
  }

  translateY(translateY: number): CartesianCoordinate {
    return new CartesianCoordinate(this.x, this.y + translateY);
  }

  translate(translateX: number, translateY: number): CartesianCoordinate {
    return new CartesianCoordinate(this.x + translateX, this.y + translateY);
  }

  inverseX(): CartesianCoordinate {
    return new CartesianCoordinate(-this.x, this.y);
  }

  inverseY(): CartesianCoordinate {
    return new CartesianCoordinate(this.x, -this.y);
  }

  inverse(): CartesianCoordinate {
    return new CartesianCoordinate(-this.x, -this.y);
  }

  toPolarCoordinate(): PolarCoordinate {
    return new PolarCoordinate(
      Math.sqrt(this.x * this.x + this.y * this.y),
      Math.atan2(this.y, this.x)
    );
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

export class PolarCoordinate {
  public theta: number;
  public rou: number;

  constructor(rou: number, theta: number = 0) {
    this.theta = theta;
    this.rou = rou;
  }

  toCartesianCoordinate(): CartesianCoordinate {
    return new CartesianCoordinate(
      this.rou * Math.cos(this.theta),
      this.rou * Math.sin(this.theta)
    );
  }

  translate(rou: number, theta: number): PolarCoordinate {
    return new PolarCoordinate(this.rou + rou, this.theta + theta);
  }

  translateTheta(theta: number): PolarCoordinate {
    return new PolarCoordinate(this.rou, this.theta + theta);
  }

  translateRou(rou: number): PolarCoordinate {
    return new PolarCoordinate(this.rou + rou, this.theta);
  }

  inverse(): PolarCoordinate {
    return new PolarCoordinate(this.rou, -this.theta);
  }

  toString() {
    return `(${this.rou}, ${this.theta})`;
  }
}
