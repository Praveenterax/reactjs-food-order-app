import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import { useEffect, useState } from "react";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(avaliableMealsList);
  useEffect(() => {
    const loadedMeals = [];
    async function fetchMeals() {
      try {
        const apiUrl = process.env.REACT_APP_AVAILABLE_MEALS;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Uh oh...Something went terribly wrong....!!");
        }
        const data = await response.json();
        for (const mealKey in data) {
          const meal = { id: mealKey, ...data[mealKey] };
          loadedMeals.push(meal);
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }
    fetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.meals}>
        <Card>
          <p className={classes.mealsLoading}>Loading....</p>;
        </Card>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.meals}>
        <Card>
          <p className={classes.error}>{error}</p>;
        </Card>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
