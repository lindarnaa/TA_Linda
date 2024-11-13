import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, TextInput, Modal } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const NewsScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=space&apiKey=059b62819048433d893164395cf5367d`);
        const filteredArticles = response.data.articles.filter(article => 
          !article.title.includes("removed") && !article.url.includes("removed")
        );
        setNews(filteredArticles);
        setFilteredNews(filteredArticles);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const filteredBySearch = news.filter(item => 
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredNews(filteredBySearch);
  }, [searchText, news]);

  const handleSortSelection = (sortType) => {
    const sortedNews = [...filteredNews].sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return sortType === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setFilteredNews(sortedNews);
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search news..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
          <Ionicons name="filter" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredNews}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.newsItem} 
            onPress={() => navigation.navigate('DetailNews', { article: item })}
          >
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.newsDate}>{new Date(item.publishedAt).toLocaleDateString()}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sort by Date</Text>
            <TouchableOpacity style={styles.modalOption} onPress={() => handleSortSelection('asc')}>
              <Text style={styles.modalOptionText}>Oldest First</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => handleSortSelection('desc')}>
              <Text style={styles.modalOptionText}>Newest First</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCloseButton} onPress={toggleModal}>
              <Text style={styles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F3F3E0' },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 25,  // Elliptical shape
    paddingHorizontal: 12,  // Reduced horizontal padding
    paddingVertical: 8,     // Reduced vertical padding
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 8, // Shadow radius
    elevation: 6, // Elevation for Android
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 32,  // Reduced height
    fontSize: 14,  // Reduced font size
  },
  filterButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  newsItem: { 
    marginBottom: 12, 
    padding: 8, 
    backgroundColor: '#fff', 
    borderRadius: 8,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 8, // Shadow radius
    elevation: 4, // Elevation for Android
  },
  newsTitle: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  newsDate: { 
    fontSize: 12, 
    color: '#888', 
    marginTop: 4 
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NewsScreen;
