async function sorgula() {
    const userId = document.getElementById('userId').value.trim();
    const resultBox = document.getElementById('resultBox');
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');
    const userTag = document.getElementById('userTag');

    if (!userId) {
        alert("Lütfen bir ID girin!");
        return;
    }

    // Normalde burada C++ WebAssembly doğrulaması tetiklenebilir.
    // Doğrudan Discord API sorgusuna geçiyoruz:
    try {
        // Discord verilerini getiren ücretsiz açık bir API endpoint'i (Lanyard veya benzeri alternatifler)
        // Alternatif olarak kendi bot token'ın ile bir proxy üzerinden çekmelisin.
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const resData = await response.json();

        if (!resData.success) {
            alert("Kullanıcı bulunamadı veya Lanyard sistemine kayıtlı değil.");
            return;
        }

        const user = resData.data.discord_user;

        // Bilgileri yerleştirme
        userName.innerText = user.display_name || user.username;
        userTag.innerText = `@${user.username}`;
        
        // Avatar URL oluşturma
        if (user.avatar) {
            userAvatar.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
        } else {
            userAvatar.src = `https://cdn.discordapp.com/embed/avatars/0.png`;
        }

        resultBox.style.display = "block";

    } catch (error) {
        console.error("Hata:", error);
        alert("Veri çekilirken bir hata oluştu.");
    }
}

