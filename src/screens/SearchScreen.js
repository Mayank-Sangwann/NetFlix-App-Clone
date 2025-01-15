import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from '../../style.js';

//SearchScreen component - Allows users to search for shows and displays trending searches
const SearchScreen = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  // Popular searches data
  const TRENDING_SEARCHES = [
    'Stranger Things',
    'Wednesday',
    'The Crown',
    'Bridgerton',
    'Money Heist',
  ];

  //Fetches search results from the API
  const searchMovies = useCallback(async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchQuery.trim())}`
      );
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Search effect
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchQuery.length > 0) {
        searchMovies();
      } else {
        setSearchResults([]);
      }
    }, 300); // Debounce search for better performance

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, searchMovies]);

  //Renders an individual search result item
  const renderSearchResult = ({ item }) => {
    const { show } = item;
    return (
      <TouchableOpacity
        style={styles.resultItem}
        onPress={() => navigation.navigate('Details', { movie: show })}
      >
        <Image
          source={{
            uri: show.image?.medium || 'https://via.placeholder.com/150',
          }}
          style={styles.resultImage}
        />
        <View style={styles.resultInfo}>
          <Text style={styles.resultTitle} numberOfLines={1}>
            {show.name}
          </Text>
          <Text style={styles.resultGenres} numberOfLines={1}>
            {show.genres?.join(' • ') || 'No genres available'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  //Renders a trending search item
  const renderTrendingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.trendingItem}
      onPress={() => setSearchQuery(item)}
    >
      <Icon 
        name="trending-up" 
        size={20} 
        color="#E50914" 
        style={styles.trendingIcon} 
      />
      <Text style={styles.trendingText} numberOfLines={1}>
        {item}
      </Text>
      <Icon 
        name="play" 
        size={20} 
        color="#727272" 
        style={styles.playIcon} 
      />
    </TouchableOpacity>
  );

  //Renders the search header with back button and search input
  const SearchHeader = () => (
    <View style={styles.searchBarContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButtonS}
      >
        <Icon name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>
      <View style={styles.searchBar}>
        <Icon 
          name="search" 
          size={20} 
          color="#727272" 
          style={styles.searchIcon} 
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a show, movie etc."
          placeholderTextColor="#727272"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
          returnKeyType="search"
          onSubmitEditing={searchMovies}
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
  );

  return (
    <SafeAreaView style={styles.containerS}>
      <SearchHeader />

      {searchQuery.length === 0 ? (
        <View style={styles.trendingContainer}>
          <Text style={styles.trendingHeader}>Popular Searches</Text>
          <FlatList
            data={TRENDING_SEARCHES}
            renderItem={renderTrendingItem}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item.show.id.toString()}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;