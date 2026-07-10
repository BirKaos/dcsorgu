#include <iostream>
#include <string>

extern "C" {
    // API'den gelen veride kullanıcının aktif olarak bir yazılım/kodlama aracı çalıştırıp çalıştırmadığını filtreleyen fonksiyon
    bool has_active_software(const char* activity_json) {
        std::string jsonStr(activity_json);
        
        // Gelen JSON datasında oyun veya editör belirtisi aranıyor
        if (jsonStr.find("vscode") != std::string::npos || 
            jsonStr.find("pydroid") != std::string::npos || 
            jsonStr.find("game") != std::string::npos) {
            return true;
        }
        return false;
    }
}

