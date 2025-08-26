# Script para generar certificados SSL locales en Windows
# English: Script to generate local SSL certificates on Windows

Write-Host "🔐 Generando certificados SSL locales..." -ForegroundColor Green
Write-Host "🔐 Generating local SSL certificates..." -ForegroundColor Green

# Crear directorio para certificados si no existe
if (!(Test-Path "ssl")) {
    New-Item -ItemType Directory -Path "ssl"
}

# Verificar si OpenSSL está disponible
try {
    $opensslVersion = openssl version
    Write-Host "✅ OpenSSL encontrado: $opensslVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ OpenSSL no encontrado. Instalando..." -ForegroundColor Red
    Write-Host "📥 Descarga OpenSSL desde: https://slproweb.com/products/Win32OpenSSL.html" -ForegroundColor Yellow
    Write-Host "📥 Download OpenSSL from: https://slproweb.com/products/Win32OpenSSL.html" -ForegroundColor Yellow
    exit 1
}

# Generar certificado privado
Write-Host "🔑 Generando clave privada..." -ForegroundColor Yellow
openssl genrsa -out ssl/key.pem 2048

# Generar certificado público
Write-Host "📜 Generando certificado público..." -ForegroundColor Yellow
openssl req -new -x509 -key ssl/key.pem -out ssl/cert.pem -days 365 -subj "/C=ES/ST=Madrid/L=Madrid/O=GCA Virtual/CN=localhost"

# Copiar certificados al directorio raíz
Copy-Item "ssl/cert.pem" "./cert.pem"
Copy-Item "ssl/key.pem" "./key.pem"

Write-Host "✅ Certificados SSL generados exitosamente!" -ForegroundColor Green
Write-Host "✅ SSL certificates generated successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Para usar HTTPS local:" -ForegroundColor Cyan
Write-Host "📝 To use local HTTPS:" -ForegroundColor Cyan
Write-Host "   npm run start-https" -ForegroundColor White
Write-Host "   o / or" -ForegroundColor White
Write-Host "   npm run dev-https" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Nota: Los navegadores mostrarán una advertencia de seguridad." -ForegroundColor Yellow
Write-Host "⚠️  Note: Browsers will show a security warning." -ForegroundColor Yellow
Write-Host "   Haz clic en 'Avanzado' -> 'Continuar' para proceder." -ForegroundColor White
Write-Host "   Click 'Advanced' -> 'Continue' to proceed." -ForegroundColor White
