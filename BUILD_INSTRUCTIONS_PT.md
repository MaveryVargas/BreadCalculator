# 🚀 INSTRUÇÕES PRÁTICAS DE BUILD - APK

## ✅ Pré-requisitos Verificados

O projeto já possui:
- ✅ React Native + Expo configurado
- ✅ App.json com configurações Android
- ✅ eas.json com perfis de build
- ✅ package.json atualizado com scripts

---

## 🎯 3 FORMAS DE GERAR O APK

### 🥇 **FORMA 1: Build Online (Mais Simples - Recomendado)**

Funciona 100% na nuvem, sem instalar Android SDK.

**Passo 1:** Criar conta Expo (gratuita)
```
1. Acesse: https://expo.dev
2. Clique em "Sign Up"
3. Crie sua conta (email + senha)
```

**Passo 2:** Instalar ferramentas
```powershell
npm install -g eas-cli
npm install -g expo-cli
```

**Passo 3:** Login no terminal
```powershell
eas login
# Digite seu email Expo
# Digite sua senha Expo
```

**Passo 4:** Navegar até o projeto
```powershell
cd "C:\Users\Mávery Vargas\Documents\breadcalculator\BreadCalculator"
```

**Passo 5:** Gerar APK
```powershell
eas build --platform android --profile preview
```

O build vai demorar ~5-10 minutos. Você receberá um link para baixar o APK quando terminar.

---

### 🥈 **FORMA 2: Build Local (Recomendado se tiver Android Studio)**

Build na sua máquina, mas precisa do Android SDK.

**Passo 1:** Instalar Android Studio e SDK
```
1. Baixe Android Studio: https://developer.android.com/studio
2. Execute o instalador
3. Abra Android Studio
4. Vá em "More Options" > "SDK Manager"
5. Instale SDK 34 (Android 14) e NDK
```

**Passo 2:** Configurar variáveis de ambiente
```powershell
# Add this to PowerShell profile or run directly:
$env:ANDROID_HOME = "C:\Users\Mávery Vargas\AppData\Local\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\tools;$env:ANDROID_HOME\platform-tools"
```

**Passo 3:** Fazer prebuild
```powershell
cd "C:\Users\Mávery Vargas\Documents\breadcalculator\BreadCalculator"
expo prebuild --clean
```

**Passo 4:** Build com gradle
```powershell
cd android
# Windows PowerShell:
.\gradlew.bat assembleRelease
```

O APK estará em: `android/app/build/outputs/apk/release/app-release.apk`

---

### 🥉 **FORMA 3: Build com Expo Go (Apenas Teste - Não é APK)**

Para testar SEM gerar APK real (usa app Expo Go).

**Passo 1:** Instalar dependências
```powershell
cd "C:\Users\Mávery Vargas\Documents\breadcalculator\BreadCalculator"
npm install
```

**Passo 2:** Iniciar servidor Expo
```powershell
npm start
```

**Passo 3:** Escanear QR Code
- Instale "Expo Go" no Android
- Abra e escaneie o código QR
- App abre dentro do Expo Go

⚠️ **Nota:** Isso não gera APK real, apenas testa em tempo real.

---

## 📱 RESULTADOS ESPERADOS

### APK Gerado
- Nome: `BreadCalculator.apk` (ou similar)
- Tamanho: ~30-40 MB
- Compatibilidade: Android 5.0+ (SDK 21+)

### Instalação no Celular
1. Copiar APK para o celular
2. Ativar "Instalar de fontes desconhecidas" em Configurações
3. Clicar no APK e instalar
4. Abrir "Calculadora de Pão"

---

## 🎨 PREVIEW DA TELA PRINCIPAL

```
╔═══════════════════════════════════════════════════╗
║            🍞 Calculadora de Pão 🎉              ║
║       Gerencie seus produtos com alegria!         ║
╚═══════════════════════════════════════════════════╝

        ┌──────────────┬──────────────┐
        │              │              │
        │      5       │    33.5      │
        │    Itens     │  Total Unit  │  (Ouro + Laranja)
        │              │              │
        └──────────────┴──────────────┘

╔═══════════════════════════════════════════════════╗
║  🔍 Pesquisar itens...                           ║
╚═══════════════════════════════════════════════════╝

╔═══════════════════════════════════════════════════╗
║  🍞 PÃO                                           ║
├───────────────────────────────────────────────────┤
║ Pão de Fermentação Natural                        ║
║ 5 kg                    [−]  [+]  [🗑️]           ║
│───────────────────────────────────────────────────│
║ Croissants                                        ║
║ 2 dúzia                 [−]  [+]  [🗑️]           ║
╚═══════════════════════════════════════════════════╝

╔═══════════════════════════════════════════════════╗
║  🥐 PASTEL                                        ║
├───────────────────────────────────────────────────┤
║ Croissants Premium                                ║
║ 12 unid                 [−]  [+]  [🗑️]           ║
╚═══════════════════════════════════════════════════╝

╔═══════════════════════════════════════════════════╗
║  🍪 BISCOITO                                      ║
├───────────────────────────────────────────────────┤
║ Biscoito de Chocolate                             ║
║ 3 dúzia                 [−]  [+]  [🗑️]           ║
╚═══════════════════════════════════════════════════╝

(... mais categorias ao fazer scroll ...)

        ┌─────────────────────────────┐
        │           ➕                 │  (Botão flutuante)
        │                             │  (Laranja, canto inferior)
        └─────────────────────────────┘

────────────────────────────────────────────────────

MODAL: Ao clicar em ➕

╔═══════════════════════════════════════════════════╗
║  ➕ Adicionar Novo Item                          ║
├───────────────────────────────────────────────────┤
║                                                   ║
║  Nome do item (ex: Pão Francês)                  ║
║  [________________________________]              ║
║                                                   ║
║  ┌──────────────┬──────────────┐                 ║
║  │  Quantidade  │ Unidade      │                 ║
║  │  [_______]   │ [_________]  │                 ║
║  └──────────────┴──────────────┘                 ║
║                                                   ║
║  Selecione a Categoria:                          ║
║  ┌──────┬──────┬──────┐                          ║
║  │🍞Pão │🥐Pas │🍪Bis │                          ║
║  └──────┴──────┴──────┘                          ║
║  ┌──────┬──────┬──────┐                          ║
║  │🎂Bol │🍩Ros │🥖Out │                          ║
║  └──────┴──────┴──────┘                          ║
║                                                   ║
║  ┌──────────────┬──────────────┐                 ║
║  │ ❌ CANCELAR  │ ✅ ADICIONAR │                 ║
║  └──────────────┴──────────────┘                 ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
```

