<div align="center">
  
# 🐾 Pettiary

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Expo-~54.0-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Material_Design_3-9B7653?style=for-the-badge&logo=material-design&logoColor=white" />
</p>
</div>

---

## 🎯 Sobre o Projeto

O **Pettiary** é um aplicativo mobile desenvolvido com React Native e Expo, projetado para ajudar tutores a organizar e acompanhar todos os aspectos da vida dos seus pets. Com uma interface moderna baseada no Material Design 3, o app oferece uma experiência intuitiva e visualmente agradável.

### 💡 Por que usar o Pettiary?

- 📅 **Nunca mais esqueça compromissos** - Calendário integrado com lembretes de vacinas, consultas e medicamentos
- 📸 **Memórias organizadas** - Galeria personalizada para cada pet
- 📝 **Diário completo** - Registre atividades, notas e acompanhe o histórico
- 👥 **Múltiplos pets** - Gerencie todos os seus pets em um só lugar

---

## 🛠 Tecnologias

### Frontend

<table>
  <tr>
    <td><b>Core</b></td>
    <td>
      React Native 0.81.5 • 
      Expo ~54.0 • 
      React 19.1.0
    </td>
  </tr>
  <tr>
    <td><b>UI/UX</b></td>
    <td>
      React Native Paper 5.14.5 (Material Design 3) • 
      React Native Vector Icons • 
      Expo Image Picker
    </td>
  </tr>
  <tr>
    <td><b>Navegação</b></td>
    <td>
      React Navigation 6.1.10 • 
      Bottom Tabs • 
      Safe Area Context
    </td>
  </tr>
  <tr>
    <td><b>Integração</b></td>
    <td>
      Axios • 
      Async Storage • 
      Google Generative AI (Gemini)
    </td>
  </tr>
</table>

### Backend

<table>
  <tr>
    <td><b>Servidor</b></td>
    <td>Node.js • Express 4.18.2</td>
  </tr>
  <tr>
    <td><b>Middleware</b></td>
    <td>CORS • Body Parser</td>
  </tr>
  <tr>
    <td><b>Desenvolvimento</b></td>
    <td>Nodemon</td>
  </tr>
</table>

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 16 ou superior) - [Download](https://nodejs.org/)
- **npm** ou **yarn** - Gerenciador de pacotes
- **Expo CLI** - `npm install -g expo-cli`
- **Git** - [Download](https://git-scm.com/)

### Para testar no dispositivo móvel:
- **Expo Go** - Disponível na [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) e [App Store](https://apps.apple.com/app/expo-go/id982107779)

### Para emuladores (opcional):
- **Android Studio** (para emulador Android) - [Download](https://developer.android.com/studio)

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/pettiary.git
cd pettiary
```

### 2. Instale as dependências do Frontend

```bash
# Na raiz do projeto
npm install
```

### 3. Instale as dependências do Backend

```bash
cd backend
npm install
cd ..
```

---

## ▶️ Como Executar

### 🔧 Iniciando o Backend

```bash
# Entre na pasta do backend
cd backend

# Inicie o servidor
npm start
# ou para modo de desenvolvimento com auto-reload
npm run dev

# O servidor estará rodando em http://localhost:3000
```

### 📱 Iniciando o Frontend

Em um **novo terminal**, na pasta raiz do projeto:

```bash
# Inicie o Expo
npm start
```

Após executar o comando, você verá um QR Code no terminal. Escolha uma das opções:

#### Opção 1: Dispositivo Físico (Recomendado)
1. Abra o app **Expo Go** no seu celular
2. Escaneie o QR Code exibido no terminal
3. Aguarde o app carregar

#### Opção 2: Emuladores
```bash
# Android
npm run android

# iOS (apenas macOS)
npm run ios

# Web
npm run web
```

---

<div align="center">

<p>Desenvolvido com ❤️ e 🐾 por <b>Carla</b> e <b>Kaylanne</b></p>

</div>



