#!/bin/bash
# Script để push code lên GitHub sau khi đã cấu hình credentials

echo "📤 Đang push code lên GitHub..."

cd /run/media/thaus/Lab/1_Project/Web-Blog

# Kiểm tra remote
echo "Kiểm tra remote..."
git remote -v

# Push lên GitHub
echo ""
echo "Push..."
git push -u origin main

echo ""
echo "✅ Hoàn tất!"
