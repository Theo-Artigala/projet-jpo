// Configuration globale du jeu
export const CONFIG = {
    GAME_NAME: 'HackSchool',
    VERSION: '1.0',
    
    // Points
    POINTS: {
        PUZZLE_1: 100,
        PUZZLE_2: 250,
        PUZZLE_3: 300,
        PUZZLE_4: 500,
        PUZZLE_5: 1500
    },
    
    // Windows
    WINDOWS: {
        explorer: { title: 'Explorateur de Fichiers', width: 800, height: 500 },
        browser: { title: 'Navigateur', width: 900, height: 600 },
        mail: { title: 'Mail', width: 850, height: 550 },
        terminal: { title: 'Terminal', width: 700, height: 400 },
        textViewer: { title: 'Éditeur Texte', width: 600, height: 400 },
        recycleBin: { title: 'Corbeille', width: 700, height: 450 }
    },
    
    // Fileystem
    DEFAULT_FOLDER: 'Desktop',
    
    // Colors
    COLORS: {
        primary: '#0f4c81',
        success: '#0f0',
        error: '#f00',
        warning: '#ff0'
    }
};
