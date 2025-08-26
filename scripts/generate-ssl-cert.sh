#!/bin/bash

# Script para generar certificados SSL locales para desarrollo
# English: Script to generate local SSL certificates for development

echo "🔐 Generando certificados SSL locales..."
echo "🔐 Generating local SSL certificates..."

# Crear directorio para certificados si no existe
mkdir -p ssl

# Generar certificado privado
openssl genrsa -out ssl/key.pem 2048

# Generar certificado público
openssl req -new -x509 -key ssl/key.pem -out ssl/cert.pem -days 365 -subj "/C=ES/ST=Madrid/L=Madrid/O=GCA Virtual/CN=localhost"

# Copiar certificados al directorio raíz
cp ssl/cert.pem ./cert.pem
cp ssl/key.pem ./key.pem

echo "✅ Certificados SSL generados exitosamente!"
echo "✅ SSL certificates generated successfully!"
echo ""
echo "📝 Para usar HTTPS local:"
echo "📝 To use local HTTPS:"
echo "   npm run start-https"
echo "   o / or"
echo "   npm run dev-https"
echo ""
echo "⚠️  Nota: Los navegadores mostrarán una advertencia de seguridad."
echo "⚠️  Note: Browsers will show a security warning."
echo "   Haz clic en 'Avanzado' -> 'Continuar' para proceder."
echo "   Click 'Advanced' -> 'Continue' to proceed."
