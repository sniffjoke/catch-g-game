import {Game} from "./game.js";
import {NumberUtility} from "./number-utility.js";
import {GridSettings} from "./grid-settings.js";
import {Position} from "./position.js";
import {Settings} from "./settings.js";

expect.extend({
    toBeEqualPosition(received, expected) {
        const pass = received.isEqual(expected);

        if (pass) {
            return {
                message: () => `expected Position(${received.x}, ${received.y}) not to be equal to Position(${expected.x}, ${expected.y})`,
                pass: true
            };
        } else {
            return {
                message: () => `expected Position(${received.x}, ${received.y}) to be equal to Position(${expected.x}, ${expected.y})`,
                pass: false
            }
        }
    }
})

describe('Game', () => {
    let game;

    // composition root
    function createGame() {
        const numberUtility = new NumberUtility();
        game = new Game(numberUtility);
    }

    beforeEach(async () => {
        createGame()
    })

    it('should return Pending status as initial', async () => {
        let status = await game.getStatus()
        expect(status).toBe('PENDING')
    })

    it('should return In-progress status after start', async () => {
        await game.start()
        await game.stop()
        let status = await game.getStatus()
        expect(status).toBe('IN-PROGRESS')
    })

    it('google should have random correct positions after start', async () => {
        await game.setSettings({
            gridSize: {
                rowsCount: 3,
                columnsCount: 4
            }
        })
        await game.start()
        let googlePosition = await game.getGooglePosition()
        let googlePosition2 = await game.getGooglePosition()
        await game.stop()
        // expect(googlePosition).toEqual(googlePosition2)
        expect(googlePosition).toBeEqualPosition(googlePosition2)
        expect(googlePosition.x).toBeGreaterThanOrEqual(0)
        expect(googlePosition.x).toBeLessThanOrEqual(3)
        expect(googlePosition.y).toBeGreaterThanOrEqual(0)
        expect(googlePosition.y).toBeLessThanOrEqual(2)
    })

    it('google should have random correct positions after jump interval', async () => {
        for (let i = 0; i < 10; i++) {
            createGame()
            const position = new Position(4,5)
            const gridSize = new GridSettings(position)
            const settings = new Settings(gridSize, 100)
            console.log('settings: ', settings.jumpInterval)
            await game.setSettings({
                gridSize: {
                    rowsCount: 2,
                    columnsCount: 3
                },
                jumpInterval: 100
            })
            await game.start()
            let googlePosition = await game.getGooglePosition()
            let playerFPosition = await game.getP1Position()
            let playerSPosition = await game.getP2Position()
            // console.log(
            //     `google: ${googlePosition.x} ${googlePosition.y} `,
            //     `player1: ${playerFPosition.x} ${playerFPosition.y} `,
            //     `player2: ${playerSPosition.x} ${playerSPosition.y} `,
            //     )
            await delay(100)
            let googlePosition2 = await game.getGooglePosition()
            let playerFPositionAfter = await game.getP1Position()
            let playerSPositionAfter = await game.getP2Position()
            // console.log(
            //     `googleAfter: ${googlePosition2.x} ${googlePosition2.y} `,
            //     `player1After: ${playerFPositionAfter.x} ${playerFPositionAfter.y} `,
            //     `player2After: ${playerSPositionAfter.x} ${playerSPositionAfter.y} `,
            // )
            await game.stop()
            expect(googlePosition).not.toBeEqualPosition(googlePosition2)
            expect(playerFPosition).toBeEqualPosition(playerFPositionAfter)
            expect(playerSPosition).toBeEqualPosition(playerSPositionAfter)
        }
    })


})

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

