import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from '../../style.js';

const SearchScreen = () => {
  // State for holding search query input and search results
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  // Hardcoded list of trending searches
  const TRENDING_SEARCHES = [
    'Stranger Things',
    'Wednesday',
    'The Crown',
    'Bridgerton',
    'Money Heist',
  ];

  // Function to fetch search results from TVMaze API
  const searchMovies = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]); 
      return;
    }

    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchQuery.trim())}`
      );
      const data = await response.json();
      setSearchResults(data); 
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]); 
    }
  };

  // useEffect to trigger search when searchQuery changes
  useEffect(() => {
    if (searchQuery.length > 0) {
      searchMovies();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Function to render each search result item
  const renderSearchResult = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => {
        Keyboard.dismiss();
        navigation.navigate('Details', { movie: item.show });
      }}
    >
      <Image
        source={{
          uri: item.show.image?.medium || 'https://via.placeholder.com/150',
        }}
        style={styles.resultImage}
      />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle} numberOfLines={1}>
          {item.show.name}
        </Text>
        <Text style={styles.resultGenres} numberOfLines={1}>
          {item.show.genres?.join(' • ') || 'No genres available'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Function to render each trending search item
  const renderTrendingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.trendingItem}
      onPress={() => setSearchQuery(item)}
    >
      <Icon name="trending-up" size={20} color="#E50914" />
      <Text style={styles.trendingText} numberOfLines={1}>{item}</Text>
      <Icon name="play" size={20} color="#727272" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.containerS}>
      <View style={styles.searchBarContainer}>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss(); 
            navigation.goBack(); 
          }}
          style={styles.backButtonS}
        >
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#727272" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a show, movie etc."
            placeholderTextColor="#727272"
            value={searchQuery}
            onChangeText={setSearchQuery} 
            autoFocus
            returnKeyType="search"
            blurOnSubmit={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="close-circle" size={20} color="#727272" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {searchQuery.length === 0 ? (
          <View style={styles.trendingContainer}>
            <Text style={styles.trendingHeader}>Popular Searches</Text>
            <FlatList
              data={TRENDING_SEARCHES} 
              renderItem={renderTrendingItem}
              keyExtractor={item => item}
              keyboardShouldPersistTaps="handled" 
            />
          </View>
        ) : (
          <FlatList
            data={searchResults} 
            renderItem={renderSearchResult}
            keyExtractor={item => item.show.id.toString()}
            contentContainerStyle={styles.resultsList}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="none" 
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
