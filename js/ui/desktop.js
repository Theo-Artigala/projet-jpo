export class DesktopUI {
    constructor(gameState) {
        this.state = gameState;
        this.icons = [
            { id: 'explorer', label: 'Explorateur', icon: 'assets/icons/icon-files.svg' },
            { id: 'browser', label: 'Navigateur', icon: 'assets/icons/icon-browser.svg' },
            { id: 'mail', label: 'Mail', icon: 'assets/icons/icon-mail.svg' },
            { id: 'terminal', label: 'Terminal', icon: 'assets/icons/icon-terminal.svg' },
            { id: 'recycleBin', label: 'Corbeille', icon: 'assets/icons/icon-recycle.svg' }
        ];
    }
    
    render() {
        const area = document.getElementById('desktop-area');
        if (!area) return;
        
        area.innerHTML = '<div class="desktop-icons">';
        
        this.icons.forEach(icon => {
            const div = document.createElement('div');
            div.className = 'desktop-icon';
            div.ondblclick = () => this.openApplication(icon.id);
            div.innerHTML = `
                <img src="${icon.icon}" alt="${icon.label}" style="width: 48px; height: 48px; cursor: pointer;" />
                <div class="desktop-icon-label">${icon.label}</div>
            `;
            area.appendChild(div);
        });
        
        area.innerHTML += '</div>';
    }
    
    openApplication(appId) {
        const event = new CustomEvent('open-app', { detail: { appId } });
        document.dispatchEvent(event);
    }
}
