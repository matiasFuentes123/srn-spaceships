import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { fetchSpaceships } from '../services/api';
import { Spaceship } from '../types/spaceship';
import { filterSpaceshipsByFaction } from '../utils/filterUtils';

export default function HomeScreen() {
  const router = useRouter();
  const [spaceships, setSpaceships] = useState<Spaceship[]>([]);
  const [filteredSpaceships, setFilteredSpaceships] = useState<Spaceship[]>([]);
  const [selectedFaction, setSelectedFaction] = useState<string>('Todas');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSpaceships();
  }, []);

  useEffect(() => {
    filterSpaceships();
  }, [selectedFaction, spaceships]);

  const loadSpaceships = async () => {
    try {
      setLoading(true);
      const data = await fetchSpaceships();
      setSpaceships(data || []);
      setFilteredSpaceships(data || []);
    } catch (error) {
      console.error('Error loading spaceships:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSpaceships = () => {
    const filtered = filterSpaceshipsByFaction(spaceships, selectedFaction);
    setFilteredSpaceships(filtered);
  };

  const renderSpaceshipCard = ({ item }: { item: Spaceship }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardFaction}>{item.faction}</Text>
      </View>
      <Text style={styles.cardDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  const factions = useMemo(() => {
    const uniqueFactions = Array.from(
      new Set(spaceships.map((ship) => ship.faction))
    ).sort();
    return ['Todas', ...uniqueFactions];
  }, [spaceships]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Cargando naves...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.container}
      resizeMode="cover">
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por facción:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedFaction}
            onValueChange={(itemValue) => setSelectedFaction(itemValue)}
            style={styles.picker}
          >
            {factions.map((faction) => (
              <Picker.Item key={faction} label={faction} value={faction} />
            ))}
          </Picker>
        </View>
      </View>

      <FlatList
        data={filteredSpaceships}
        renderItem={renderSpaceshipCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay naves disponibles</Text>
        }
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundImage: 'url(../assets/images/background.pngs)',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  filterContainer: {
    backgroundColor: '#26425a',
    padding: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#fff',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#26425a',
  },
  picker: {
    height: 50,
    color: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#26425a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderColor: '#55738c',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  cardFaction: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 40,
  },
});
