let currentMode = 'User';

function setMode(mode) {
    currentMode = mode;
    document.getElementById('currentModeLabel').innerText = mode.toUpperCase() === 'USER' ? 'ID' : mode.split(' ')[0].toUpperCase();
    
    // Aktif buton stilini değiştirme
    const buttons = document.querySelectorAll('.mode-btn');
    buttons.forEach(btn => {
        if(btn.innerText.includes(mode)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

async function executeLookup() {
    const inputVal = document.getElementById('targetId').value.trim();
    const card = document.getElementById('resultCard');
    
    if(!inputVal) {
        alert("Lütfen geçerli bir ID girin!");
        return;
    }

    // Görseldeki şablonu dolduracak örnek dinamik veri yapısı (API entegrasyonu buraya bağlanır)
    let mockData = {};

    if (currentMode === 'User' || currentMode === 'Bot') {
        mockData = {
            id: inputVal,
            username: currentMode === 'Bot' ? "MüzikBotu" : "huzxurr",
            global_name: currentMode === 'Bot' ? "Pro Bot v4" : "script",
            discriminator: "0000",
            type: currentMode,
            created_at: "21 Şubat 2024 Çarşamba 17:11",
            avatar_url: currentMode === 'Bot' ? "https://cdn.discordapp.com/embed/avatars/2.png" : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
        };
    } else if (currentMode === 'Server') {
        mockData = {
            id: inputVal,
            name: "Yazılımcılar Topluluğu",
            type: "Guild / Server",
            member_count: 1420,
            created_at: "10 Ocak 2023 Salı 12:00",
            avatar_url: "https://cdn.discordapp.com/embed/avatars/4.png"
        };
    }

    // Arayüze verileri giydirme
    document.getElementById('resName').innerText = mockData.global_name || mockData.name;
    document.getElementById('resSubname').innerText = `@${mockData.username || 'server'}`;
    document.getElementById('resId').innerText = mockData.id;
    document.getElementById('resType').innerText = mockData.type;
    document.getElementById('resDate').innerText = mockData.created_at;
    document.getElementById('resAvatar').src = mockData.avatar_url;

    // JSON formatında ham veriyi en alttaki kutuya basma (Görsel 2'deki gibi)
    document.getElementById('jsonOutput').textContent = JSON.stringify(mockData, null, 4);

    // Kartı görünür yap
    card.style.display = 'block';
}

