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
        taskbar.style.cssText = `
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            bottom: 14px;
            height: 56px;
            display: flex;
            align-items: center;
            padding: 6px 12px;
            gap: 12px;
            background: rgba(20, 20, 25, 0.45);
            backdrop-filter: blur(6px) saturate(120%);
            border-radius: 14px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
            z-index: 9999;
            pointer-events: auto;
        `;
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
            <button id="taskbar-${btn.id}" data-app="${btn.id}" onclick="window.openApp('${btn.id}')" class="taskbar-button taskbar-inactive"
                    style="width: 48px; height: 48px; border: none; cursor: pointer; border-radius: 12px; pointer-events: auto; display: flex; align-items: center; justify-content: center;">
                <img src="${btn.icon}" alt="${btn.label}" style="width: 32px; height: 32px;" />
            </button>
        `).join('');
        
        html += `<div style="flex: 1;"></div>
                <div style="color: #eef7ff; font-size: 11px; padding: 2px 6px; font-family: monospace;" id="taskbar-clock">14:07</div>`;
        
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
