import type { Recipe } from "../models/recipe.js";

export const recipes: Recipe[] = [
  {
    id: "1",
    name: "Spaghetti Bolognese",
    description: "A classic Italian pasta dish with rich meat sauce.",
    ingredients: [
      { name: "Spaghetti", quantity: 200, unit: "grams" },
      { name: "Ground Beef", quantity: 300, unit: "grams" },
      { name: "Tomato Sauce", quantity: 400, unit: "ml" },
      { name: "Onion", quantity: 1, unit: "piece" },
      { name: "Garlic", quantity: 2, unit: "cloves" },
    ],
    instructions: [
      "Cook spaghetti according to package instructions.",
      "In a pan, sauté chopped onions and garlic until translucent.",
      "Add ground beef and cook until browned.",
      "Pour in tomato sauce and simmer for 20 minutes.",
      "Serve sauce over cooked spaghetti.",
    ],
  },
  {
    id: "2",
    name: "Chicken Curry",
    description: "A flavorful curry dish with tender chicken pieces.",
    ingredients: [
      { name: "Chicken Breast", quantity: 400, unit: "grams" },
      { name: "Curry Powder", quantity: 2, unit: "tablespoons" },
      { name: "Coconut Milk", quantity: 400, unit: "ml" },
      { name: "Onion", quantity: 1, unit: "piece" },
      { name: "Rice", quantity: 200, unit: "grams" },
    ],
    instructions: [
      "Cook rice according to package instructions.",
      "In a pan, sauté chopped onions until translucent.",
      "Add chicken pieces and cook until no longer pink.",
      "Stir in curry powder and cook for 2 minutes.",
      "Pour in coconut milk and simmer for 15 minutes.",
      "Serve chicken curry over cooked rice.",
    ],
  },
];