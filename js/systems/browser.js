import { CONFIG } from '../core/config.js';

export class BrowserSystem {
    constructor(gameState) {
        this.state = gameState;
        this.tabs = [];
        this.activeTab = null;
    }
    
    addTab(url = 'home') {
        const id = 'tab-' + Date.now();
        const tab = {
            id,
            url: url || 'home',
            title: this.deriveTitleFromUrl(url || 'home')
        };
        this.tabs.push(tab);
        this.activeTab = id;
        return id;
    }
    
    navigateTo(url) {
        if (!this.activeTab) return;
        const tab = this.tabs.find(t => t.id === this.activeTab);
        if (tab) {
            tab.url = url || 'home';
            tab.title = this.deriveTitleFromUrl(url);
        }
    }
    
    switchTab(id) {
        this.activeTab = id;
        this.renderTabs();
    }
    
    closeTab(id) {
        this.tabs = this.tabs.filter(t => t.id !== id);
        if (this.activeTab === id) {
            this.activeTab = this.tabs.length ? this.tabs[this.tabs.length - 1].id : null;
        }
        this.renderTabs();
    }
    
    deriveTitleFromUrl(url) {
        if (!url || url === 'home') return 'Accueil';
        if (url.startsWith('facebook:')) return 'Facebook';
        if (url.startsWith('google:')) return 'Google';
        return url.length > 20 ? url.slice(0, 20) + '...' : url;
    }
    
    renderContent(url) {
        if (!url || url === 'home') {
            return `<div style="padding: 20px;">
                <h2>Bienvenue sur HackSchool</h2>
                <p>Prototype éducatif de cybersécurité.</p>
                <p>Essayez: <strong>facebook:jean_dupont</strong></p>
            </div>`;
        }
        
        if (url.startsWith('facebook:')) {
            const id = url.split(':')[1];
            const profiles = this.state.profiles || [];
            const profile = profiles.find(p => p.id === id);
            
            if (profile) {
                return `<div style="padding: 20px;">
                    <h2>👤 ${profile.name}</h2>
                    <p><strong>Email:</strong> ${profile.email}</p>
                    <p><strong>Bio:</strong> ${profile.bio || 'Pas de bio'}</p>
                    <p><strong>Localité:</strong> ${profile.location || 'Non spécifié'}</p>
                    <p><strong>Intérêts:</strong> ${profile.interests?.join(', ') || 'N/A'}</p>
                </div>`;
            }
            return `<p>Profil « ${id} » non trouvé.</p>`;
        }
        
        return `<p>Contenu simulé pour ${url}</p>`;
    }
    
    renderTabs() {
        const btns = document.getElementById('browser-tab-buttons');
        const contents = document.getElementById('browser-tab-contents');
        
        if (!btns || !contents) return;
        
        btns.innerHTML = '';
        contents.innerHTML = '';
        
        this.tabs.forEach(t => {
            const btn = document.createElement('button');
            btn.className = 'browser-tab-btn';
            btn.style.fontWeight = t.id === this.activeTab ? 'bold' : 'normal';
            btn.innerHTML = `${t.title} <span onclick="event.stopPropagation();">✕</span>`;
            btn.onclick = () => this.switchTab(t.id);
            btns.appendChild(btn);
            
            const panel = document.createElement('div');
            panel.id = 'content-' + t.id;
            panel.style.display = t.id === this.activeTab ? 'block' : 'none';
            panel.innerHTML = this.renderContent(t.url);
            contents.appendChild(panel);
        });
    }

    renderUI() {
        return `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div id="browser-tab-buttons" style="display: flex; gap: 6px; padding: 6px; border-bottom: 1px solid #ddd; background: #f5f5f5;"></div>
                <div id="browser-tab-contents" style="flex: 1; overflow: auto;"></div>
            </div>
        `;
    }
}
