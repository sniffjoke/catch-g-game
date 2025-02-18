import {NumberUtility} from "./number-utility.js";


describe('NumberUtility', () => {
    let numberUtility

    beforeEach(() => {
        numberUtility = new NumberUtility();
    })

    test('should return a number between min and max (inclusive)', () => {
        for (let i = 0; i < 100; i++) {
            const min = 1;
            const max = 10;
            const randomNumber = numberUtility.getRandomNumber(min, max);
            expect(randomNumber).toBeGreaterThanOrEqual(min);
            expect(randomNumber).toBeLessThanOrEqual(max);
        }
    })

    test('should return the same value when min equals max', () => {
        const min = 5;
        const max = 5;
        const randomNumber = numberUtility.getRandomNumber(min, max);
        expect(randomNumber).toBe(min);
    })

    test('should return the same value when min queals max', () => {
        const min = -10;
        const max = -5;
        const randomNumber = numberUtility.getRandomNumber(min, max);
        expect(randomNumber).toBeGreaterThanOrEqual(min);
        expect(randomNumber).toBeLessThanOrEqual(max);
    })

})
