// Importer tous les modules
import { BrowserSystem } from './systems/browser.js';
import { FileSystem } from './systems/fileSystem.js';
import { MailSystem } from './systems/mail.js';
import { TerminalSystem } from './systems/terminal.js';
import { PuzzleSystem } from './systems/puzzles.js';
import { Taskbar } from './ui/taskbar.js';
import { HUD } from './ui/hud.js';
import { WindowManager } from './ui/windows.js';

// État du jeu
const gameState = {
    points: 0,
    completedPuzzles: [],
    badges: [],
    currentLevel: 1,
    filesystem: {
        desktop: [
            { id: 'file-1', name: 'notes.txt', type: 'text', size: 2048, content: 'Mes notes personnelles\nLignes de notes...' },
            { id: 'file-2', name: 'image.jpg', type: 'image', size: 51200, content: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNjY2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIi8+PHRleHQgeD0iNTAiIHk9IjUwIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZmZmIiBkeT0iLjNlbSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2U8L3RleHQ+PC9zdmc+' },
            { id: 'file-3', name: 'données.txt', type: 'text', size: 1024, content: 'Données importantes\nValeur: 42' }
        ],
        documents: [
            { id: 'file-4', name: 'rapport.txt', type: 'text', size: 4096, content: 'Rapport Technique\nVersion 1.0\nCe rapport contient...' }
        ],
        downloads: [],
        recycle: []
    }
};

// Systèmes
let browserSystem;
let fileSystem;
let mailSystem;
let terminalSystem;
let puzzleSystem;

// Sauvegarde
function saveGame() {
    localStorage.setItem('hackschool-state', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('hackschool-state');
    if (saved) Object.assign(gameState, JSON.parse(saved));
}

// Instances globales
const hud = new HUD(gameState);
const taskbar = new Taskbar(gameState);
const windowManager = new WindowManager();

// Fonctions publiques
window.openApp = function(appId) {
    const windowEl = windowManager.windows[appId];
    
    // Si la fenêtre existe déjà
    if (windowEl) {
        const isVisible = windowEl.style.display !== 'none';
        windowManager.toggleWindow(appId, !isVisible);
        return;
    }
    
    // Créer une nouvelle fenêtre
    const configs = {
        browser: { title: 'Navigateur', icon: 'assets/icons/icon-browser.svg', width: 900, height: 600 },
        explorer: { title: 'Explorateur', icon: 'assets/icons/icon-files.svg', width: 800, height: 500 },
        terminal: { title: 'Terminal', icon: 'assets/icons/icon-terminal.svg', width: 700, height: 400 },
        mail: { title: 'Mail', icon: 'assets/icons/icon-mail.svg', width: 850, height: 550 },
        recycleBin: { title: 'Corbeille', icon: 'assets/icons/icon-recycle.svg', width: 700, height: 450 }
    };
    
    const config = configs[appId];
    if (!config) return;
    
    if (appId === 'browser') {
        const html = browserSystem.renderUI();
        windowManager.createWindow(appId, config.title, config.width, config.height, html, config.icon);
        // Attendre que le DOM soit prêt
        setTimeout(() => {
            if (browserSystem.tabs.length === 0) {
                browserSystem.addTab('home');
            }
            browserSystem.renderTabs();
        }, 50);
    } else if (appId === 'explorer') {
        const html = fileSystem.renderUI();
        windowManager.createWindow(appId, config.title, config.width, config.height, html, config.icon);
    } else if (appId === 'terminal') {
        const html = terminalSystem.renderUI();
        windowManager.createWindow(appId, config.title, config.width, config.height, html, config.icon);
    } else if (appId === 'mail') {
        const html = mailSystem.renderUI();
        windowManager.createWindow(appId, config.title, config.width, config.height, html, config.icon);
    } else if (appId === 'recycleBin') {
        const html = fileSystem.renderRecycleBin();
        windowManager.createWindow(appId, config.title, config.width, config.height, html, config.icon);
    }
};

// Fonctions du système de fichiers
window.fileSystemNav = function(folder) {
    fileSystem.currentFolder = folder;
    const html = fileSystem.renderUI();
    const contentDiv = document.querySelector('#win-explorer .window-content');
    if (contentDiv) contentDiv.innerHTML = html;
};

window.showFileInfo = function(fileId) {
    const file = fileSystem.findFileById(fileId);
    if (!file) return;
    
    hud.showToast(`${file.name} • ${(file.size / 1024).toFixed(1)} KB • ${file.type}`);
};

window.showFileMenu = function(fileId, fileName, fileType) {
    const file = fileSystem.findFileById(fileId);
    if (!file) return;
    
    // Menu contextuel simple
    const menu = confirm(`${fileName}\n\nCopier (OK) ou Supprimer (Annuler)?`);
    if (menu) {
        fileSystem.copyFile(fileId);
        hud.showToast(`Fichier copié: ${fileName}`);
    } else {
        fileSystem.deleteFile(fileId);
        hud.showToast(`Fichier supprimé: ${fileName}`);
        window.fileSystemNav(fileSystem.currentFolder);
    }
};

window.restoreFile = function(fileId) {
    fileSystem.restoreFile(fileId);
    const html = fileSystem.renderRecycleBin();
    const contentDiv = document.querySelector('#win-recycleBin .window-content');
    if (contentDiv) contentDiv.innerHTML = html;
    hud.showToast('Fichier restauré');
};

window.desktopUI = {
    openApplication: window.openApp
};

// Initialisation
document.addEventListener('DOMContentLoaded', async () => {
    loadGame();
    
    // Charger les données depuis users.json
    try {
        const response = await fetch('data/users.json');
        const userData = await response.json();
        Object.assign(gameState, userData);
    } catch (e) {
        console.warn('Impossible de charger users.json', e);
    }
    
    // Initialiser les systèmes
    browserSystem = new BrowserSystem(gameState);
    fileSystem = new FileSystem(gameState);
    mailSystem = new MailSystem(gameState);
    terminalSystem = new TerminalSystem(gameState);
    puzzleSystem = new PuzzleSystem(gameState, hud);
    
    // Ajouter un onglet initial au navigateur
    browserSystem.addTab('home');
    
    console.log('✅ HackSchool chargé!', gameState);
    
    // Mise à jour clock
    setInterval(() => {
        const now = new Date();
        const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        const clock = document.getElementById('taskbar-clock');
        if (clock) clock.textContent = time;
    }, 1000);
});

// Auto-save
setInterval(() => saveGame(), 30000);
