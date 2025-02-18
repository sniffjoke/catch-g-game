export class Game {
    #status = 'PENDING'
    #settings = {
        gridSize: {
            rowsCount: 3,
            columnsCount: 3,
        },
        jumpInterval: 1000
    }

    #numberUtility;
    #googlePosition;

    // dependency injection
    constructor(numberUtility) {
        this.#numberUtility = numberUtility;
    }

    async setSettings(settings) {
        this.#settings = settings
    }

    async #jumpGoogle() {
        // create new position
        const newPosition = {
            x: this.#numberUtility.getRandomNumber(0, this.#settings.gridSize.columnsCount - 1),
            y: this.#numberUtility.getRandomNumber(0, this.#settings.gridSize.rowsCount - 1),
        }

        // recourse
        // check new position
        if (newPosition.x === this.#googlePosition?.x &&
            newPosition.y === this.#googlePosition?.y) {
            return this.#jumpGoogle()
        }

        this.#googlePosition = newPosition
    }

    async #googleJumpInterval() {
        setInterval(async () => {
            await this.#jumpGoogle()
        }, this.#settings.jumpInterval);
    }

    async start() {
        this.#status = 'IN-PROGRESS';
        await this.#jumpGoogle();
        // SLAP ("Принцип единого уровня абстракции" (Single Level of Abstraction Principle))
        await this.#googleJumpInterval();
    }

    async getStatus() {
        return this.#status
    }

    async getGooglePosition() {
        return this.#googlePosition
    }

}
