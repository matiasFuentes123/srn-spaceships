import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { fetchSpaceships } from '../services/api';
import { Spaceship } from '../types/spaceship';
import { ImageBackground } from 'react-native';

export default function SpaceshipDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [spaceship, setSpaceship] = useState<Spaceship | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSpaceshipDetail();
  }, [id]);

  const loadSpaceshipDetail = async () => {
    try {
      setLoading(true);
      const spaceships = await fetchSpaceships();
      const foundShip = spaceships?.find((ship) => ship.id === Number(id));
      setSpaceship(foundShip || null);
    } catch (error) {
      console.error('Error loading spaceship detail:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Cargando detalles...</Text>
      </View>
    );
  }

  if (!spaceship) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Nave no encontrada</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.content}
      resizeMode="cover">
      {/* <View style={styles.card}> */}
        <Text style={styles.title}>{spaceship.name}</Text>

      {/* </View> */}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>ID de la Nave</Text>
        <Text style={styles.sectionContent}>#{spaceship.id}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Descripción Completa</Text>
        <Text style={styles.description}>{spaceship.description}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.infoLabel}>Facción</Text>
        <Text style={styles.infoValue}>{spaceship.faction}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 32,
  },
  factionBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  factionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
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
});
