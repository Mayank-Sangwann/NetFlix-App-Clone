import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import styles from '../../style.js';


const SplashScreen = ({ onSplashEnd }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onSplashEnd(); 
    }, 1900); 

    return () => clearTimeout(timer);
  }, [onSplashEnd]);

  return (
    <View style={styles.splashScreen}>
      <Image
        source={require('../../assets/netflixGif.gif')}
        style={styles.gif}
      />
    </View>
  );
};

export default SplashScreen;
