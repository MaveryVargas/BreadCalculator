# 📱 Guia de Build APK - Calculadora de Pão

## 📋 Análise Técnica do Projeto

### Arquitetura
- **Framework**: React Native via Expo
- **Linguagem**: JavaScript (ES6+)
- **Estado**: React Hooks (useState)
- **Styling**: React Native StyleSheet
- **Plataforma Alvo**: Android (com suporte iOS)

### Estrutura de Componentes
- **App.js**: Componente principal com toda lógica
- **constants.js**: Paleta de cores, categorias, strings i18n
- **index.js**: Ponto de entrada Expo
- **app.json**: Configurações Expo e Android

### Funcionalidades Implementadas
✅ Adicionar itens com categoria  
✅ Editar quantidade (+/-)  
✅ Deletar itens com confirmação  
✅ Pesquisar por nome  
✅ Agrupar por categoria  
✅ Estatísticas em tempo real  
✅ Interface responsiva  
✅ Suporte completo a português  

---

## 🚀 Métodos de Build do APK

### **Opção 1: Usar EAS Build (Recomendado - Mais Fácil)**

#### Pré-requisitos:
- Node.js 14+ instalado
- Conta Expo (gratuita em https://expo.dev)
- npm ou yarn

#### Passo 1: Instalar EAS CLI
```powershell
npm install -g eas-cli
```

#### Passo 2: Fazer Login no Expo
```powershell
eas login
# Insira suas credenciais Expo
```

#### Passo 3: Configurar o Projeto
```powershell
cd "C:\Users\Mávery Vargas\Documents\breadcalculator\BreadCalculator"
eas build --platform android --local
```

#### Passo 4: Gerar APK
```powershell
eas build --platform android --profile preview
```

O arquivo APK será salvo na pasta de downloads do Expo.

---

### **Opção 2: Build Local com Expo Go (Desenvolvimento)**

Para testar em desenvolvimento:

```powershell
cd "C:\Users\Mávery Vargas\Documents\breadcalculator\BreadCalculator"
npm install
npm start
# Escaneie o código QR com Expo Go ou pressione 'a' para Android
```

---

### **Opção 3: Build Nativo com Android Studio (Avançado)**

#### Pré-requisitos:
- Java Development Kit (JDK 11+)
- Android SDK
- Android Studio (opcional)

#### Gerar APK Nativo:
```powershell
cd "C:\Users\Mávery Vargas\Documents\breadcalculator\BreadCalculator"
expo prebuild --clean
# Isso vai criar um diretório 'android/'

cd android
gradlew assembleRelease
```

---

## 🎨 Preview da Main Page

```
┌─────────────────────────────────────────┐
│         🍞 Calculadora de Pão 🎉       │
│    Gerencie seus produtos com alegria! │
└─────────────────────────────────────────┘
         ┌────────┬────────┐
         │   5    │  33.5  │  <- Estatísticas
         │ Itens  │ Total  │
         └────────┴────────┘

┌─────────────────────────────────────────┐
│ 🔍 Pesquisar itens...                  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 🍞 PÃO                                  │
├─────────────────────────────────────────┤
│ Pão de Fermentação Natural              │
│ 5 kg              [−] [+] [🗑️]          │
│─────────────────────────────────────────│
│ Croissants                              │
│ 2 dúzia          [−] [+] [🗑️]          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 🥐 PASTEL                               │
├─────────────────────────────────────────┤
│ Biscoito de Chocolate                   │
│ 3 dúzia           [−] [+] [🗑️]          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 🎂 BOLO                                 │
├─────────────────────────────────────────┤
│ Bolo de Baunilha                        │
│ 2 unid            [−] [+] [🗑️]          │
└─────────────────────────────────────────┘

        [     ➕ ADICIONAR ITEM     ]

┌─────────────────────────────────────────┐
│ MODAL: Adicionar Novo Item              │
├─────────────────────────────────────────┤
│ Nome: [____________________]            │
│ Qtd: [______]  Unid: [______]           │
│                                         │
│ Categoria:                              │
│ [🍞 Pão] [🥐 Pastel] [🍪 Biscoito]     │
│ [🎂 Bolo] [🍩 Rosquinha] [🥖 Outro]     │
│                                         │
│ [❌ CANCELAR]  [✅ ADICIONAR]           │
└─────────────────────────────────────────┘

Cores da Interface:
- Fundo Principal: #FFF9E6 (Creme)
- Header: #FF8C42 (Laranja)
- Destaques: #FFD700 (Ouro)
- Botões Ação: #95E1D3 (Verde)
- Deletar: #FF6B6B (Vermelho)
- Texto: #333 (Cinza escuro)
```

---

## 📊 Fluxo de Dados da Aplicação

```
┌─────────────────────┐
│   Estado Inicial    │
│  (SAMPLE_ITEMS)     │
└──────────┬──────────┘
           │
    ┌──────▼────────┐
    │  Items State  │
    └──────┬────────┘
           │
    ┌──────┴────────────────────┐
    │                           │
▼─────────────────┐  ▼─────────────────────┐
│ Filtrar         │  │ Agrupar por         │
│ (searchQuery)   │  │ Categoria           │
└────────┬────────┘  └─────────┬───────────┘
         │                     │
         └──────────┬──────────┘
                    │
              ▼─────────────────┐
              │  Renderizar     │
              │  Categorizado   │
              └─────────────────┘
```

---

## 📱 Especificações de Build

### Android Minimo
- Min SDK: 21 (Android 5.0)
- Target SDK: 34 (Android 14)

### Tamanho Estimado
- APK: ~40-50 MB (desenvolvimento)
- APK Release: ~25-30 MB (otimizado)

### Permissões Necessárias
- INTERNET (nuvem/sincronização futura)
- WRITE_EXTERNAL_STORAGE (exportação de dados)

---

## 📝 Próximos Passos

1. ✅ **Fazer Login no Expo** (criar conta em expo.dev)
2. ✅ **Executar `eas build`** para gerar APK
3. ✅ **Testar em dispositivo real** 
4. ⏳ **Adicionar ícone e splash screen** customizados
5. ⏳ **Implementar persistência de dados** (AsyncStorage)
6. ⏳ **Adicionar sincronização em nuvem**
7. ⏳ **Publicar na Google Play Store**

---

## 🆘 Troubleshooting

### Problema: "expo: command not found"
```powershell
npm install -g expo-cli
```

### Problema: Erro de autenticação Expo
```powershell
expo logout
expo login
```

### Problema: Porta 19000 em uso
```powershell
expo start -c # Clear cache
```

### Problema: APK não instala
- Verifique a versão do Android do dispositivo (mín 21)
- Ative "Instalar de fontes desconhecidas" nas configurações

---

## 📚 Referências

- Expo Docs: https://docs.expo.dev
- React Native: https://reactnative.dev
- Android Build Guide: https://docs.expo.dev/build/setup
- EAS Build: https://docs.expo.dev/build/introduction

---

**Desenvolvido com ❤️ para padarias alegres! 🍞**
