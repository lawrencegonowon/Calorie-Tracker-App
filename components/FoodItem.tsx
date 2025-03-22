import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Food {
  id: string;
  name: string;
  calories: number;
}

interface Props {
  food: Food;
  onDelete: (id: string) => void;
  onEdit: (food: Food) => void;
}

const FoodItem: React.FC<Props> = ({ food, onDelete, onEdit }) => {
  return (
    <View style={styles.foodItem}>
      <Text style={styles.foodText}>{food.name} - {food.calories} kcal</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => onEdit(food)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => onDelete(food.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#e3f2fd",
    marginVertical: 5,
    borderRadius: 10,
  },
  foodText: {
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    gap: 8, // Adds spacing between buttons
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: "green",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontSize: 14, // Smaller font size
    fontWeight: "bold",
  },
});

export default FoodItem;
