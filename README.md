# Idea - proje fikri paylaşma platformu

**Idea**, kullanıcıların kayıt olup giriş yapabildikleri, yazılım üzerine hashtaglere göre proje fikirleri paylaşabildikleri bir sosyal medya platformudur. Twitter'dan ilham alınarak tasarlanmış bu uygulamada kullanıcılar, paylaşılan içerikleri beğenebilir, favorilere ekleyebilir ve paylaşabilirler. Yorum yapma özelliği bulunmamaktadır. Kullanıcılar profillerini yönetebilir, profil bilgileri, paylaşımları, takip ettikleri ve takipçileri gibi bilgileri görebilirler. Kullanıcılar profil ve arkaplan resmi yükleyebilir, şifre değiştirebilir, hesaplarını dondurabilir ve aydınlık ile koyu tema arasında geçiş yapabilirler.

## Kullanılan Teknolojiler

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

## 2. Hem istemci hem de sunucu için NPM paketlerini yükleyin
```bash
cd server
npm install
```

```bash
cd client
npm install
```

## Uygulamayı Çlıştırma
```bash
cd server
npm start
```
```bash
cd client
npm run dev
```
