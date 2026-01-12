// État centralisé du jeu
export const gameState = {
    points: 0,
    badges: [],
    completedPuzzles: [],
    filesystem: {},
    mailbox: {},
    browserState: { tabs: [], activeTab: null }
};

// Pas de copie-colle! Une seule source de vérité
export function getGameState() {
    return gameState;
}
