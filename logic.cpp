#include <iostream>
#include <string>

// WebAssembly için dışa aktarma makrosu (isteğe bağlı, JS doğrudan veriyi de yönetebilir)
extern "C" {
    // Girilen ID'nin geçerli bir Discord ID uzunluğunda (17-19 karakter) olup olmadığını kontrol eden basit bir C++ fonksiyonu
    bool check_id_validity(const char* id) {
        std::string s_id(id);
        if (s_id.length() >= 17 && s_id.length() <= 20) {
            return true;
        }
        return false;
    }
}

