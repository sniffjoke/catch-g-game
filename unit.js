class Unit {
    constructor(position) {
        this.position = position;
    }
}

export class Player extends Unit {
    constructor(id, position) {
        super(position);
        this.id = id
    }
}