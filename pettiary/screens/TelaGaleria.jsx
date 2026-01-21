import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Modal,
  StatusBar,
  TextInput
} from 'react-native';
import { 
  Text, 
  FAB,
  IconButton,
  Snackbar,
  Portal,
  ActivityIndicator
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');
const numColumns = 2;
const imageSize = (width - 48) / numColumns;

const GalleryScreen = ({ navigation, photos, setPhotos }) => {
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
  }, []);

  const pickImageFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de acesso à galeria para adicionar fotos.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newPhoto = {
          id: Date.now().toString(),
          uri: result.assets[0].uri,
          petName: 'Novo Pet',
          petType: 'others',
          date: new Date().toISOString().split('T')[0]
        };
        
        setPhotos([newPhoto, ...photos]);
        showSnackbar('Foto adicionada com sucesso!');
      }
    } catch (error) {
      showSnackbar('Erro ao selecionar foto');
      console.error(error);
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de acesso à câmera para tirar fotos.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newPhoto = {
          id: Date.now().toString(),
          uri: result.assets[0].uri,
          petName: 'Novo Pet',
          petType: 'others',
          date: new Date().toISOString().split('T')[0]
        };
        
        const updatedPhotos = [newPhoto, ...photos];
        setPhotos(updatedPhotos);
        console.log('Salvando fotos da galeria:', updatedPhotos.length, 'fotos');
        await AsyncStorage.setItem('@gallery_photos', JSON.stringify(updatedPhotos));
        console.log('Fotos da galeria salvas com sucesso');
        showSnackbar('Foto adicionada com sucesso!');
      }
    } catch (error) {
      showSnackbar('Erro ao tirar foto');
      console.error(error);
    }
  };

  const showAddPhotoOptions = () => {
    Alert.alert(
      'Adicionar Foto',
      'Escolha uma opção',
      [
        {
          text: 'Câmera',
          onPress: takePhoto,
        },
        {
          text: 'Galeria',
          onPress: pickImageFromGallery,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  };

  const deletePhoto = (photoId) => {
    Alert.alert(
      'Deletar Foto',
      'Tem certeza que deseja deletar esta foto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedPhotos = photos.filter(photo => photo.id !== photoId);
              setPhotos(updatedPhotos);
              setSelectedPhoto(null);
              showSnackbar('Foto deletada com sucesso');
            } catch (error) {
              showSnackbar('Erro ao deletar foto');
              console.error(error);
            }
          },
        },
      ]
    );
  };

  const renamePhoto = (photoId, currentName) => {
    Alert.prompt(
      'Renomear Foto',
      'Digite o novo nome:',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Salvar',
          onPress: (newName) => {
            if (newName && newName.trim()) {
              const updatedPhotos = photos.map(photo => 
                photo.id === photoId 
                  ? { ...photo, petName: newName.trim() }
                  : photo
              );
              setPhotos(updatedPhotos);
              setSelectedPhoto(prev => prev ? { ...prev, petName: newName.trim() } : null);
              showSnackbar('Nome atualizado com sucesso');
            }
          },
        },
      ],
      'plain-text',
      currentName
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    // Se a data está no formato yyyy-mm-dd
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const renderPhotoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.photoContainer}
      onPress={() => setSelectedPhoto(item)}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.photo}
        resizeMode="cover"
      />
      <View style={styles.photoOverlay}>
        <Text style={styles.petName} numberOfLines={1}>
          {item.petName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="photo-library" size={80} color="#C4B5A0" />
      <Text style={styles.emptyText}>Nenhuma foto encontrada</Text>
      <Text style={styles.emptySubtext}>
        Toque no botão + para adicionar fotos dos seus pets
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E1D8CF" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#2C1810" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="collections" size={28} color="#362013" />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Galeria de Fotos</Text>
            <Text style={styles.subtitle}>{photos.length} {photos.length === 1 ? 'foto' : 'fotos'}</Text>
          </View>
        </View>
        <View style={styles.placeholder} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#9B7653" />
          <Text style={styles.loadingText}>Carregando fotos...</Text>
        </View>
      ) : (
        <FlatList
          data={photos}
          renderItem={renderPhotoItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.gridContainer}
          ListEmptyComponent={renderEmptyState}
          key={numColumns}
        />
      )}

      <Modal
        visible={!!selectedPhoto}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedPhoto(null)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setSelectedPhoto(null)}
          >
            <View style={styles.modalContent}>
              {selectedPhoto && (
                <>
                  <Image
                    source={{ uri: selectedPhoto.uri }}
                    style={styles.fullPhoto}
                    resizeMode="contain"
                  />
                  <View style={styles.photoInfo}>
                    <View style={styles.photoInfoText}>
                      <TouchableOpacity onPress={() => renamePhoto(selectedPhoto.id, selectedPhoto.petName)}>
                        <Text style={styles.modalPetName}>{selectedPhoto.petName}</Text>
                        <Text style={styles.editHint}>Toque para editar</Text>
                      </TouchableOpacity>
                      <Text style={styles.modalDate}>{formatDate(selectedPhoto.date)}</Text>
                    </View>
                  </View>
                  <View style={styles.modalActionsLeft}>
                    <TouchableOpacity 
                      onPress={() => setSelectedPhoto(null)}
                      style={styles.iconButton}
                    >
                      <MaterialIcons name="close" size={30} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalActionsRight}>
                    <TouchableOpacity 
                      onPress={() => deletePhoto(selectedPhoto.id)}
                      style={styles.iconButton}
                    >
                      <MaterialIcons name="delete" size={28} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <FAB
        icon="camera-plus"
        style={styles.fab}
        onPress={showAddPhotoOptions}
        color="#fff"
      />

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1D8CF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D5C0AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C1810',
  },
  subtitle: {
    fontSize: 12,
    color: '#7D5E42',
    marginTop: 2,
  },
  placeholder: {
    width: 40,
  },
  gridContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  photoContainer: {
    width: imageSize,
    height: imageSize * 1.2,
    margin: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F5F0E8',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: 12,
  },
  petName: {
    color: '#2C1810',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    backgroundColor: 'rgba(241, 236, 228, 0.95)',
    paddingVertical: 8,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#4A3829',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A3829',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#7D5E42',
    textAlign: 'center',
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(44, 24, 16, 0.95)',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
  },
  fullPhoto: {
    width: '100%',
    height: '70%',
  },
  photoInfo: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(44, 24, 16, 0.85)',
    padding: 16,
  },
  photoInfoText: {
    flex: 1,
  },
  modalPetName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  editHint: {
    color: '#D9C4B0',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 2,
  },
  modalDate: {
    color: '#D9C4B0',
    fontSize: 14,
    marginTop: 8,
  },
  modalActionsLeft: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  modalActionsRight: {
    position: 'absolute',
    top: 40,
    right: 16,
  },
  iconButton: {
    padding: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#9B7653',
  },
});

export default GalleryScreen;
