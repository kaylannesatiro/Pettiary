# 🐾 Pettiary - Interface Terrosa

## 🎨 Paleta de Cores Implementada

Baseada na imagem fornecida, com tons terrosos e acolhedores:

```javascript
{
  primary: '#8B6F47',        // Marrom principal dos botões
  secondary: '#A67C52',      // Marrom mais claro (ações rápidas)
  tertiary: '#6B5742',       // Marrom escuro
  background: '#E8DCC8',     // Bege claro (fundo)
  surface: '#F5EFE6',        // Bege muito claro
  surfaceVariant: '#E8D5C4', // Bege para cards (eventos)
  onPrimary: '#FFFFFF',      // Texto branco em botões
  onBackground: '#3E2723',   // Texto principal marrom escuro
  onSurface: '#4E342E',      // Texto em superfícies
  outline: '#A1887F',        // Bordas
}
```

## 📱 Componentes Criados

### 1. **InitialScreen** (`screens/InitialScreen.jsx`)
Tela inicial completa com:
- ✅ Header "Olá, CK" com ícone de perfil
- ✅ Card de Próximos Eventos com ícone de calendário
- ✅ Seção Ações Rápidas com 4 botões (Medicação, Notas, Refeição, Passeio)
- ✅ Botão Assistente Virtual
- ✅ Botões grandes Diário e Galeria
- ✅ Bottom Navigation (Animais, Inicial, Configurações)

### 2. **EventCard** (`components/display/EventCard.jsx`)
Card bege claro (#E8D5C4) com:
- Ícone de calendário
- Título "Próximos Eventos"
- Lista de eventos com bullets
- Nomes dos pets em destaque

### 3. **QuickActionButton** (`components/ui/QuickActionButton.jsx`)
Botões arredondados marrons com:
- Ícone + texto
- Sombras suaves
- Cores variáveis (marrom claro/escuro)

### 4. **ActionButton** (`components/ui/ActionButton.jsx`)
Botões largos retangulares para:
- Diário
- Galeria
- Com ícones e elevação

### 5. **BottomNav** (`components/navigation/BottomNav.jsx`)
Navegação inferior com:
- 3 abas (Animais, Inicial, Configurações)
- Ícone de casa destacado quando ativo
- Background bege claro
- Efeito de elevação no ícone ativo

## 🚀 Como Executar

```bash
# Se ainda não instalou as dependências
npm install

# Iniciar o app
npm start
```

## 📐 Estrutura Visual

```
┌─────────────────────────────┐
│ Olá, CK              [👤]   │ <- Header
├─────────────────────────────┤
│ 📅 Próximos Eventos         │
│ • Ir ao veterinário (Lua)   │ <- EventCard
│ • Levar para Tosa (Spike)   │
├─────────────────────────────┤
│ ⚡ Ações Rápidas            │
│ [💊 Medicação] [📝 Notas]  │ <- QuickActionButtons
│ [🍖 Refeição]  [🚶 Passeio] │
├─────────────────────────────┤
│ Assistente Virtual     [🤖] │ <- AssistantButton
├─────────────────────────────┤
│ [📖 Diário]                 │ <- ActionButtons
│ [🖼️ Galeria]                │
└─────────────────────────────┘
│ 🐾   🏠   ⚙️               │ <- BottomNav
└─────────────────────────────┘
```

## 🎯 Diferenças da Versão Anterior

| Aspecto | Antes | Agora |
|---------|-------|-------|
| **Cores** | Roxo/Ciano (#6200EE) | Marrom/Bege (#8B6F47) |
| **Layout** | Lista de pets | Dashboard com eventos |
| **Botões** | FAB flutuante | Botões de ação fixos |
| **Navegação** | Sem navegação | Bottom tabs |
| **Tema** | Moderno/vibrante | Acolhedor/terroso |

## 🔧 Customizações Aplicadas

1. **Bordas ultra arredondadas** (roundness: 20)
2. **Sombras suaves** para profundidade
3. **Grid 2x2** para ações rápidas
4. **Ícones do MaterialCommunityIcons**
5. **SafeAreaView** para dispositivos com notch
6. **ScrollView** para conteúdo rolável

## 📦 Ícones Utilizados

- `calendar-month` - Próximos eventos
- `lightning-bolt` - Ações rápidas
- `pill` - Medicação
- `notebook` - Notas
- `food` - Refeição
- `walk` - Passeio
- `robot` - Assistente virtual
- `book-open-page-variant` - Diário
- `image-multiple` - Galeria
- `paw` - Animais
- `home` - Inicial
- `cog` - Configurações

## 🎨 Hierarquia Visual

1. **Header** - Destaque com saudação
2. **Eventos** - Card em destaque (urgente)
3. **Ações Rápidas** - Acesso rápido frequente
4. **Assistente** - Feature especial
5. **Diário/Galeria** - Ações principais
6. **Bottom Nav** - Navegação persistente

Execute o app e veja a interface completa com a paleta terrosa! 🎨✨
