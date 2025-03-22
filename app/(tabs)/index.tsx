import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import FoodItem from "../../components/FoodItem";
import AddFoodModal from "../../components/AddFoodModal";
import { useFood } from "../../components/FoodContext";


type Food = {
  id: string;
  name: string;
  calories: number;
};


export default function index() {
  const { foods, deleteFood, updateFood, addFood } = useFood();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);


  const editFood = (food: Food) => {
    setEditingFood(food);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calorie Tracker</Text>
      <Button title="ADD FOOD" onPress={() => setModalVisible(true)} color="#007bff" />
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodItem food={item} onDelete={deleteFood} onEdit={editFood} />
        )}
      />
      <AddFoodModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingFood(null);
        }}
        onSave={editingFood ? updateFood : addFood}
        editingFood={editingFood}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
