export class Position {
    #x;
    #y;

    constructor(x, y) {
        if (x < 0 || y < 0) throw new Error("Invalid Position");
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x
    }

    get y() {
        return this.#y
    }

    toJSON() {
        return {
            x: this.#x,
            y: this.#y,
        }
    }

    isEqual(otherPosition) {
        if (otherPosition === null || !(otherPosition instanceof Position)) {
            throw new Error("Other positions should be instance of Position");
        }
        return otherPosition.x === this.#x && otherPosition.y === this.#y;
    }

}