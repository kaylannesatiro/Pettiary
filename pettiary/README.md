# 🐾 Pettiary - Diário de Pets

Aplicativo mobile para gerenciar informações e atividades dos seus pets, construído com React Native e Material Design 3.

## 📱 Frontend (React Native)

### Estrutura de Pastas

```
pettiary/
├── App.js                      # Ponto de entrada do app
├── package.json               # Dependências do frontend
├── screens/                   # Telas do aplicativo
│   └── HomeScreen.jsx        # Tela inicial com lista de pets
├── components/               # Componentes reutilizáveis
│   ├── display/             # Componentes de visualização
│   │   ├── Card.jsx         # Card genérico (original)
│   │   ├── PetCard.jsx      # Card de pet individual
│   │   ├── ActivityCard.jsx # Card de atividade
│   │   └── StatCard.jsx     # Card de estatísticas
│   ├── inputs/              # Componentes de entrada
│   │   └── SearchBar.jsx    # Barra de busca (original)
│   ├── ui/                  # Componentes de UI
│   │   ├── Button.jsx       # Botão genérico (original)
│   │   ├── CustomButton.jsx # Botão customizado MD3
│   │   ├── FloatingActionButton.jsx # FAB do Material Design
│   │   └── ConfirmDialog.jsx # Dialog de confirmação
│   ├── navigation/          # Componentes de navegação
│   │   ├── Menu.jsx        # Menu (original)
│   │   └── Header.jsx      # Header com AppBar MD3
│   └── modules/            # Módulos complexos
│       └── Calendar.jsx    # Calendário (original)
├── services/               # Serviços de API
│   ├── api.js             # Configuração do Axios
│   └── petService.js      # Serviços de pets e atividades
└── assets/                # Imagens e recursos
```

### 🎨 Componentes Criados

#### 1. **PetCard** (`components/display/PetCard.jsx`)
- Exibe informações do pet (foto, nome, raça, idade)
- Botões de edição e exclusão
- Ícone automático baseado na espécie
- Borda colorida customizável

#### 2. **ActivityCard** (`components/display/ActivityCard.jsx`)
- Card para atividades (alimentação, passeio, veterinário, etc.)
- Checkbox para marcar como concluída
- Chip colorido por tipo de atividade
- Ícones específicos para cada tipo

#### 3. **StatCard** (`components/display/StatCard.jsx`)
- Cards de estatísticas com ícones
- Barra de progresso opcional
- Cores customizáveis

#### 4. **Header** (`components/navigation/Header.jsx`)
- AppBar do Material Design 3
- Menu de opções opcional
- Suporte a subtítulo e botão voltar

#### 5. **FloatingActionButton** (`components/ui/FloatingActionButton.jsx`)
- FAB com múltiplas ações
- Suporte a labels
- Animações do Material Design

#### 6. **ConfirmDialog** (`components/ui/ConfirmDialog.jsx`)
- Modal de confirmação
- Ações de confirmar/cancelar

### 🚀 Como Executar o Frontend

```bash
# Instalar dependências
npm install

# Iniciar o Expo
npm start

# Ou executar diretamente
npm run android  # Para Android
npm run ios      # Para iOS
npm run web      # Para Web
```

### ⚙️ Configuração da API

Edite o arquivo `services/api.js` para configurar o endereço do backend:

```javascript
// Para emulador Android
const API_BASE_URL = 'http://10.0.2.2:3000/api';

// Para dispositivo físico (use o IP do seu computador)
const API_BASE_URL = 'http://192.168.x.x:3000/api';

// Para iOS ou Web
const API_BASE_URL = 'http://localhost:3000/api';
```

---

## 🖥️ Backend (Node.js + Express)

### Estrutura de Pastas

```
backend/
├── server.js              # Servidor Express
├── package.json          # Dependências do backend
├── models/              # Modelos de dados
│   ├── Pet.js          # Modelo de Pet
│   └── Activity.js     # Modelo de Atividade
├── controllers/        # Lógica de negócio
│   ├── petController.js
│   └── activityController.js
├── routes/            # Rotas da API
│   ├── petRoutes.js
│   └── activityRoutes.js
└── README.md         # Documentação da API
```

