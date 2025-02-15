import {Game} from "./game.js";


describe('game test', () => {
    it('first test', () => {
        const game = new Game()
        expect(game.status).toBe('PENDING')
    })
})

// import {Game} from "./game.js";
//
// const game = new Game();
//
// console.log(game.getStatus())
