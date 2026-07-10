#include <iostream>
#include <string>

extern "C" {
    // Arayüz moduna göre ID uzunluğunu ve doğruluğunu kontrol eden C++ fonksiyonu
    bool validate_discord_id(const char* id, const char* mode) {
        std::string discord_id(id);
        std::string current_mode(mode);
        
        // Discord kar tanesi (Snowflake) ID yapısı genellikle 17 ile 20 karakter arası rakamlardan oluşur
        if (discord_id.length() < 17 || discord_id.length() > 20) {
            return false;
        }
        
        for (char const &c : discord_id) {
            if (std::isdigit(c) == 0) return false;
        }
        
        return true;
    }
}
