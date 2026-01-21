import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  RefreshControl,
  ScrollView 
} from 'react-native';
import { 
  Text, 
  Searchbar,
  Chip,
  Snackbar,
  Portal,
  ActivityIndicator
} from 'react-native-paper';
import PetCard from '../components/display/CartaoPet';
import StatCard from '../components/display/CartaoEstatistica';
import Header from '../components/navigation/Cabecalho';
import FloatingActionButton from '../components/ui/BotaoAcaoFlutuante';
import ConfirmDialog from '../components/ui/DialogoConfirmacao';
import { petService } from '../services/petService';

const HomeScreen = ({ navigation }) => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ visible: false, pet: null });

  useEffect(() => {
    loadPets();
  }, []);

  useEffect(() => {
    filterPets();
  }, [searchQuery, selectedFilter, pets]);

  const loadPets = async () => {
    try {
      setLoading(true);
      const response = await petService.getAllPets();
      setPets(response.data || []);
    } catch (error) {
      showSnackbar('Erro ao carregar pets');
      console.error('Erro ao carregar pets:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterPets = () => {
    let filtered = pets;

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(pet => pet.species === selectedFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(pet =>
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPets(filtered);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadPets();
  };

  const handleDeletePet = async () => {
    if (!deleteDialog.pet) return;

    try {
      await petService.deletePet(deleteDialog.pet.id);
      showSnackbar(`${deleteDialog.pet.name} foi removido`);
      loadPets();
    } catch (error) {
      showSnackbar('Erro ao deletar pet');
      console.error('Erro ao deletar pet:', error);
    } finally {
      setDeleteDialog({ visible: false, pet: null });
    }
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const getSpeciesCounts = () => {
    const counts = {};
    pets.forEach(pet => {
      counts[pet.species] = (counts[pet.species] || 0) + 1;
    });
    return counts;
  };

  const speciesCounts = getSpeciesCounts();

  const filters = [
    { label: 'Todos', value: 'all', icon: 'paw' },
    { label: 'Cães', value: 'dog', icon: 'dog', count: speciesCounts.dog || 0 },
    { label: 'Gatos', value: 'cat', icon: 'cat', count: speciesCounts.cat || 0 },
    { label: 'Pássaros', value: 'bird', icon: 'bird', count: speciesCounts.bird || 0 },
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Pettiary" subtitle="Gerencie seus pets" />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Carregando pets...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header 
        title="Pettiary" 
        subtitle={`${pets.length} ${pets.length === 1 ? 'pet' : 'pets'}`}
        showMenu
        menuItems={[
          { icon: 'refresh', title: 'Atualizar', onPress: loadPets },
          { icon: 'cog', title: 'Configurações', onPress: () => {} },
        ]}
      />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <StatCard
            title="Total de Pets"
            value={pets.length}
            icon="🐾"
            color="#6200EE"
          />
          <StatCard
            title="Cães"
            value={speciesCounts.dog || 0}
            icon="🐕"
            color="#FF6B35"
          />
          <StatCard
            title="Gatos"
            value={speciesCounts.cat || 0}
            icon="🐈"
            color="#6A4C93"
          />
        </View>

        {/* Barra de busca */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Buscar pets..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
            icon="magnify"
          />
        </View>

        {/* Filtros */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {filters.map((filter) => (
            <Chip
              key={filter.value}
              selected={selectedFilter === filter.value}
              onPress={() => setSelectedFilter(filter.value)}
              icon={filter.icon}
              style={styles.filterChip}
              showSelectedOverlay
            >
              {filter.label} {filter.count !== undefined && `(${filter.count})`}
            </Chip>
          ))}
        </ScrollView>

        {/* Lista de Pets */}
        {filteredPets.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text variant="headlineSmall" style={styles.emptyTitle}>
              {searchQuery || selectedFilter !== 'all' 
                ? 'Nenhum pet encontrado' 
                : 'Nenhum pet cadastrado'}
            </Text>
            <Text variant="bodyMedium" style={styles.emptySubtitle}>
              {searchQuery || selectedFilter !== 'all'
                ? 'Tente ajustar os filtros'
                : 'Adicione seu primeiro pet usando o botão +'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredPets}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PetCard
                pet={item}
                onPress={() => console.log('Ver detalhes:', item.name)}
                onEdit={(pet) => console.log('Editar:', pet.name)}
                onDelete={(pet) => setDeleteDialog({ visible: true, pet })}
              />
            )}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </ScrollView>

      {/* Botão Flutuante */}
      <FloatingActionButton
        icon="plus"
        actions={[
          {
            icon: 'dog',
            label: 'Adicionar Cão',
            onPress: () => console.log('Adicionar cão'),
          },
          {
            icon: 'cat',
            label: 'Adicionar Gato',
            onPress: () => console.log('Adicionar gato'),
          },
          {
            icon: 'bird',
            label: 'Adicionar Pássaro',
            onPress: () => console.log('Adicionar pássaro'),
          },
        ]}
      />

      {/* Dialog de Confirmação */}
      <ConfirmDialog
        visible={deleteDialog.visible}
        title="Deletar Pet"
        message={`Tem certeza que deseja remover ${deleteDialog.pet?.name}? Esta ação não pode ser desfeita.`}
        onConfirm={handleDeletePet}
        onCancel={() => setDeleteDialog({ visible: false, pet: null })}
      />

      {/* Snackbar */}
      <Portal>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          action={{
            label: 'OK',
            onPress: () => setSnackbarVisible(false),
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchbar: {
    elevation: 2,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  filterChip: {
    marginRight: 8,
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    opacity: 0.7,
    textAlign: 'center',
  },
});

export default HomeScreen;
