#!/usr/bin/env pwsh
# ============================================
# Build Script - Calculadora de Pao
# Desenvolvido em: 23/04/2026
# ============================================

# Cores para output
$colors = @{
    Success = 'Green'
    Error = 'Red'
    Warning = 'Yellow'
    Info = 'Cyan'
}

function Write-Title {
    param([string]$text)
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "  🍞 $text 🎉" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$text)
    Write-Host "✅ $text" -ForegroundColor Green
}

function Write-Error-Custom {
    param([string]$text)
    Write-Host "❌ $text" -ForegroundColor Red
}

function Write-Warning-Custom {
    param([string]$text)
    Write-Host "⚠️  $text" -ForegroundColor Yellow
}

function Write-Info {
    param([string]$text)
    Write-Host "ℹ️  $text" -ForegroundColor Cyan
}

# Verificar Node.js
Write-Title "Calculadora de Pao - Build Tool"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error-Custom "Node.js nao esta instalado!"
    Write-Info "Baixe em: https://nodejs.org/"
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Success "Node.js detectado"
node --version

# Menu
Write-Host "`nEscolha uma opcao:`n" -ForegroundColor Cyan
Write-Host "[1] Instalar dependencias (npm install)"
Write-Host "[2] Iniciar servidor local (npm start)"
Write-Host "[3] Testar no Android (Expo Go)"
Write-Host "[4] Gerar APK com EAS (Recomendado) ⭐"
Write-Host "[5] Build local (requer Android Studio)"
Write-Host "[6] Limpar cache"
Write-Host "[7] Sair"
Write-Host ""

$choice = Read-Host "Digite o numero (1-7)"

switch ($choice) {
    "1" { Invoke-Install }
    "2" { Invoke-Start }
    "3" { Invoke-Android }
    "4" { Invoke-EasBuild }
    "5" { Invoke-LocalBuild }
    "6" { Invoke-Clean }
    "7" { exit 0 }
    default {
        Write-Error-Custom "Opcao invalida!"
        Read-Host "Pressione Enter para tentar novamente"
        & $PSScriptRoot\build.ps1
    }
}

function Invoke-Install {
    Write-Host "`n📦 Instalando dependencias..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Erro ao instalar dependencias!"
        Read-Host "Pressione Enter para sair"
        exit 1
    }
    Write-Success "Dependencias instaladas com sucesso!"
    Read-Host "Pressione Enter para continuar"
}

function Invoke-Start {
    Write-Host "`n🚀 Iniciando servidor Expo..." -ForegroundColor Cyan
    npm start
}

function Invoke-Android {
    Write-Host "`n📱 Iniciando no Android..." -ForegroundColor Cyan
    expo start --android
}

function Invoke-EasBuild {
    Write-Host "`n🏗️  Verificando EAS CLI..." -ForegroundColor Cyan
    
    if (-not (Get-Command eas -ErrorAction SilentlyContinue)) {
        Write-Warning-Custom "EAS CLI nao detectado!"
        Write-Info "Instalando globalmente..."
        npm install -g eas-cli
    }
    
    Write-Host "`nFazendo login no Expo..." -ForegroundColor Cyan
    eas login
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Erro ao fazer login!"
        Read-Host "Pressione Enter para sair"
        exit 1
    }
    
    Write-Host "`n🔨 Gerando APK com EAS Build..." -ForegroundColor Cyan
    Write-Warning-Custom "Isso pode demorar 5-10 minutos..."
    Write-Host ""
    
    eas build --platform android --profile preview
    
    Write-Success "APK gerado com sucesso!"
    Write-Info "Verifique o link fornecido acima para baixar."
    Read-Host "Pressione Enter para continuar"
}

function Invoke-LocalBuild {
    Write-Host "`n⚠️  Este metodo requer Android Studio e SDK configurados!" -ForegroundColor Yellow
    Write-Host ""
    
    if (-not $env:ANDROID_HOME) {
        Write-Error-Custom "ANDROID_HOME nao esta configurado!"
        Write-Info "Configure a variavel de ambiente ANDROID_HOME"
        Read-Host "Pressione Enter para sair"
        exit 1
    }
    
    Write-Success "Android SDK detectado: $env:ANDROID_HOME"
    Write-Host ""
    Write-Host "🔨 Fazendo prebuild..." -ForegroundColor Cyan
    
    expo prebuild --clean
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Erro no prebuild!"
        Read-Host "Pressione Enter para sair"
        exit 1
    }
    
    Write-Host "`n🔨 Compilando com Gradle..." -ForegroundColor Cyan
    Push-Location android
    
    .\gradlew.bat assembleRelease
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Erro na compilacao!"
        Pop-Location
        Read-Host "Pressione Enter para sair"
        exit 1
    }
    
    Pop-Location
    
    Write-Success "APK gerado em: android\app\build\outputs\apk\release\app-release.apk"
    Read-Host "Pressione Enter para continuar"
}

function Invoke-Clean {
    Write-Host "`n🧹 Limpando cache..." -ForegroundColor Cyan
    npm start -- -c
}

# Mensagem final
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Operacao concluida!" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Read-Host "Pressione Enter para finalizar"
