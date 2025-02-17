import {Game} from "./game.js";


describe('Game', () => {
    let game;

    beforeEach(async () => {
        game = new Game();
    })

    it('should return Pending status as initial', async () => {
        let status = await game.getStatus()
        expect(status).toBe('PENDING')
    })

    it('should return In-progress status after start', async () => {
        await game.start()
        let status = await game.getStatus()
        expect(status).toBe('IN-PROGRESS')
    })

    // it('should lose after 3 seconds', async () => {
    //     await game.start()
    //     await delay(3000)
    //     let status = await game.getStatus()
    //     expect(status).toBe('LOSE')
    // })

    it('google should have random correct positions after start', async () => {
        await game.setSettings({
            gridSize: {
                rowsCount: 3,
                columnsCount: 4
            }
        })
        await game.start()
        let googlePosition = await game.getGooglePosition()
        expect(googlePosition.x).toBeGreaterThanOrEqual(0)
        expect(googlePosition.x).toBeLessThanOrEqual(3)
        expect(googlePosition.y).toBeGreaterThanOrEqual(0)
        expect(googlePosition.y).toBeLessThanOrEqual(2)
    })

})

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// import {Game} from "./game.js";
//
// const game = new Game();
//
// let status = await game.getStatus();
// console.log('status: ', status)
//
// // console.log(game.getStatus())
//
// game.start();
//
// status = await game.getStatus()
// console.log('status: ', status)
