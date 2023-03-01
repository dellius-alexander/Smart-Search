class Force {
    constructor(magnitude, direction) {
        this.magnitude = magnitude;
        this.direction = direction;
    }
    getMagnitude() {
        return this.magnitude;
    }
    getDirection() {
        return this.direction;
    }
}
class Mass {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
class Qubit {
    constructor(state) {
        this.state = state;
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }
}
class Entanglement {
    constructor(qubit1, qubit2) {
        this.qubit1 = qubit1;
        this.qubit2 = qubit2;
    }
    getQubit1() {
        return this.qubit1;
    }
    getQubit2() {
        return this.qubit2;
    }
    setQubit1(qubit1) {
        this.qubit1 = qubit1;
    }
    setQubit2(qubit2) {
        this.qubit2 = qubit2;
    }
    applyNewtonsThreeLaws(force, mass) {
        if (this.qubit1.getState() === 0 && this.qubit2.getState() === 0) {
            this.qubit1.setState(0);
            this.qubit2.setState(0);
        }
        else if (this.qubit1.getState() === 1 && this.qubit2.getState() === 1) {
            this.qubit1.setState(1);
            this.qubit2.setState(1);
        }
        if (this.qubit1.getState() === 1 && this.qubit2.getState() === 0) {
            this.qubit1.setState(0);
            this.qubit2.setState(1);
        }
        if (this.qubit1.getState() === 0 && this.qubit2.getState() === 1) {
            this.qubit1.setState(1);
            this.qubit2.setState(0);
        }
        let acceleration = force.getMagnitude() / mass.getValue();
        return acceleration;
    }
}
let force = new Force(1150, 0);
let mass = new Mass(250);
let qubit1 = new Qubit(1);
let qubit2 = new Qubit(0);
let entanglement = new Entanglement(qubit1, qubit2);
let accelerationNoFriction = entanglement.applyNewtonsThreeLaws(force, mass);
console.log("Acceleration with no friction: " + accelerationNoFriction);
let frictionForce = new Force(120, 0);
let accelerationWithFriction = entanglement.applyNewtonsThreeLaws(force, mass) - entanglement.applyNewtonsThreeLaws(frictionForce, mass);
console.log("Acceleration with friction: " + accelerationWithFriction);
//# sourceMappingURL=force.js.map