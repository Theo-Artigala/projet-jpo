export class HUD {
    constructor(gameState) {
        this.state = gameState;
    }
    
    update() {
        const hud = document.getElementById('game-hud');
        if (!hud) {
            this.create();
            return;
        }
        
        const badges = this.state.badges?.map(b => b.name.split(' ')[0]).join(' ') || 'None';
        const progress = `${this.state.completedPuzzles?.length || 0}/5`;
        
        hud.innerHTML = `
            <div style="font-family: monospace; font-size: 12px; line-height: 1.6;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span>💰 Points:</span>
                    <strong style="color: #0ff;">${this.state.points || 0}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span>🏆 Progression:</span>
                    <strong style="color: #0ff;">${progress}</strong>
                </div>
                <div style="font-size: 10px; color: #0f0; margin-top: 6px; padding-top: 6px; border-top: 1px solid #0f0;">
                    ${badges}
                </div>
            </div>
        `;
    }
    
    create() {
        const hud = document.createElement('div');
        hud.id = 'game-hud';
        hud.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.85);
            color: #0f0;
            padding: 14px 18px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            z-index: 10000;
            border: 2px solid #0f0;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(10px);
            min-width: 200px;
        `;
        document.body.appendChild(hud);
        this.update();
    }
    
    showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 110px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(26, 26, 26, 0.95);
            color: #0f0;
            padding: 14px 24px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 9999;
            max-width: 400px;
            text-align: center;
            border: 2px solid #0f0;
            font-family: 'Courier New', monospace;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.4);
            animation: slideUp 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2700);
    }
}
