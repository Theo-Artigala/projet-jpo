import { CONFIG } from '../core/config.js';

export class TerminalSystem {
    constructor(gameState) {
        this.state = gameState;
        this.output = '';
        this.currentDir = 'C:\\Users\\Target\\Desktop';
        this.history = [];
        this.historyIndex = -1;
    }
    
    executeCommand(cmd) {
        this.history.push(cmd);
        this.historyIndex = this.history.length;
        
        const [command, ...args] = cmd.trim().split(' ');
        
        switch(command.toLowerCase()) {
            case 'dir':
            case 'ls':
                return this.listDirectory();
            case 'cd':
                return this.changeDirectory(args[0]);
            case 'cat':
            case 'type':
                return this.readFile(args[0]);
            case 'help':
                return this.showHelp();
            case 'whoami':
                return 'jean_dupont@DESKTOP-JEAN\n';
            case 'ipconfig':
                return 'IPv4 Address: 192.168.1.105\nGateway: 192.168.1.1\n';
            case 'clear':
                this.output = '';
                return '';
            default:
                return `Commande non reconnue: ${command}\nTapez 'help' pour l'aide.\n`;
        }
    }
    
    listDirectory() {
        return `Volume in drive C has no label.\nDirectory of ${this.currentDir}\n\n
            <DIR>  Desktop
            <DIR>  Documents
            <DIR>  Downloads
            README.txt     245 bytes
            notes.txt      189 bytes\n`;
    }
    
    changeDirectory(dir) {
        if (!dir) return 'Chemin requis\n';
        this.currentDir = dir;
        return `${this.currentDir}>\n`;
    }
    
    readFile(filename) {
        if (filename === 'README.txt') {
            return 'Bienvenue! Clue: Mon mot de passe contient ma passion...\n';
        }
        if (filename === 'notes.txt') {
            return 'J\'aime les chats et la musique\n';
        }
        return `Fichier non trouvé: ${filename}\n`;
    }
    
    showHelp() {
        return `Commandes disponibles:\n
  dir/ls     - Lister les fichiers
  cd         - Changer de répertoire
  cat/type   - Lire un fichier
  whoami     - Afficher l'utilisateur
  ipconfig   - Afficher la config réseau
  clear      - Effacer l'écran
  help       - Afficher cette aide\n`;
    }
    
    getPreviousCommand() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            return this.history[this.historyIndex];
        }
        return '';
    }
    
    getNextCommand() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            return this.history[this.historyIndex];
        }
        this.historyIndex = this.history.length;
        return '';
    }

    renderUI() {
        return `<div style="background: #000; color: #0f0; font-family: monospace; padding: 10px; height: 100%; display: flex; flex-direction: column;">
            <div id="terminal-output" style="flex: 1; overflow: auto; border-bottom: 1px solid #0f0; padding: 10px 0;">
                <p>C:\\> Bienvenue dans le terminal!</p>
                <p>Tapez 'help' pour voir les commandes disponibles.</p>
            </div>
            <input id="terminal-input" type="text" placeholder="C:\\> " style="background: #000; color: #0f0; border: none; border-top: 1px solid #0f0; padding: 8px; font-family: monospace; outline: none;" />
        </div>`;
    }
}
