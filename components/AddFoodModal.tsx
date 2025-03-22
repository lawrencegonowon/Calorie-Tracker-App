import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";

interface Food {
  id: string;
  name: string;
  calories: number;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (food: Food) => void;
  editingFood: Food | null;
}

const AddFoodModal: React.FC<Props> = ({ visible, onClose, onSave, editingFood }) => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");

  useEffect(() => {
    if (editingFood) {
      setName(editingFood.name);
      setCalories(editingFood.calories.toString());
    } else {
      setName("");
      setCalories("");
    }
  }, [editingFood]);

  const handleSave = () => {
    if (!name.trim() || !calories.trim()) return;

    const newFood: Food = {
      id: editingFood ? editingFood.id : Date.now().toString(),
      name,
      calories: parseInt(calories),
    };

    onSave(newFood);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{editingFood ? "Edit Food" : "Add Food"}</Text>
          <TextInput
            style={styles.input}
            placeholder="Food Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Calories"
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
          />
          <View style={styles.buttonContainer}>
            <CustomButton title={editingFood ? "UPDATE FOOD" : "ADD FOOD"} onPress={handleSave} />
            <CustomButton title="CANCEL" onPress={onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 10,
  },
});

export default AddFoodModal;
