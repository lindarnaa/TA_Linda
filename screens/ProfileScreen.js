import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="person-circle-outline" size={80} color="#4b9be6" />
        <Text style={styles.logoText}>Space Explorer</Text>
        <Text style={styles.developedBy}>Developed by: Linda Ratna Kholifah</Text>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>About the App</Text>
        <Text style={styles.description}>
        This app provides daily images from NASA's Astronomy Picture of the Day (APOD) and Mars rover photos. 
        Additionally, it includes the latest NASA news and discoveries.
        </Text>
      </View>

      <View style={styles.socialLinks}>
        <Text style={styles.socialTitle}>Follow</Text>
        <View style={styles.iconContainer}>
          <Icon
            name="logo-github"
            size={30}
            color="#333"
            onPress={() => openLink('https://github.com/lindarnaa')}
          />
          <Icon
            name="logo-instagram"
            size={30}
            color="#E4405F"
            onPress={() => openLink('https://www.instagram.com/lindarnaa?igsh=MTY2d3hrM3hxemp6aQ==')}
          />
          <Icon
            name="logo-linkedin"
            size={30}
            color="#0077b5"
            onPress={() => openLink('https://www.linkedin.com/in/linda-ratna-kholifah-889840287/')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3E0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e88e5',
    marginTop: 10,
    textAlign: 'center',
  },
  developedBy: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  aboutSection: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e88e5',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#424242',
    textAlign: 'center',
    lineHeight: 22,
  },
  socialLinks: {
    marginTop: 30,
    alignItems: 'center',
  },
  socialTitle: {
    fontSize: 18,
    color: '#424242',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
});

export default ProfileScreen;
