export class Game {
    // constructor(game) {}

    #status = 'PENDING'
    #settings = {
        gridSize: {
            rows: 3,
            columns: 3,
        },
        jumpInterval: 1000
    }

    async setSettings(settings) {
        this.#settings = settings
    }

    async start() {
        this.#status = 'IN-PROGRESS'

        // setTimeout(() => {
        //     this.#status = 'LOSE'
        // }, 3000)
    }

    get status() {
        return this.#status;
    }

    async getStatus() {
        return this.#status
    }

    async getGooglePosition() {
        return {
            x: 1,
            y: 1
        }
    }

}
