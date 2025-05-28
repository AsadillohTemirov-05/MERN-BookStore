#!/bin/bash

# Log fayli yo'li
LOG_FILE="/var/log/deploy.log"

exec > >(tee -a ${LOG_FILE}) 2>&1

echo "--------------------------------------------------------"
echo "Deploy boshlandi: $(date)"
echo "--------------------------------------------------------"


cd home/ubuntu/MERN-BookStore/

echo "--- Loyiha fayllarini Gitdan tortish ---"
git pull origin main 

echo "--- Backend (Node.js) yangilash ---"
cd backend || { echo "Xato: Backend katalogi topilmadi!"; exit 1; }
npm install # Yangi dependensiyalar uchun
pm2 reload my-backend-app || pm2 restart my-backend-app # Backendni qayta yuklash/boshlash
pm2 save # PM2 konfiguratsiyasini saqlash
cd .. # Asosiy loyiha katalogiga qaytish

echo "--- Frontend (React) yangilash ---"
cd frontend || { echo "Xato: Frontend katalogi topilmadi!"; exit 1; }
npm install # Yangi dependensiyalar uchun
NODE_OPTIONS="--max-old-space-size=4096" npm run build # Frontendni build qilish
cd .. # Asosiy loyiha katalogiga qaytish

echo "--- Admin panel (React) yangilash ---"
cd admin || { echo "Xato: Admin katalogi topilmadi!"; exit 1; }
npm install # Yangi dependensiyalar uchun
NODE_OPTIONS="--max-old-space-size=4096" npm run build # Admin panelni build qilish
# Agar sizning build jarayoningizda index.html boshqa joyga tushsa, uni dist ichiga ko'chirish kerak bo'lishi mumkin.
# Masalan: mv build/* dist/ (agar build papkasi ichidagilar dist ga ko'chirilishi kerak bo'lsa)
cd .. # Asosiy loyiha katalogiga qaytish

echo "--- Nginxni qayta yuklash ---"
sudo nginx -t && sudo systemctl reload nginx

echo "--------------------------------------------------------"
echo "Deploy tugadi: $(date)"
echo "--------------------------------------------------------"
