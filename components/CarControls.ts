abstract class CarControls {
  abstract get forward(): boolean;
  abstract get left(): boolean;
  abstract get right(): boolean;
  abstract get reverse(): boolean;

  mount() {}
  unmount() {}
}

export default CarControls;
