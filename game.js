import {Position} from "./position.js";
import {Player} from "./unit.js";

export class Game {
    #status = 'PENDING'
    #settings = {
        gridSize: {
            rowsCount: 3,
            columnsCount: 3,
        },
        jumpInterval: 100
    }

    #numberUtility;
    #googlePosition;

    #intervalId = null

    #player1;
    #player2;

    // dependency injection
    constructor(numberUtility) {
        this.#numberUtility = numberUtility;
    }

    #getRandomPosition = async () => {
        return new Position(
            await this.#numberUtility.getRandomNumber(0, this.#settings.gridSize.columnsCount - 1),
            await this.#numberUtility.getRandomNumber(0, this.#settings.gridSize.rowsCount - 1)
        );
    };

    async setSettings(settings) {
        this.#settings = settings
    }

    #jumpGoogle = async () => {
        // create new position
        const newPosition = await this.#getRandomPosition()

        // recourse
        // check new position
        if (
            !!this.#googlePosition && newPosition.isEqual(this.#googlePosition)  ||
            this.#player1 && newPosition.isEqual(this.#player1.position) ||
            this.#player2 && newPosition.isEqual(this.#player2.position)
        ) {
            return await this.#jumpGoogle()
        }

        this.#googlePosition = newPosition
    }

    #googleJumpInterval = async () => {
        this.#intervalId = setInterval(async () => {
            await this.#jumpGoogle()
        }, this.#settings.jumpInterval);
    }

    #createPlayers = async () => {
        const positionP1 = await this.#getRandomPosition()
        if (!!this.#googlePosition && positionP1.isEqual(this.#googlePosition)) {
            return await this.#createPlayers()
        }

        const positionP2 = await this.#getRandomPosition()

        if (!!this.#googlePosition && (positionP2.isEqual(this.#googlePosition) || positionP2.isEqual(positionP1))) {
            return await this.#createPlayers()
        }

        // console.log('googlePos: ', this.#googlePosition.x, this.#googlePosition.y)
        // console.log('pos1: ', positionP1.x, positionP1.y)
        // console.log('pos2: ', positionP2.x, positionP2.y)
        this.#player1 = new Player(1, positionP1);
        this.#player2 = new Player(2, positionP2);
    }

    async start() {
        this.#status = 'IN-PROGRESS';
        await this.#jumpGoogle();
        // SLAP ("Принцип единого уровня абстракции" (Single Level of Abstraction Principle))
        await this.#googleJumpInterval();
        await this.#createPlayers()
    }

    stop() {
        if (this.#intervalId) {
            clearInterval(this.#intervalId);
            this.#intervalId = null;
        }
    }

    async getStatus() {
        return this.#status
    }

    async getGooglePosition() {
        return this.#googlePosition
    }

    async getP1Position() {
        return this.#player1.position
        // return {
        //     x: this.#player1.position.x,
        //     y: this.#player1.position.y
        // }
    }

    async getP2Position() {
        return this.#player2.position
    }

}
