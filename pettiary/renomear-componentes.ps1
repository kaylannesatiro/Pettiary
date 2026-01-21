# Script para renomear componentes para português

$base = "c:\Users\kayla\Documentos\Dev\Mobile\Pettyary\Pettiary\pettiary"

# Mapeamento de renomeações
$renomeacoes = @{
    # display
    "components\display\ActivityCard.jsx" = "components\display\CartaoAtividade.jsx"
    "components\display\Card.jsx" = "components\display\Cartao.jsx"
    "components\display\EventCard.jsx" = "components\display\CartaoEvento.jsx"
    "components\display\PetCard.jsx" = "components\display\CartaoPet.jsx"
    "components\display\StatCard.jsx" = "components\display\CartaoEstatistica.jsx"
    
    # inputs
    "components\inputs\SearchBar.jsx" = "components\inputs\BarraPesquisa.jsx"
    
    # modules
    "components\modules\Calendar.jsx" = "components\modules\Calendario.jsx"
    
    # navigation
    "components\navigation\BottomNav.jsx" = "components\navigation\NavegacaoInferior.jsx"
    "components\navigation\Header.jsx" = "components\navigation\Cabecalho.jsx"
    "components\navigation\Menu.jsx" = "components\navigation\Menu.jsx"
    
    # ui
    "components\ui\ActionButton.jsx" = "components\ui\BotaoAcao.jsx"
    "components\ui\Button.jsx" = "components\ui\Botao.jsx"
    "components\ui\ChangePasswordModal.jsx" = "components\ui\ModalMudarSenha.jsx"
    "components\ui\ConfirmDialog.jsx" = "components\ui\DialogoConfirmacao.jsx"
    "components\ui\CustomButton.jsx" = "components\ui\BotaoCustomizado.jsx"
    "components\ui\EditProfileModal.jsx" = "components\ui\ModalEditarPerfil.jsx"
    "components\ui\FloatingActionButton.jsx" = "components\ui\BotaoAcaoFlutuante.jsx"
    "components\ui\InfoTag.jsx" = "components\ui\EtiquetaInfo.jsx"
    "components\ui\PetHeader.jsx" = "components\ui\CabecalhoPet.jsx"
    "components\ui\QuickActionButton.jsx" = "components\ui\BotaoAcaoRapida.jsx"
    
    # screens
    "screens\AddPetScreen.jsx" = "screens\TelaAdicionarPet.jsx"
    "screens\ChatBotScreen.jsx" = "screens\TelaChatBot.jsx"
    "screens\ConfigScreen.jsx" = "screens\TelaConfig.jsx"
    "screens\DiaryListScreen.jsx" = "screens\TelaListaDiarios.jsx"
    "screens\EditPetScreen.jsx" = "screens\TelaEditarPet.jsx"
    "screens\GalleryScreen.jsx" = "screens\TelaGaleria.jsx"
    "screens\HomeScreen.jsx" = "screens\TelaPrincipal.jsx"
    "screens\InitialScreen.jsx" = "screens\TelaInicial.jsx"
    "screens\NotesScreen.jsx" = "screens\TelaNotas.jsx"
    "screens\PetDiaryScreen.jsx" = "screens\TelaDiarioPet.jsx"
    "screens\PetInfoScreen.jsx" = "screens\TelaInfoPet.jsx"
    "screens\RegistredPetsScreen.jsx" = "screens\TelaPetsRegistrados.jsx"
}

foreach ($item in $renomeacoes.GetEnumerator()) {
    $origem = Join-Path $base $item.Key
    $destino = Join-Path $base $item.Value
    
    if (Test-Path $origem) {
        Rename-Item -Path $origem -NewName (Split-Path $destino -Leaf)
        Write-Host "Renomeado: $($item.Key) -> $($item.Value)"
    } else {
        Write-Host "Nao encontrado: $($item.Key)"
    }
}

Write-Host "Renomeacao concluida!"
