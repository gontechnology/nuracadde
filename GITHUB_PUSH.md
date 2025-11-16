# 🚀 GitHub'a Push Etme Rehberi

## Adım 1: GitHub'da Repository Oluştur

1. **GitHub'a git:** https://github.com/new
2. **Repository Name:** `nuracadde-emlak` (veya istediğin isim)
3. **Description:** "Modern real estate website for Nura Cadde Emlak - Bağdat Caddesi"
4. **Public** veya **Private** seç
5. ✅ **"Create repository"** butonuna bas
6. **ÖNEMLİ:** Hiçbir dosya ekleme (README, .gitignore vs.), boş repo oluştur

---

## Adım 2: Local Git Ayarları (İlk Kez)

```bash
# Git kullanıcı bilgilerini ayarla (daha önce yapmadıysan)
git config --global user.name "Senin Adın"
git config --global user.email "senin@email.com"
```

---

## Adım 3: Projeyi GitHub'a Push Et

### Terminal'i aç ve proje klasörüne git:

```bash
cd /path/to/nuracadde-project
```

### Git komutlarını çalıştır:

```bash
# 1. Git repository başlat
git init

# 2. Tüm dosyaları ekle
git add .

# 3. İlk commit
git commit -m "Initial commit: Nura Cadde Emlak website"

# 4. Ana branch'i main olarak ayarla
git branch -M main

# 5. GitHub remote ekle (GitHub'dan aldığın URL'i kullan)
git remote add origin https://github.com/KULLANICI_ADIN/nuracadde-emlak.git

# 6. GitHub'a push et
git push -u origin main
```

**NOT:** `KULLANICI_ADIN/nuracadde-emlak.git` kısmını kendi GitHub URL'inle değiştir!

---

## Adım 4: GitHub'da Kontrol Et

1. GitHub repository sayfanı yenile
2. Tüm dosyaların yüklendiğini gör
3. ✅ Hazır!

---

## ⚠️ Önemli Notlar

### .env Dosyaları GitHub'a GİTMEZ! ✅

`.gitignore` dosyası sayesinde şunlar GitHub'a yüklenmeyecek:
- ✅ `.env` dosyaları (MongoDB şifresi güvende)
- ✅ `node_modules/` klasörü
- ✅ `venv/` klasörü
- ✅ Build dosyaları

Bunun yerine:
- ✅ `.env.example` dosyaları GitHub'da olacak (şifresiz şablon)
- ✅ Deployment platformlarında environment variables ekleyeceksin

---

## Güncellemeleri Push Etme

Sonraki değişiklikler için:

```bash
# Değişiklikleri kaydet
git add .
git commit -m "Açıklama: ne değişti"
git push origin main
```

---

## SSH Kullanmak İstersen (Önerilen)

### SSH Key Oluştur:

```bash
ssh-keygen -t ed25519 -C "senin@email.com"
```

### SSH Key'i GitHub'a Ekle:

1. Key'i kopyala:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. GitHub → Settings → SSH and GPG keys → New SSH key
3. Key'i yapıştır ve kaydet

### Remote URL'i SSH'e Çevir:

```bash
git remote set-url origin git@github.com:KULLANICI_ADIN/nuracadde-emlak.git
```

---

## 🎉 Sonraki Adım: DEPLOYMENT!

GitHub'a push ettikten sonra `DEPLOYMENT.md` dosyasını aç ve deploy et!

**En kolay yol:** Vercel + Render (10 dakika)

---

## Sorun mu yaşıyorsun?

### "Permission denied" hatası:
- SSH key ayarlarını kontrol et
- HTTPS URL kullanıyorsan GitHub şifreni gir

### "Already exists" hatası:
```bash
rm -rf .git
git init
# Tekrar dene
```

### Yanlış dosya yükledim:
```bash
git rm --cached dosya_adi
git commit -m "Remove file"
git push origin main
```

---

**İyi push'lar! 🚀**