---

## 🎨 PALETA DE CORES UTILIZADA

```
├─ Fundo Principal: #FFF9E6 (Creme claro)
├─ Header: #FF8C42 (Laranja vibrante)
├─ Cartões: #FFFFFF (Branco puro)
├─ Borda Esquerda: #FFD700 (Ouro)
├─ Botões Aumentar: #FFD700 (Ouro)
├─ Botão Deletar: #FF6B6B (Vermelho)
├─ Botão Confirmar: #95E1D3 (Verde água)
├─ Botão Cancelar: #FF6B6B (Vermelho)
├─ Texto Principal: #333333 (Cinza escuro)
├─ Texto Secundário: #666666 (Cinza médio)
└─ Placeholders: #999999 (Cinza claro)
```

---

## 📊 ESTRUTURA DO APLICATIVO

```
App.js (main)
├── Header Component
│   ├── Título: 🍞 Calculadora de Pão 🎉
│   └── Subtítulo: Gerencie seus produtos com alegria!
│
├── Stats Component
│   ├── Total de Itens
│   └── Total de Quantidade
│
├── Search Component
│   └── Input de pesquisa
│
├── List Component
│   ├── Agrupa por categoria
│   ├── Filtra por busca
│   └── Item Card
│       ├── Nome do produto
│       ├── Quantidade + Unidade
│       └── Ações [−] [+] [🗑️]
│
├── FAB (Floating Action Button)
│   └── Botão ➕ para adicionar
│
└── Modal Component
    ├── Input nome
    ├── Input quantidade
    ├── Input unidade
    ├── Seletor de categoria
    └── Botões [Cancelar] [Adicionar]

State Management: React Hooks (useState)
├── items: Lista de produtos
├── modalVisible: Modal aberto/fechado
├── newItem: Dados do novo item
└── searchQuery: Termo de busca
```

---

## 📋 FUNCIONALIDADES

### ✅ Implementadas
- Adicionar novo item com categoria
- Editar quantidade (incrementar/decrementar)
- Deletar item com confirmação
- Pesquisar por nome
- Agrupar por categoria automaticamente
- Calcular estatísticas em tempo real
- Interface responsiva
- Suporte completo a português
- Emojis por categoria

### ⏳ Podem ser adicionadas
- Salvar dados (AsyncStorage/Banco de Dados)
- Editar item existente
- Exportar lista (PDF/Excel)
- Sincronização em nuvem
- Modo escuro
- Múltiplas listas
- Histórico de alterações

---

## 🆘 ERROS COMUNS E SOLUÇÕES

| Erro | Causa | Solução |
|------|-------|--------|
| `expo: command not found` | CLI não instalada | `npm install -g expo-cli` |
| `eas: command not found` | EAS CLI não instalada | `npm install -g eas-cli` |
| `Not authenticated` | Não fez login | `eas login` |
| `Port 19000 in use` | Porta ocupada | `expo start -c` (limpa cache) |
| `SDK version mismatch` | Versão incompatível | `npm install` (reinstala deps) |
| `APK installation failed` | Versão Android antiga | Celular precisa de Android 5.0+ |

---

## ✨ PRÓXIMOS PASSOS RECOMENDADOS

1. ✅ Gerar APK primeiro (Forma 1 - mais simples)
2. ✅ Testar no celular
3. ⏳ Adicionar persistência de dados (AsyncStorage)
4. ⏳ Criar ícone customizado
5. ⏳ Criar splash screen
6. ⏳ Publicar na Google Play Store
7. ⏳ Adicionar versão web

---

**Desenvolvido com ❤️ para gerenciar padarias! 🍞**

Qualquer dúvida, consulte: https://docs.expo.dev
