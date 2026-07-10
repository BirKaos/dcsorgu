// Discord Snowflake ID'sinden hesap açılış tarihini bulan fonksiyon
function getDiscordDate(id) {
    try {
        const discordEpoch = 1420070400000;
        const idAsBigInt = BigInt(id);
        const timestamp = Number((idAsBigInt >> 22n) + BigInt(discordEpoch));
        const date = new Date(timestamp);
        return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) + " " + date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
        return "Bilinmeyen Tarih";
    }
}

async function executeLookup() {
    const userId = document.getElementById('targetId').value.trim();
    const card = document.getElementById('resultCard');
    
    if (!userId || isNaN(userId)) {
        alert("Lütfen geçerli bir sayısal Discord ID'si girin!");
        return;
    }

    try {
        // Canlı API Köprüsü üzerinden veri çekme isteği (Lanyard REST API)
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const apiData = await response.json();

        if (!apiData.success) {
            alert("Kullanıcı API veritabanında aktif değil veya ID hatalı.");
            return;
        }

        const data = apiData.data;
        const user = data.discord_user;

        // 1. Temel İsim ve Künye Bilgileri
        document.getElementById('resName').innerText = user.display_name || user.username;
        document.getElementById('resSubname').innerText = `@${user.username}`;
        document.getElementById('resId').innerText = user.id;

        // 2. Avatar Kurulumu
        if (user.avatar) {
            document.getElementById('resAvatar').src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
        } else {
            document.getElementById('resAvatar').src = `https://cdn.discordapp.com/embed/avatars/0.png`;
        }

        // 3. Banner (Profil Arkası) Ayarı
        const bannerArea = document.getElementById('resBanner');
        if (user.banner) {
            bannerArea.style.backgroundImage = `url('https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=600')`;
        } else {
            bannerArea.style.backgroundImage = 'none';
            bannerArea.style.backgroundColor = user.accent_color ? `#${user.accent_color.toString(16)}` : '#5865F2';
        }

        // 4. Hesap Kuruluş Tarihi Hesaplama
        document.getElementById('resDate').innerText = getDiscordDate(user.id);

        // 5. Yazılımlar, Kodlama Araçları veya Oyunlar (Activities)
        const actBox = document.getElementById('activityBox');
        if (data.activities && data.activities.length > 0) {
            const primaryAct = data.activities[0];
            document.getElementById('actTitle').innerText = `${primaryAct.name}`;
            document.getElementById('actDesc').innerText = `${primaryAct.details || ''} ${primaryAct.state || ''}`;
            actBox.style.display = 'block';
        } else {
            actBox.style.display = 'none';
        }

        // 6. Rozetler ve Nitro Analizi
        const badgeContainer = document.getElementById('resBadges');
        badgeContainer.innerHTML = ''; // İçini temizle
        
        if (data.active_on_discord_desktop || data.active_on_discord_mobile) {
            // Aktiflik durumuna göre Nitro veya platform amblemi simüle edilebilir
            document.getElementById('resNitro').innerText = "Nitro Avantajları Aktif (Rozetleri İnceleyin)";
            
            // Örnek Nitro Simgesi Ekleme
            const nitroBadge = document.createElement('img');
            nitroBadge.src = 'https://cdn.discordapp.com/emojis/1043862211604529222.webp?size=44&quality=lossless';
            nitroBadge.className = 'badge-icon';
            badgeContainer.appendChild(nitroBadge);
        } else {
            document.getElementById('resNitro').innerText = "Belirlenemedi";
        }

        // Ham API Çıktısını JSON olarak en altta gösterme
        document.getElementById('jsonOutput').textContent = JSON.stringify(apiData, null, 4);
        
        // Kartı görünür yap
        card.style.display = 'block';

    } catch (error) {
        console.error("API Hatası:", error);
        alert("API sunucusuyla iletişim kurulurken bir hata meydana geldi.");
    }
}
