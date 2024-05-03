# Idea - proje fikir paylaşma platformu

**Idea**, kullanıcıların kayıt olup giriş yapabildikleri, yazılım üzerine hashtaglere göre proje fikirleri paylaşabildikleri bir sosyal medya platformudur. Twitter'dan ilham alınarak tasarlanmış bu uygulamada kullanıcılar, paylaşılan içerikleri beğenebilir, favorilere ekleyebilir ve paylaşabilirler. Yorum yapma özelliği
 bulunmamaktadır. Kullanıcılar profillerini yönetebilir, profil bilgileri, paylaşımları, takip ettikleri ve takipçileri gibi bilgileri görebilirler. Kullanıcılar profil ve arkaplan resmi yükleyebilir, şifre değiştirebilir, hesaplarını dondurabilir ve aydınlık ile koyu tema arasında geçiş yapabilirler.
<img width="552" alt="Ekran Resmi 2024-05-03 19 29 10" src="https://github.com/muratokur3/idea/assets/43227213/a7500152-0c52-41c4-ad3f-78bfe602b784">
<img width="552" alt="Ekran Resmi 2024-05-03 19 28 41" src="https://github.com/muratokur3/idea/assets/43227213/2bf85a21-a903-4f31-9ece-51a96a478e4a">
<img width="1665" alt="Ekran Resmi 2024-05-03 19 26 49" src="https://github.com/muratokur3/idea/assets/43227213/43a9745e-cfe0-439c-a7d1-df0b1488be5f">
<img width="1665" alt="Ekran Resmi 2024-05-03 19 26 15" src="https://github.com/muratokur3/idea/assets/43227213/33facc0f-db0f-4984-9e32-1a6741135744">
## Kullanılan Teknolojiler

- **Vite** - Vite ile inşa edilmiştir.
 
Bu proje, MERN yığını kullanılarak inşa edilmiştir:

- **MongoDB** - Verilerin saklandığı belge tabanlı veritabanı.
- **Express.js** - Node.js üzerinde çalışan arka uç web uygulaması çatısı.
- **React** - Kullanıcı arayüzlerini oluşturmak için kullanılan bir JavaScript kütüphanesi.
- **Node.js** - Web tarayıcısı dışında JavaScript kodu çalıştıran JavaScript çalışma ortamı.

## Proje Yapısı
/proje-kök
/client # İstemci tarafı uygulaması (React)
/server # Sunucu tarafı uygulaması (Node/Express)


### İstemci Bağımlılıkları

- CSS-in-JS stillemesi için `@emotion/react`, `@emotion/styled`
- Material-UI bileşenleri (`@mui/material`, `@mui/icons-material` vb.)
- Durum yönetimi için `@reduxjs/toolkit` ve `react-redux`
- Yönlendirme için `react-router-dom`
- HTTP istekleri için `axios`,

### Sunucu Bağımlılıkları

- İstekleri işlemek için `express`
- MongoDB nesne modellemesi için `mongoose`
- Güvenlik için `bcryptjs` ve `jsonwebtoken`
- Çapraz kaynak istekleri için `cors`
- Ortam değişkenleri yönetimi için `dotenv`
- Dosya yükleme işlemleri için `multer`
- HTTP istek kaydı için `morgan`

## Başlarken

Verilerinizi depoladığınız mongodb veya benzer bir veritabanı aracınız olmalı.

### Gereksinimler

- Node.js
- npm
```bash
npm install npm@latest -g
```
## 1. Depoyu klonlayın
git clone https://github.com/muratokur3/idea.git

## 2. .env dosyasını ayarlayın
Uygulamanın düzgün çalışabilmesi için, veritabanı aracınızın bilgilerini içeren .env dosyası oluşturmanız gerekmektedir. Aşağıdaki değişkenleri server klasörünüzdeki .env dosyanıza ekleyin:
```bash
MONGO_CONNECTION_STRING =[your-connection-string]
SECRET_KEY=[your-secret-key]
```

## 3. Hem istemci hem de sunucu için NPM paketlerini yükleyin
```bash
cd server
npm install
```

```bash
cd client
npm install
```

## 4. Uygulamayı Çalıştır
```bash
cd server
npm start
```
```bash
cd client
npm run dev
```
