import { gameState } from './state.js';

export function saveGame() {
    localStorage.setItem('game_state', JSON.stringify(gameState));
}

export function loadGame() {
    const saved = localStorage.getItem('game_state');
    if (saved) Object.assign(gameState, JSON.parse(saved));
}
