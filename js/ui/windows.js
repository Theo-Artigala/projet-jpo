export class WindowManager {
    constructor() {
        this.windows = {};
        this.zIndex = 1000;
    }
    
    createWindow(id, title, width, height, content, icon = null) {
        // Supprimer la fenêtre existante
        if (this.windows[id]) {
            this.windows[id].remove();
        }
        
        // Récupérer la position sauvegardée
        const saved = JSON.parse(localStorage.getItem(`window-${id}`) || '{}');
        const left = saved.left !== undefined ? saved.left : (window.innerWidth - width) / 2;
        const top = saved.top !== undefined ? saved.top : (window.innerHeight - height) / 2;
        const w = saved.width !== undefined ? saved.width : width;
        const h = saved.height !== undefined ? saved.height : height;
        
        const windowEl = document.createElement('div');
        windowEl.id = `win-${id}`;
        windowEl.className = 'window window-opening';
        windowEl.dataset.windowId = id;
        windowEl.style.cssText = `
            position: fixed;
            left: ${left}px;
            top: ${top}px;
            width: ${w}px;
            height: ${h}px;
            background: linear-gradient(180deg, #f3f3f3 0%, #e6e6e6 100%);
            border-radius: 6px;
            border: 1px solid rgba(0,0,0,0.15);
            box-shadow: 0 6px 18px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.2);
            display: flex;
            flex-direction: column;
            z-index: ${++this.zIndex};
            cursor: grab;
            user-select: none;
            transition: none;
        `;
        
        windowEl.innerHTML = `
            <div class="window-header" style="background: linear-gradient(90deg, #0b1f33 0%, #1b4b6a 100%); color: #fff; padding: 6px 8px; display: flex; justify-content: space-between; align-items: center; cursor: grab; font-weight: bold; font-size: 13px; user-select: none; border-radius: 6px 6px 0 0;">
                <span style="display: flex; align-items: center; gap: 8px;">${icon ? `<img src="${icon}" alt="${title}" style="width: 16px; height: 16px;" />` : ''}<span>${title}</span></span>
                <div style="display: flex; gap: 2px;">
                    <button class="window-minimize" style="width: 16px; height: 14px; background: rgba(255,255,255,0.06); border: none; color: #fff; cursor: pointer; padding: 0 6px; border-radius: 4px; font-size: 12px;">_</button>
                    <button class="window-maximize" style="width: 16px; height: 14px; background: rgba(255,255,255,0.06); border: none; color: #fff; cursor: pointer; padding: 0 6px; border-radius: 4px; font-size: 12px;">☐</button>
                    <button class="window-close" style="width: 16px; height: 14px; background: rgba(255,255,255,0.06); border: none; color: #fff; cursor: pointer; padding: 0 6px; border-radius: 4px; font-size: 12px;">✕</button>
                </div>
            </div>
            <div class="window-content" style="flex: 1; overflow: auto; padding: 10px; background: linear-gradient(180deg,#fff 0,#fbfbfb 100%); font-size: 13px; color: #111;">
                ${content}
            </div>
        `;
        
        // Événements des boutons
        const minimizeBtn = windowEl.querySelector('.window-minimize');
        const maximizeBtn = windowEl.querySelector('.window-maximize');
        const closeBtn = windowEl.querySelector('.window-close');
        
        let isAnimating = false;
        
        minimizeBtn.onclick = (e) => {
            if (isAnimating) return;
            isAnimating = true;
            e.stopPropagation();
            windowEl.classList.remove('window-opening');
            windowEl.classList.add('window-closing');
            windowEl.style.opacity = '0';
            windowEl.style.pointerEvents = 'none';
            setTimeout(() => {
                windowEl.style.display = 'none';
                windowEl.classList.remove('window-closing');
                windowEl.style.opacity = '1';
                this.updateTaskbarButton(id, false);
                isAnimating = false;
            }, 300);
        };
        
        maximizeBtn.onclick = (e) => {
            e.stopPropagation();
            if (windowEl.dataset.maximized === 'true') {
                // Restaurer
                const saved = JSON.parse(localStorage.getItem(`window-${id}`) || '{}');
                windowEl.style.left = saved.left + 'px';
                windowEl.style.top = saved.top + 'px';
                windowEl.style.width = saved.width + 'px';
                windowEl.style.height = saved.height + 'px';
                windowEl.dataset.maximized = 'false';
                maximizeBtn.textContent = '☐';
            } else {
                // Maximiser
                windowEl.style.left = '0px';
                windowEl.style.top = '0px';
                windowEl.style.width = '100vw';
                windowEl.style.height = 'calc(100vh - 80px)';
                windowEl.dataset.maximized = 'true';
                maximizeBtn.textContent = '▢';
            }
        };
        
        closeBtn.onclick = (e) => {
            if (isAnimating) return;
            isAnimating = true;
            e.stopPropagation();
            windowEl.classList.remove('window-opening');
            windowEl.classList.add('window-closing');
            setTimeout(() => {
                windowEl.remove();
                delete this.windows[id];
                this.updateTaskbarButton(id, false);
            }, 300);
        };
        
        // Drag to move
        const header = windowEl.querySelector('.window-header');
        let isDragging = false;
        let offsetX = 0, offsetY = 0;
        
        header.onmousedown = (e) => {
            if (e.target.classList.contains('window-minimize') || 
                e.target.classList.contains('window-maximize') || 
                e.target.classList.contains('window-close')) {
                return;
            }
            isDragging = true;
            offsetX = e.clientX - windowEl.offsetLeft;
            offsetY = e.clientY - windowEl.offsetTop;
            windowEl.style.zIndex = ++this.zIndex;
        };
        
        const onMouseMove = (e) => {
            if (isDragging && windowEl.dataset.maximized !== 'true') {
                windowEl.style.left = (e.clientX - offsetX) + 'px';
                windowEl.style.top = (e.clientY - offsetY) + 'px';
            }
        };
        
        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                this.saveWindowState(id, windowEl);
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
        };
        
        header.onmousedown = (e) => {
            if (e.target.classList.contains('window-minimize') || 
                e.target.classList.contains('window-maximize') || 
                e.target.classList.contains('window-close')) {
                return;
            }
            isDragging = true;
            offsetX = e.clientX - windowEl.offsetLeft;
            offsetY = e.clientY - windowEl.offsetTop;
            windowEl.style.zIndex = ++this.zIndex;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
        
        // Resize
        const resizer = document.createElement('div');
        resizer.style.cssText = `
            position: absolute;
            bottom: 0;
            right: 0;
            width: 20px;
            height: 20px;
            cursor: nwse-resize;
        `;
        windowEl.appendChild(resizer);
        
        resizer.onmousedown = (e) => {
            e.preventDefault();
            const startX = e.clientX;
            const startY = e.clientY;
            const startW = windowEl.offsetWidth;
            const startH = windowEl.offsetHeight;
            
            const onMove = (ev) => {
                const dx = ev.clientX - startX;
                const dy = ev.clientY - startY;
                windowEl.style.width = Math.max(300, startW + dx) + 'px';
                windowEl.style.height = Math.max(200, startH + dy) + 'px';
            };
            
            const onUp = () => {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
                this.saveWindowState(id, windowEl);
            };
            
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        };
        
        document.body.appendChild(windowEl);
        this.windows[id] = windowEl;
        this.updateTaskbarButton(id, true);
        return windowEl;
    }
    
    saveWindowState(id, windowEl) {
        const state = {
            left: parseInt(windowEl.style.left),
            top: parseInt(windowEl.style.top),
            width: parseInt(windowEl.style.width),
            height: parseInt(windowEl.style.height)
        };
        localStorage.setItem(`window-${id}`, JSON.stringify(state));
    }

    toggleWindow(id, show) {
        const windowEl = this.windows[id];
        if (!windowEl) return;
        
        if (show) {
            // Afficher - restaurer l'opacité d'abord
            windowEl.style.opacity = '1';
            windowEl.style.pointerEvents = 'auto';
            windowEl.style.display = 'flex';
            windowEl.classList.add('window-opening');
            setTimeout(() => {
                windowEl.classList.remove('window-opening');
            }, 300);
            this.updateTaskbarButton(id, true);
        } else {
            // Minimiser
            windowEl.style.opacity = '0';
            windowEl.style.pointerEvents = 'none';
            windowEl.classList.add('window-closing');
            setTimeout(() => {
                windowEl.style.display = 'none';
                windowEl.classList.remove('window-closing');
                windowEl.style.opacity = '1';
                this.updateTaskbarButton(id, false);
            }, 300);
        }
    }

    updateTaskbarButton(id, isOpen) {
        const btn = document.getElementById(`taskbar-${id}`);
        if (btn) {
            if (isOpen) {
                btn.classList.add('taskbar-active');
                btn.classList.remove('taskbar-inactive');
            } else {
                btn.classList.add('taskbar-inactive');
                btn.classList.remove('taskbar-active');
            }
        }
    }
}
