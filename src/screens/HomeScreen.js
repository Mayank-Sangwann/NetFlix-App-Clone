import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../style.js';

const HomeScreen = () => {
  // State management
  const [featuredContent, setFeaturedContent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Category definitions for API fetching
  const CONTENT_CATEGORIES = [
    { query: 'drama', title: 'Trending Now' },
    { query: 'comedy', title: 'Comedy' },
    { query: 'action', title: 'Action & Adventure' },
    { query: 'thriller', title: 'Thrillers' }
  ];

  // Fetch content from API on component mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const responses = await Promise.all(
          CONTENT_CATEGORIES.map(category => 
            fetch(`https://api.tvmaze.com/search/shows?q=${category.query}`)
          )
        );
        
        const results = await Promise.all(responses.map(r => r.json()));
        
        setFeaturedContent(results[0][0]); // Set first drama as featured content
        setCategories(
          CONTENT_CATEGORIES.map((category, index) => ({
            title: category.title,
            data: results[index]
          }))
        );
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  //Featured content section component
  const FeaturedContent = () => (
    <View style={styles.featuredContainer}>
      <Image
        source={{ uri: featuredContent?.show.image?.original }}
        style={styles.featuredImage}
      />
      <View style={styles.gradientOverlay}>
        <View style={styles.featuredInfo}>
          <Text style={styles.featuredTitle}>{featuredContent?.show.name}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.playButton}>
              <Icon name="play" size={24} color="#000" />
              <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.myListButton}>
              <Icon name="add" size={24} color="#fff" />
              <Text style={styles.myListButtonText}>My List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  // Individual movie/show card component
  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate('Details', { movie: item.show })}
    >
      <Image
        source={{ uri: item.show.image?.medium }}
        style={styles.movieImage}
      />
    </TouchableOpacity>
  );

  //Category row component with horizontal scroll
  const CategoryRow = ({ title, data }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        renderItem={renderMovie}
        keyExtractor={item => item.show.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />
    </View>
  );

  // Navigation pill options
  const NAV_PILLS = ['TV Shows', 'Movies', 'Categories'];

  if (loading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      
      <View style={styles.header}>
        <Image 
          source={require('../../assets/netflixImg.jpeg')}
          style={styles.logo}
        />
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Icon name="search" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Image
              source={require('../../assets/netflix-avatar.jpg')}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navPills}>
        {NAV_PILLS.map((item, index) => (
          <TouchableOpacity key={index} style={styles.pill}>
            <Text style={styles.pillText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {featuredContent && <FeaturedContent />}
        {categories.map((category, index) => (
          <CategoryRow
            key={index}
            title={category.title}
            data={category.data}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;