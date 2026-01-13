export class Taskbar {
    constructor(gameState) {
        this.state = gameState;
        this.activeApp = null;
        this.create();
        this.setupClock();
    }
    
    create() {
        const taskbar = document.createElement('div');
        taskbar.id = 'taskbar';
        document.body.appendChild(taskbar);
        this.render();
    }
    
    render() {
        const taskbar = document.getElementById('taskbar');
        if (!taskbar) return;
        
        const buttons = [
            { id: 'browser', icon: 'assets/icons/icon-browser.svg', label: 'Navigateur' },
            { id: 'explorer', icon: 'assets/icons/icon-files.svg', label: 'Explorateur' },
            { id: 'terminal', icon: 'assets/icons/icon-terminal.svg', label: 'Terminal' },
            { id: 'mail', icon: 'assets/icons/icon-mail.svg', label: 'Mail' },
            { id: 'recycleBin', icon: 'assets/icons/icon-recycle.svg', label: 'Corbeille' }
        ];
        
        let html = buttons.map(btn => `
            <button id="taskbar-${btn.id}" data-app="${btn.id}" onclick="window.openApp('${btn.id}')" class="taskbar-button taskbar-inactive">
                <img src="${btn.icon}" alt="${btn.label}" />
            </button>
        `).join('');
        
        html += `<div class="taskbar-spacer"></div>
                <div id="taskbar-clock" class="taskbar-clock">14:07</div>`;
        
        taskbar.innerHTML = html;
    }
    
    setupClock() {
        setInterval(() => {
            const now = new Date();
            const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
            const clock = document.getElementById('taskbar-clock');
            if (clock) clock.textContent = time;
        }, 1000);
    }
    
    setActive(appId) {
        this.activeApp = appId;
    }
}
