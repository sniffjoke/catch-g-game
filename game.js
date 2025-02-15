class Game {
    // constructor(game) {}

    #status = 'PENDING'
    start() {
        this.status = 'IN-PROGRESS'
    }

    getStatus() {
        return this.#status
    }

}

module.exports = {
    Game
}
