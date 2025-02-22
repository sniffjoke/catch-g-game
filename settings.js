export class Settings {
    #gridSettings
    #jumpInterval
    constructor(gridSettings, jumpInterval) {
        this.#gridSettings = gridSettings;
        this.#jumpInterval = jumpInterval;
    }

    get gridSettings() {
        return this.#gridSettings;
    }

    get jumpInterval() {
        return this.#jumpInterval
    }

    // toJSON() {
    //     return {
    //         gridSettings: this.#gridSettings,
    //         jumpInterval: this.#jumpInterval,
    //     }
    // }
}