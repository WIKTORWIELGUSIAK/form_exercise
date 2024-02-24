import { useState } from "react";
import FoodForm from "./components/FoodForm/FoodForm";
import ListContainer from "./components/ListContainer/ListContainer";

function App() {
  const [foodType, setFoodType] = useState<string>("wybierz");
  return (
    <main className="justify-center flex flex-col items-center gap-y-24 p-24 max-w-7xl mx-auto">
      <FoodForm foodType={foodType} setFoodType={setFoodType} />
      {foodType === "wybierz" ? null : <ListContainer foodType={foodType} />}
    </main>
  );
}

export default App;
