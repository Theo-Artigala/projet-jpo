import { gameState } from '../core/state.js';
import { saveGame } from '../core/storage.js';

export class PuzzleSystem {
    constructor(gameState, hud) {
        this.state = gameState;
        this.hud = hud;
    }

    addPoints(amount) {
        this.state.points = (this.state.points || 0) + amount;
        saveGame();
        this.hud.update();
    }

    completeChallenge(id) {
        if (!this.state.completedPuzzles.includes(id)) {
            this.state.completedPuzzles.push(id);
        }
        saveGame();
        this.hud.update();
    }
}
