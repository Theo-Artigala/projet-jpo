// État centralisé du jeu - UNE SEULE SOURCE DE VÉRITÉ
export const gameState = {
    // Progression du joueur
    points: 0,
    badges: [],
    completedPuzzles: [],
    discoveredInfo: [], // Informations découvertes sur la cible
    
    // Système de fichiers
    filesystem: {
        desktop: [
            { id: 'file-1', name: 'notes.txt', type: 'text', size: 2048, content: 'Mes notes personnelles\n- Réunion vendredi 14h\n- Appeler maman ce soir\n- Code WiFi: Maison2024!' },
            { id: 'file-2', name: 'photo-vacances.jpg', type: 'image', size: 51200, content: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNGE5MGU1IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIi8+PHRleHQgeD0iMTAwIiB5PSIxMDAiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmYiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5WYWNhbmNlcyDwn4+W77iPPC90ZXh0Pjwvc3ZnPg==', metadata: { location: 'Nice, France', date: '2024-07-15' } },
            { id: 'file-3', name: 'identifiants.txt', type: 'text', size: 1024, content: 'IDENTIFIANTS IMPORTANTS\n\nEmail: jean.dupont@example.com\nMot de passe: JeanD2024!\nDate de naissance: 15/03/1985\nTéléphone: 06 12 34 56 78' }
        ],
        documents: [
            { id: 'file-4', name: 'cv.txt', type: 'text', size: 4096, content: 'CV - Jean Dupont\nIngénieur Logiciel\n\nExpérience:\n- TechCorp (2020-2024)\n- StartupXYZ (2018-2020)\n\nCompétences: JavaScript, Python, SQL' },
            { id: 'file-5', name: 'facture-internet.txt', type: 'text', size: 2048, content: 'Facture Internet\nAdresse: 42 Rue de la République\n75001 Paris\nN° client: 123456789' }
        ],
        downloads: [
            { id: 'file-6', name: 'attestation-domicile.txt', type: 'text', size: 1536, content: 'Attestation de domicile\nJean Dupont\n42 Rue de la République\n75001 Paris' }
        ],
        recycle: []
    },
    
    // Boîte mail
    mailbox: {
        inbox: [
            { id: 'mail-1', from: 'banque@example.com', subject: 'Votre relevé mensuel', date: '2024-01-10', content: 'Cher client,\nVotre solde: 2,450.00€' },
            { id: 'mail-2', from: 'pole-emploi@gouv.fr', subject: 'Mise à jour dossier', date: '2024-01-08', content: 'Bonjour,\nVotre numéro de sécurité sociale: 1 85 03 75 001 234 56' }
        ],
        sent: [],
        spam: []
    },
    
    // État du navigateur
    browserState: { 
        tabs: [], 
        activeTab: null,
        history: []
    }
};

// Fonction helper pour découvrir une information
export function discoverInfo(type, value) {
    if (!gameState.discoveredInfo.find(i => i.type === type && i.value === value)) {
        gameState.discoveredInfo.push({ type, value, timestamp: Date.now() });
        gameState.points += 10;
    }
}
