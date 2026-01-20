# 🐾 Pettiary Backend API

API RESTful para o aplicativo Pettiary - Gerenciador de Pets.

## 🚀 Como Executar

### Instalação
```bash
cd backend
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

O servidor iniciará na porta 3000 por padrão.

## 📚 Endpoints

### Pets

#### Listar todos os pets
```
GET /api/pets
```

#### Buscar pet por ID
```
GET /api/pets/:id
```

#### Criar novo pet
```
POST /api/pets
Body: {
  "name": "Rex",
  "species": "dog",
  "breed": "Golden Retriever",
  "birthDate": "2020-05-15",
  "photoUrl": "https://...",
  "color": "#FF6B35"
}
```

#### Atualizar pet
```
PUT /api/pets/:id
Body: { campos a atualizar }
```

#### Deletar pet
```
DELETE /api/pets/:id
```

### Atividades

#### Listar atividades
```
GET /api/activities
GET /api/activities?petId=xxx (filtrar por pet)
```

#### Buscar atividade por ID
```
GET /api/activities/:id
```

#### Criar atividade
```
POST /api/activities
Body: {
  "petId": "xxx",
  "type": "feeding",
  "title": "Alimentação",
  "description": "Ração premium",
  "date": "2026-01-17",
  "time": "08:00"
}
```

#### Alternar conclusão
```
PATCH /api/activities/:id/toggle
```

#### Atualizar atividade
```
PUT /api/activities/:id
Body: { campos a atualizar }
```

#### Deletar atividade
```
DELETE /api/activities/:id
```

## 🏗️ Estrutura

```
backend/
├── controllers/      # Lógica de negócio
├── models/          # Modelos de dados
├── routes/          # Definição de rotas
├── server.js        # Configuração do servidor
└── package.json
```

## 📝 Tipos de Atividades

- `feeding` - Alimentação
- `walk` - Passeio
- `vet` - Veterinário
- `grooming` - Banho/Tosa
- `play` - Brincadeira
- `medication` - Medicação
