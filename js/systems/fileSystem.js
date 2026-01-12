import { gameState } from '../core/state.js';
import { saveGame } from '../core/storage.js';

export class FileSystem {
    constructor(gameState) {
        this.state = gameState;
        this.currentFolder = 'desktop';
        this.clipboard = null;
    }

    renderUI() {
        const files = this.state.filesystem[this.currentFolder] || [];
        
        let html = `
            <div style="display: flex; flex-direction: column; height: 100%; gap: 10px;">
                <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                    <button onclick="window.fileSystemNav('desktop')" style="padding: 6px 12px; background: ${this.currentFolder === 'desktop' ? '#0066cc' : '#ddd'}; color: ${this.currentFolder === 'desktop' ? 'white' : 'black'}; border: none; border-radius: 4px; cursor: pointer;">Bureau</button>
                    <button onclick="window.fileSystemNav('documents')" style="padding: 6px 12px; background: ${this.currentFolder === 'documents' ? '#0066cc' : '#ddd'}; color: ${this.currentFolder === 'documents' ? 'white' : 'black'}; border: none; border-radius: 4px; cursor: pointer;">Documents</button>
                    <button onclick="window.fileSystemNav('downloads')" style="padding: 6px 12px; background: ${this.currentFolder === 'downloads' ? '#0066cc' : '#ddd'}; color: ${this.currentFolder === 'downloads' ? 'white' : 'black'}; border: none; border-radius: 4px; cursor: pointer;">Téléchargements</button>
                </div>
                
                <div style="flex: 1; overflow: auto; border: 1px solid #ccc; border-radius: 4px; padding: 10px;">
                    ${files.length === 0 ? '<p style="color: #999;">Dossier vide</p>' : ''}
                    ${files.map(f => `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: #f5f5f5; margin-bottom: 6px; border-radius: 4px; cursor: pointer;" oncontextmenu="event.preventDefault(); window.showFileMenu('${f.id}', '${f.name}', '${f.type}')">
                            <div style="flex: 1;">
                                <strong>${f.name}</strong>
                                <div style="font-size: 12px; color: #666;">${f.type === 'image' ? '🖼️ Image' : '📄 Texte'} • ${(f.size / 1024).toFixed(1)} KB</div>
                            </div>
                            <button onclick="window.showFileInfo('${f.id}')" style="padding: 4px 8px; background: #0066cc; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px;">Info</button>
                        </div>
                    `).join('')}
                </div>
                
                <div style="padding: 8px; background: #f0f0f0; border-radius: 4px; font-size: 12px; color: #666;">
                    ${files.length} fichier${files.length > 1 ? 's' : ''} • ${(files.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024).toFixed(2)} MB
                </div>
            </div>
        `;
        
        return html;
    }

    renderRecycleBin() {
        const recycled = this.state.filesystem.recycle || [];
        
        return `
            <div style="display: flex; flex-direction: column; height: 100%; gap: 10px;">
                <h3>Corbeille</h3>
                <div style="flex: 1; overflow: auto; border: 1px solid #ccc; border-radius: 4px; padding: 10px;">
                    ${recycled.length === 0 ? '<p style="color: #999;">La corbeille est vide</p>' : ''}
                    ${recycled.map(f => `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: #ffe6e6; margin-bottom: 6px; border-radius: 4px;">
                            <div>
                                <strong>${f.name}</strong>
                                <div style="font-size: 12px; color: #666;">${f.type === 'image' ? '🖼️ Image' : '📄 Texte'}</div>
                            </div>
                            <button onclick="window.restoreFile('${f.id}')" style="padding: 4px 8px; background: #00aa00; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px;">Restaurer</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    deleteFile(fileId) {
        const file = this.findFileById(fileId);
        if (file) {
            this.state.filesystem.recycle = this.state.filesystem.recycle || [];
            this.state.filesystem.recycle.push(file);
            
            for (let folder in this.state.filesystem) {
                if (folder !== 'recycle') {
                    const idx = this.state.filesystem[folder].findIndex(f => f.id === fileId);
                    if (idx !== -1) {
                        this.state.filesystem[folder].splice(idx, 1);
                    }
                }
            }
        }
    }

    restoreFile(fileId) {
        const file = this.findFileById(fileId);
        if (file) {
            this.state.filesystem.desktop.push(file);
            const idx = this.state.filesystem.recycle.findIndex(f => f.id === fileId);
            if (idx !== -1) {
                this.state.filesystem.recycle.splice(idx, 1);
            }
        }
    }

    findFileById(fileId) {
        for (let folder in this.state.filesystem) {
            const file = this.state.filesystem[folder].find(f => f.id === fileId);
            if (file) return file;
        }
        return null;
    }

    copyFile(fileId) {
        this.clipboard = this.findFileById(fileId);
    }

    pasteFile() {
        if (this.clipboard) {
            const copy = { ...this.clipboard, id: 'file-' + Date.now(), name: this.clipboard.name + ' (copie)' };
            this.state.filesystem[this.currentFolder].push(copy);
            this.clipboard = null;
        }
    }
}
