//Force class
class Force {
  public magnitude: number;
  public direction: number;

  constructor(magnitude: number, direction: number) {
    this.magnitude = magnitude;
    this.direction = direction;
  }

  public getMagnitude(): number {
    return this.magnitude;
  }

  public getDirection(): number {
    return this.direction;
  }
}

//Mass class
class Mass {
  public value: number;

  constructor(value: number) {
    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }
}

//Qubit class
class Qubit {
  public state: number;

  constructor(state: number) {
    this.state = state;
  }

  public getState(): number {
    return this.state;
  }

  public setState(state: number): void {
    this.state = state;
  }
}

//Simulates quantum entanglement
class Entanglement {
  private qubit1: Qubit;
  private qubit2: Qubit;

  constructor(qubit1: Qubit, qubit2: Qubit) {
    this.qubit1 = qubit1;
    this.qubit2 = qubit2;
  }

  public getQubit1(): Qubit {
    return this.qubit1;
  }

  public getQubit2(): Qubit {
    return this.qubit2;
  }

  public setQubit1(qubit1: Qubit): void {
    this.qubit1 = qubit1;
  }

  public setQubit2(qubit2: Qubit): void {
    this.qubit2 = qubit2;
  }

  //New methods
  public applyNewtonsThreeLaws(force: Force, mass: Mass): number {
    //First law: A body at rest will remain at rest, and a body in motion will remain in motion unless it is acted upon by an external force
    if (this.qubit1.getState() === 0 && this.qubit2.getState() === 0) { //Quibit is at rest
      this.qubit1.setState(0);
      this.qubit2.setState(0);
    } else if (this.qubit1.getState() === 1 && this.qubit2.getState() === 1) { //Quibit is in motion
      this.qubit1.setState(1);
      this.qubit2.setState(1);
    }

    //Second law: Force is equal to the rate of change of momentum
    if (this.qubit1.getState() === 1 && this.qubit2.getState() === 0) { //Force is applied to quibit
      this.qubit1.setState(0);
      this.qubit2.setState(1);
    }

    //Third law: For every action, there is an equal and opposite reaction
    if (this.qubit1.getState() === 0 && this.qubit2.getState() === 1) { //Reaction to force is applied to quibit
      this.qubit1.setState(1);
      this.qubit2.setState(0);
    }

    //Calculate acceleration
    let acceleration = force.getMagnitude() / mass.getValue();
    return acceleration;
  }
}

//Now solve the given problem
let force = new Force(1150, 0); //Force of 1150N acting parallel to a ramp
let mass = new Mass(250); //Mass of 250kg
let qubit1 = new Qubit(1); //Qubit 1 is in motion
let qubit2 = new Qubit(0); //Qubit 2 is at rest
let entanglement = new Entanglement(qubit1, qubit2);

//No friction
let accelerationNoFriction = entanglement.applyNewtonsThreeLaws(force, mass);
console.log("Acceleration with no friction: " + accelerationNoFriction);

//With friction
let frictionForce = new Force(120, 0); //Friction force of 120N
let accelerationWithFriction = entanglement.applyNewtonsThreeLaws(force, mass) - entanglement.applyNewtonsThreeLaws(frictionForce, mass);
console.log("Acceleration with friction: " + accelerationWithFriction);