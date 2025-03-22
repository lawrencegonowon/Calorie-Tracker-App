import React, { createContext, useContext, useState } from "react";

type Food = {
  id: string;
  name: string;
  calories: number;
};

type FoodContextType = {
  foods: Food[];
  addFood: (food: Food) => void;
  deleteFood: (id: string) => void;
  updateFood: (food: Food) => void;
};

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foods, setFoods] = useState<Food[]>([]);

  const addFood = (food: Food) => setFoods([...foods, food]);
  const deleteFood = (id: string) => setFoods(foods.filter((food) => food.id !== id));
  const updateFood = (updatedFood: Food) => {
    setFoods(foods.map((food) => (food.id === updatedFood.id ? updatedFood : food)));
  };

  return (
    <FoodContext.Provider value={{ foods, addFood, deleteFood, updateFood }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFood must be used within a FoodProvider");
  }
  return context;
};