### 🚀 Como Executar o Backend

```bash
# Navegar para a pasta do backend
cd backend

# Instalar dependências
npm install

# Iniciar em modo desenvolvimento (com auto-reload)
npm run dev

# Ou iniciar em modo produção
npm start
```

O servidor iniciará em `http://localhost:3000`

### 📚 API Endpoints

#### Pets
- `GET /api/pets` - Listar todos os pets
- `GET /api/pets/:id` - Buscar pet por ID
- `POST /api/pets` - Criar novo pet
- `PUT /api/pets/:id` - Atualizar pet
- `DELETE /api/pets/:id` - Deletar pet

#### Atividades
- `GET /api/activities` - Listar atividades
- `GET /api/activities?petId=xxx` - Filtrar por pet
- `POST /api/activities` - Criar atividade
- `PATCH /api/activities/:id/toggle` - Marcar como concluída
- `PUT /api/activities/:id` - Atualizar atividade
- `DELETE /api/activities/:id` - Deletar atividade

---

## 🎨 Material Design 3

O app utiliza `react-native-paper` v5+ com Material Design 3:

### Cores do Tema
- **Primary:** #6200EE (Roxo)
- **Secondary:** #03DAC6 (Ciano)
- **Tertiary:** #FF6B35 (Laranja)
- **Error:** #B00020 (Vermelho)
- **Background:** #F5F5F5 (Cinza claro)

### Componentes Utilizados
- Card (elevated mode)
- FAB (Floating Action Button)
- Chip (filtros)
- Searchbar
- Snackbar
- Modal/Portal
- Avatar
- IconButton
- ProgressBar
- Appbar

---

## 🔄 Fluxo de Dados

1. **Frontend** faz requisição via `petService.js`
2. **Axios** envia request para o backend
3. **Express** roteia para o controller apropriado
4. **Controller** executa lógica e manipula dados
5. **Response** retorna dados para o frontend
6. **UI** atualiza com os novos dados

---

## 📦 Dependências Principais

### Frontend
- `expo` - Framework React Native
- `react-native-paper` - Componentes Material Design 3
- `axios` - Cliente HTTP
- `react-native-vector-icons` - Ícones
- `@react-navigation/native` - Navegação (preparado)

### Backend
- `express` - Framework web
- `cors` - Middleware para CORS
- `body-parser` - Parse de requisições
- `uuid` - Geração de IDs únicos
- `nodemon` - Auto-reload (dev)

---

## 🚧 Próximos Passos

### Frontend
1. ✅ Tela inicial com lista de pets
2. ⏳ Tela de detalhes do pet
3. ⏳ Tela de adicionar/editar pet
4. ⏳ Tela de atividades
5. ⏳ Navegação completa com tabs
6. ⏳ Persistência local (AsyncStorage)
7. ⏳ Upload de fotos

### Backend
1. ✅ CRUD de pets
2. ✅ CRUD de atividades
3. ⏳ Banco de dados real (MongoDB/PostgreSQL)
4. ⏳ Autenticação de usuários
5. ⏳ Upload de imagens
6. ⏳ Notificações push
7. ⏳ Lembretes de atividades

---

## 🎯 Recursos Implementados

### ✅ Funcionalidades Atuais
- Lista de pets com cards Material Design 3
- Busca por nome ou raça
- Filtros por espécie (todos, cães, gatos, pássaros)
- Estatísticas (total de pets por espécie)
- Pull to refresh
- Confirmação antes de deletar
- Snackbar para feedback
- FAB com ações rápidas
- API RESTful completa
- Integração frontend-backend

### 🎨 UI/UX
- Design responsivo
- Cores por categoria
- Animações suaves
- Estados de loading
- Tratamento de erros
- Empty states

---

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework mobile
- **Expo** - Toolchain e runtime
- **Material Design 3** - Design system
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework backend
- **Axios** - Cliente HTTP
- **REST API** - Arquitetura de API

---

## 📱 Screenshots

(Adicione screenshots aqui quando executar o app)

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ para amantes de pets!
