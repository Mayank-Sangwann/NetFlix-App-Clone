import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from '../../style.js';

//DetailsScreen component - Shows detailed information about a movie/show
const DetailsScreen = ({ route }) => {
  const { movie } = route.params;
  const navigation = useNavigation();
  const [imageLoaded, setImageLoaded] = useState(false);

  //Renders the header section with banner image and back button
  const HeaderSection = () => (
    <View style={styles.headerContainer}>
      <View style={styles.imageContainer}>
        {!imageLoaded && (
          <View style={[styles.loadingContainerD, { position: 'absolute', zIndex: 1 }]}>
            <ActivityIndicator size="large" color="#E50914" />
          </View>
        )}
        <Image 
          source={{ uri: movie.image?.original || movie.image?.medium }} 
          style={[styles.banner]}
          onLoadEnd={() => setImageLoaded(true)}
          resizeMode="cover"
        />
      </View>
      <View style={styles.gradient} />
      
      <TouchableOpacity 
        style={styles.backButtonD} 
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  //Renders the movie information row (year, runtime, rating)
  const InfoRow = () => (
    <View style={styles.infoRow}>
      {movie.premiered && (
        <Text style={styles.year}>
          {new Date(movie.premiered).getFullYear()}
        </Text>
      )}
      {movie.averageRuntime && (
        <Text style={styles.runtime}>
          {movie.averageRuntime} min
        </Text>
      )}
      {movie.rating?.average && (
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{movie.rating.average}</Text>
        </View>
      )}
    </View>
  );

  //Renders the action buttons (Play, My List)
  const ActionButtons = () => (
    <View style={styles.actionButtons}>
      <TouchableOpacity style={styles.playButton}>
        <Icon name="play" size={24} color="#000" />
        <Text style={styles.playButtonTextD}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.myListButtonD}>
        <Icon name="add" size={24} color="#fff" />
        <Text style={styles.myListButtonTextD}>My List</Text>
      </TouchableOpacity>
    </View>
  );

  //Renders additional information about the movie/show
  const AdditionalInformation = () => (
    <>
      <View style={styles.additionalInfo}>
        <Text style={styles.infoLabel}>Status: </Text>
        <Text style={styles.infoValue}>{movie.status}</Text>
      </View>
      {movie.network && (
        <View style={styles.additionalInfo}>
          <Text style={styles.infoLabel}>Network: </Text>
          <Text style={styles.infoValue}>{movie.network.name}</Text>
        </View>
      )}
    </>
  );

  //Removes HTML tags from text
  const stripHtmlTags = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/\s{2,}/g, ' ').trim();
  };

  // Make sure we have a movie object
  if (!movie) {
    return (
      <View style={styles.containerD}>
        <Text style={styles.errorText}>No movie data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerD}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <HeaderSection />

        <View style={styles.contentContainer}>
          <Text style={[styles.titleD, { marginTop: 16 }]} numberOfLines={2}>
            {movie.name || 'Untitled'}
          </Text>
          
          <InfoRow />

          <ActionButtons />

          {movie.genres && movie.genres.length > 0 && (
            <View style={styles.genresContainer}>
              <Text style={styles.genres}>
                {movie.genres.join(' • ')}
              </Text>
            </View>
          )}

          <Text style={styles.summaryD}>
            {stripHtmlTags(movie.summary)}
          </Text>

          <AdditionalInformation />
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;