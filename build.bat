@echo off
REM ============================================
REM  Script de Build - Calculadora de Pao
REM  Autor: MaveryVargas
REM  Data: 23/04/2026
REM ============================================

setlocal enabledelayedexpansion

echo.
echo ========================================
echo   🍞 Calculadora de Pao - Build Tool 🎉
echo ========================================
echo.

REM Verificar se Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js nao esta instalado!
    echo Baixe em: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detectado
node --version

echo.
echo Escolha uma opcao:
echo.
echo [1] Instalar dependencias (npm install)
echo [2] Iniciar servidor local (npm start)
echo [3] Testar no Android (Expo Go)
echo [4] Gerar APK com EAS (Recomendado)
echo [5] Build local (requer Android Studio)
echo [6] Limpar cache (npm start -c)
echo [7] Sair
echo.

set /p choice="Digitar numero (1-7): "

if "%choice%"=="1" goto install
if "%choice%"=="2" goto start
if "%choice%"=="3" goto android
if "%choice%"=="4" goto eas_build
if "%choice%"=="5" goto local_build
if "%choice%"=="6" goto clean
if "%choice%"=="7" exit /b 0

echo ❌ Opcao invalida!
pause
goto :menu

:install
echo.
echo 📦 Instalando dependencias...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro ao instalar dependencias!
    pause
    exit /b 1
)
echo ✅ Dependencias instaladas com sucesso!
pause
goto :end

:start
echo.
echo 🚀 Iniciando servidor Expo...
call npm start
goto :end

:android
echo.
echo 📱 Iniciando no Android...
call expo start --android
goto :end

:eas_build
echo.
echo 🏗️  Verificando EAS CLI...
where eas >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ EAS CLI nao detectado!
    echo Instalando globalmente...
    call npm install -g eas-cli
)
echo.
echo Fazendo login no Expo...
call eas login
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro ao fazer login!
    pause
    exit /b 1
)
echo.
echo 🔨 Gerando APK com EAS Build...
echo Isso pode demorar 5-10 minutos...
echo.
call eas build --platform android --profile preview
echo.
echo ✅ APK gerado com sucesso!
echo Verifique o link fornecido acima para baixar.
pause
goto :end

:local_build
echo.
echo ⚠️  Este metodo requer Android Studio e SDK configurados!
echo.
echo Verificando Android SDK...
if not defined ANDROID_HOME (
    echo ❌ ANDROID_HOME nao esta configurado!
    echo Configure a variavel de ambiente ANDROID_HOME
    pause
    exit /b 1
)
echo ✅ Android SDK detectado: !ANDROID_HOME!
echo.
echo 🔨 Fazendo prebuild...
call expo prebuild --clean
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro no prebuild!
    pause
    exit /b 1
)
echo.
echo 🔨 Compilando com Gradle...
cd android
call gradlew.bat assembleRelease
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro na compilacao!
    cd ..
    pause
    exit /b 1
)
cd ..
echo.
echo ✅ APK gerado em: android\app\build\outputs\apk\release\app-release.apk
pause
goto :end

:clean
echo.
echo 🧹 Limpando cache...
call npm start -c
goto :end

:end
echo.
echo ========================================
echo Operacao concluida!
echo ========================================
echo.
pause
