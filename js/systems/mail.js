export class MailSystem {
    constructor(gameState) {
        this.state = gameState;
        this.currentFolder = 'inbox';
    }

    renderUI() {
        return `<div style="padding: 20px;">
            <h3>Mail</h3>
            <p style="color: #666;">Application Mail - En construction...</p>
        </div>`;
    }
}
