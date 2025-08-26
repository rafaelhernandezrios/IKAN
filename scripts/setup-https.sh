#!/bin/bash

echo "🚀 Configurando HTTPS para GCA Virtual..."
echo "🚀 Setting up HTTPS for GCA Virtual..."

echo ""
echo "📦 Instalando dependencias..."
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔐 Generando certificados SSL..."
echo "🔐 Generating SSL certificates..."
chmod +x generate-ssl-cert.sh
./generate-ssl-cert.sh

echo ""
echo "✅ Configuración completada!"
echo "✅ Setup completed!"
echo ""
echo "📝 Para iniciar el servidor HTTPS:"
echo "📝 To start the HTTPS server:"
echo "   npm run start-https"
echo ""
echo "🌐 URL: https://localhost:8000"
echo ""
