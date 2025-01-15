import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

  //App.js
  tabBar: {
    backgroundColor: '#000',
    borderTopWidth: 0,
    height: 60,
    paddingBottom: 5,
    marginBottom: 15,
    paddingTop: 5,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 0,
    padding: 0,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
  },

  //Splash Screen
  splashScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',  // Set to black or any color you like
  },
  gif: {
    width: 300,  
    height: 300,
  },

  //Detail Screen
  containerD: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    position: 'relative',
    height: 450,
    backgroundColor: '#1a1a1a',
  },
  loadingContainerD: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: '#1a1a1a',
  },
  banner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  hiddenImage: {
    opacity: 0,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  backButtonD: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 2,
    padding: 8,
  },
  contentContainer: {
    padding: 16,
    marginTop: -75,
  },
  titleD: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  year: {
    color: '#aaa',
    marginRight: 12,
  },
  runtime: {
    color: '#aaa',
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#aaa',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginRight: 12,
  },
  playButtonTextD: {
    color: '#000',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  myListButtonD: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  myListButtonTextD: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  genresContainer: {
    marginBottom: 16,
  },
  genres: {
    color: '#aaa',
    fontSize: 14,
  },
  summaryD: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  additionalInfo: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoValue: {
    color: '#fff',
    fontSize: 14,
  },

  //Search Screen
  containerS: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButtonS: {
    marginLeft: 0,
    paddingLeft: 0,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  trendingContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  trendingHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  trendingIcon: {
    marginRight: 16,
  },
  trendingText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  playIcon: {
    marginLeft: 16,
  },
  resultsList: {
    padding: 16,
  },
  resultItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  resultImage: {
    width: 120,
    height: 80,
    borderRadius: 4,
  },
  resultInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  resultTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  resultGenres: {
    color: '#727272',
    fontSize: 14,
  },

  //Home Screen
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 60,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  logo: {
    width: 140,
    height: 40,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 20,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  navPills: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 110,
    marginBottom: 10,
  },
  pill: {
    marginRight: 20,
  },
  pillText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  featuredContainer: {
    height: height * 0.35,
    width: width,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '40%',
    justifyContent: 'flex-end',
    paddingLeft: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  featuredInfo: {
    marginBottom: 15,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 15,
  },
  playButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  myListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
  },
  myListButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  categoryContainer: {
    marginTop: 20,
    paddingLeft: 15,
  },
  categoryTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryList: {
    paddingRight: 15,
  },
  movieCard: {
    marginRight: 10,
    borderRadius: 4,
    overflow: 'hidden',
  },
  movieImage: {
    width: width * 0.3,
    height: (width * 0.3) * 1.5,
    borderRadius: 4,
  },

});

export default styles;