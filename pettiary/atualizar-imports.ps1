# Script para atualizar imports

$base = "c:\Users\kayla\Documentos\Dev\Mobile\Pettyary\Pettiary\pettiary"

# Mapeamento de substituicoes
$substituicoes = @{
    "from './components/contexts/Pets.Context'" = "from './components/contexts/Pets.Contexto'"
    "from '../contexts/Pets.Context'" = "from '../contexts/Pets.Contexto'"
    "from './components/display/ActivityCard'" = "from './components/display/CartaoAtividade'"
    "from '../display/ActivityCard'" = "from '../display/CartaoAtividade'"
    "from './components/display/Card'" = "from './components/display/Cartao'"
    "from '../display/Card'" = "from '../display/Cartao'"
    "from './components/display/EventCard'" = "from './components/display/CartaoEvento'"
    "from '../display/EventCard'" = "from '../display/CartaoEvento'"
    "from './components/display/PetCard'" = "from './components/display/CartaoPet'"
    "from '../display/PetCard'" = "from '../display/CartaoPet'"
    "from './components/display/StatCard'" = "from './components/display/CartaoEstatistica'"
    "from '../display/StatCard'" = "from '../display/CartaoEstatistica'"
    "from './components/inputs/SearchBar'" = "from './components/inputs/BarraPesquisa'"
    "from '../inputs/SearchBar'" = "from '../inputs/BarraPesquisa'"
    "from './components/modules/Calendar'" = "from './components/modules/Calendario'"
    "from '../modules/Calendar'" = "from '../modules/Calendario'"
    "from './components/navigation/BottomNav'" = "from './components/navigation/NavegacaoInferior'"
    "from '../navigation/BottomNav'" = "from '../navigation/NavegacaoInferior'"
    "from './components/navigation/Header'" = "from './components/navigation/Cabecalho'"
    "from '../navigation/Header'" = "from '../navigation/Cabecalho'"
    "from './components/ui/ActionButton'" = "from './components/ui/BotaoAcao'"
    "from '../ui/ActionButton'" = "from '../ui/BotaoAcao'"
    "from './components/ui/Button'" = "from './components/ui/Botao'"
    "from '../ui/Button'" = "from '../ui/Botao'"
    "from './components/ui/ChangePasswordModal'" = "from './components/ui/ModalMudarSenha'"
    "from '../ui/ChangePasswordModal'" = "from '../ui/ModalMudarSenha'"
    "from './components/ui/ConfirmDialog'" = "from './components/ui/DialogoConfirmacao'"
    "from '../ui/ConfirmDialog'" = "from '../ui/DialogoConfirmacao'"
    "from './components/ui/CustomButton'" = "from './components/ui/BotaoCustomizado'"
    "from '../ui/CustomButton'" = "from '../ui/BotaoCustomizado'"
    "from './components/ui/EditProfileModal'" = "from './components/ui/ModalEditarPerfil'"
    "from '../ui/EditProfileModal'" = "from '../ui/ModalEditarPerfil'"
    "from './components/ui/FloatingActionButton'" = "from './components/ui/BotaoAcaoFlutuante'"
    "from '../ui/FloatingActionButton'" = "from '../ui/BotaoAcaoFlutuante'"
    "from './components/ui/InfoTag'" = "from './components/ui/EtiquetaInfo'"
    "from '../ui/InfoTag'" = "from '../ui/EtiquetaInfo'"
    "from './components/ui/PetHeader'" = "from './components/ui/CabecalhoPet'"
    "from '../ui/PetHeader'" = "from '../ui/CabecalhoPet'"
    "from './components/ui/QuickActionButton'" = "from './components/ui/BotaoAcaoRapida'"
    "from '../ui/QuickActionButton'" = "from '../ui/BotaoAcaoRapida'"
    "from './screens/AddPetScreen'" = "from './screens/TelaAdicionarPet'"
    "from '../screens/AddPetScreen'" = "from '../screens/TelaAdicionarPet'"
    "from './screens/ChatBotScreen'" = "from './screens/TelaChatBot'"
    "from '../screens/ChatBotScreen'" = "from '../screens/TelaChatBot'"
    "from './screens/ConfigScreen'" = "from './screens/TelaConfig'"
    "from '../screens/ConfigScreen'" = "from '../screens/TelaConfig'"
    "from './screens/DiaryListScreen'" = "from './screens/TelaListaDiarios'"
    "from '../screens/DiaryListScreen'" = "from '../screens/TelaListaDiarios'"
    "from './screens/EditPetScreen'" = "from './screens/TelaEditarPet'"
    "from '../screens/EditPetScreen'" = "from '../screens/TelaEditarPet'"
    "from './screens/GalleryScreen'" = "from './screens/TelaGaleria'"
    "from '../screens/TelaGaleria'" = "from '../screens/TelaGaleria'"
    "from './screens/HomeScreen'" = "from './screens/TelaPrincipal'"
    "from '../screens/HomeScreen'" = "from '../screens/TelaPrincipal'"
    "from './screens/InitialScreen'" = "from './screens/TelaInicial'"
    "from '../screens/InitialScreen'" = "from '../screens/TelaInicial'"
    "from './screens/NotesScreen'" = "from './screens/TelaNotas'"
    "from '../screens/NotesScreen'" = "from '../screens/TelaNotas'"
    "from './screens/PetDiaryScreen'" = "from './screens/TelaDiarioPet'"
    "from '../screens/PetDiaryScreen'" = "from '../screens/TelaDiarioPet'"
    "from './screens/PetInfoScreen'" = "from './screens/TelaInfoPet'"
    "from '../screens/PetInfoScreen'" = "from '../screens/TelaInfoPet'"
    "from './screens/RegistredPetsScreen'" = "from './screens/TelaPetsRegistrados'"
    "from '../screens/RegistredPetsScreen'" = "from '../screens/TelaPetsRegistrados'"
    "from './components/screen/AddPetScreen'" = "from './screens/TelaAdicionarPet'"
    "from './components/screen/DiaryListScreen'" = "from './screens/TelaListaDiarios'"
    "from './components/screen/EditPetScreen'" = "from './screens/TelaEditarPet'"
    "from './components/screen/PetDiaryScreen'" = "from './screens/TelaDiarioPet'"
    "from './components/screen/PetInfoScreen'" = "from './screens/TelaInfoPet'"
    "from './components/screen/RegistredPetsScreen'" = "from './screens/TelaPetsRegistrados'"
}

# Buscar todos arquivos .js e .jsx
$arquivos = Get-ChildItem -Path $base -Recurse -Include "*.js","*.jsx" | Where-Object { $_.FullName -notlike "*node_modules*" }

$totalSubstituicoes = 0

foreach ($arquivo in $arquivos) {
    $conteudo = Get-Content -Path $arquivo.FullName -Raw -Encoding UTF8
    $conteudoOriginal = $conteudo
    
    foreach ($sub in $substituicoes.GetEnumerator()) {
        $conteudo = $conteudo -replace [regex]::Escape($sub.Key), $sub.Value
    }
    
    if ($conteudo -ne $conteudoOriginal) {
        Set-Content -Path $arquivo.FullName -Value $conteudo -Encoding UTF8 -NoNewline
        Write-Host "Atualizado: $($arquivo.Name)"
        $totalSubstituicoes++
    }
}

Write-Host "Total de arquivos atualizados: $totalSubstituicoes"
