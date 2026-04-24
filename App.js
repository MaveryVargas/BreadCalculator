import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Modal, Alert, StatusBar } from 'react-native';
import { COLORS, CATEGORIES, EMOJIS, SAMPLE_ITEMS, STRINGS } from './constants';

export default function App() {
  const [items, setItems] = useState(SAMPLE_ITEMS);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: '1', unit: 'kg', category: 'Pão' });
  const [searchQuery, setSearchQuery] = useState('');

  // Adicionar novo item
  const addItem = () => {
    if (!newItem.name.trim()) {
      Alert.alert(STRINGS.warning, STRINGS.enterItemName);
      return;
    }
    setItems([...items, { ...newItem, id: Date.now().toString() }]);
    setNewItem({ name: '', quantity: '1', unit: 'kg', category: 'Pão' });
    setModalVisible(false);
    Alert.alert(STRINGS.success, `${newItem.name} ${STRINGS.addedToList}`);
  };

  // Deletar item
  const deleteItem = (id) => {
    Alert.alert(STRINGS.deleteTitle, STRINGS.deleteConfirm, [
      { text: STRINGS.cancel, style: 'cancel' },
      { text: STRINGS.delete, onPress: () => setItems(items.filter(item => item.id !== id)), style: 'destructive' },
    ]);
  };

  // Ajustar quantidade
  const updateQuantity = (id, change) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, parseFloat(item.quantity) + change).toFixed(1) } : item
    ));
  };

  // Filtrar itens
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Agrupar por categoria
  const groupedItems = CATEGORIES.reduce((acc, category) => {
    acc[category] = filteredItems.filter(item => item.category === category);
    return acc;
  }, {});

  // Estatísticas
  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + parseFloat(item.quantity), 0).toFixed(1);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.cream} />
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🍞 {STRINGS.appTitle} 🎉</Text>
        <Text style={styles.subtitle}>{STRINGS.appSubtitle}</Text>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { backgroundColor: COLORS.gold }]}>
          <Text style={styles.statNumber}>{totalItems}</Text>
          <Text style={styles.statLabel}>{STRINGS.items}</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: COLORS.orange }]}>
          <Text style={styles.statNumber}>{totalQuantity}</Text>
          <Text style={styles.statLabel}>{STRINGS.totalUnit}</Text>
        </View>
      </View>

      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={STRINGS.search}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Lista de Itens */}
      <FlatList
        data={Object.entries(groupedItems).filter(([_, items]) => items.length > 0)}
        renderItem={({ item: [category, categoryItems] }) => (
          <View key={category}>
            <Text style={styles.categoryTitle}>{EMOJIS[category]} {category}</Text>
            {categoryItems.map(item => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemContent}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>{item.quantity} {item.unit}</Text>
                </View>
                <View style={styles.itemActions}>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, -0.5)} style={styles.btnSmall}>
                    <Text style={styles.btnText}>−</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, 0.5)} style={styles.btnSmall}>
                    <Text style={styles.btnText}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteItem(item.id)} style={[styles.btnSmall, { backgroundColor: COLORS.red }]}>
                    <Text style={styles.btnText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
        keyExtractor={(item) => item[0]}
        ListEmptyComponent={<Text style={styles.emptyText}>{STRINGS.emptyList}</Text>}
        contentContainerStyle={styles.listContent}
      />

      {/* Botão de Adicionar */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>➕</Text>
      </TouchableOpacity>

      {/* Modal de Adicionar Item */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>➕ {STRINGS.addNewItem}</Text>

            <TextInput
              style={styles.input}
              placeholder={STRINGS.itemNamePlaceholder}
              value={newItem.name}
              onChangeText={(text) => setNewItem({ ...newItem, name: text })}
              placeholderTextColor="#999"
            />

            <View style={styles.rowContainer}>
              <TextInput
                style={[styles.input, { flex: 1, marginRight: 10 }]}
                placeholder={STRINGS.quantity}
                value={newItem.quantity}
                onChangeText={(text) => setNewItem({ ...newItem, quantity: text })}
                keyboardType="decimal-pad"
                placeholderTextColor="#999"
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder={STRINGS.unit}
                value={newItem.unit}
                onChangeText={(text) => setNewItem({ ...newItem, unit: text })}
                placeholderTextColor="#999"
              />
            </View>

            <Text style={styles.categoryLabel}>{STRINGS.selectCategory}</Text>
            <View style={styles.categoryGrid}>
              {CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryButton,
                    newItem.category === cat && { backgroundColor: COLORS.orange, borderColor: COLORS.darkOrange }
                  ]}
                  onPress={() => setNewItem({ ...newItem, category: cat })}
                >
                  <Text style={styles.categoryButtonText}>{EMOJIS[cat]} {cat}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: COLORS.red }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>{STRINGS.cancel} ❌</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: COLORS.green }]}
                onPress={addItem}
              >
                <Text style={styles.modalButtonText}>{STRINGS.add} ✅</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  header: {
    backgroundColor: COLORS.orange,
    padding: 20,
    paddingTop: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: -15,
    marginBottom: 15,
    gap: 10,
  },
  statBox: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.gold,
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.orange,
    marginTop: 15,
    marginBottom: 10,
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.gold,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 13,
    color: '#666',
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  btnSmall: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 40,
  },
  fabButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    fontSize: 30,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.orange,
    marginBottom: 15,
  },
  input: {
    backgroundColor: COLORS.cream,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  categoryButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: COLORS.cream,
    borderWidth: 2,
    borderColor: COLORS.gold,
    alignItems: 'center',
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});