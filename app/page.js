"use client";
import Head from 'next/head';
import { useState } from 'react';
import RandomRecipes from './pages/RandomRecipes';
import TrendingRecipe from './pages/TrendingRecipe';
import MealPlanning from './pages/MealPlanning';
import FoodTrivia from './pages/FoodTrivia';
import PriceBreakdown from './pages/PriceBreakdown';

const Home = () => {
  const [ingredients, setIngredients] = useState('');
  const [diet, setDiet] = useState('');
  const [cuisines, setCuisines] = useState('');
  const [intolerances, setIntolerances] = useState('');
  const [mealType, setMealType] = useState('');
  const [maxCalories, setMaxCalories] = useState('');
  const [minCalories, setMinCalories] = useState('');
  const [maxPreparationTime, setMaxPreparationTime] = useState('');
  const [minPreparationTime, setMinPreparationTime] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const handleSearch = async () => {
    if (!ingredients) {
      setError('Please enter some ingredients');
      return;
    }

    setLoading(true);
    setError('');

    const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${ingredients}&number=6`;

    if (diet) url += `&diet=${diet}`;
    if (cuisines) url += `&cuisines=${cuisines}`;
    if (intolerances) url += `&intolerances=${intolerances}`;
    if (mealType) url += `&type=${mealType}`;
    if (maxCalories) url += `&maxCalories=${maxCalories}`;
    if (minCalories) url += `&minCalories=${minCalories}`;
    if (maxPreparationTime) url += `&maxReadyTime=${maxPreparationTime}`;
    if (minPreparationTime) url += `&minReadyTime=${minPreparationTime}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        setRecipes(data.results);
      } else {
        setError('No recipes found.');
      }
    } catch (error) {
      setError('Error fetching recipes. Please try again.');
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewRecipe = async (recipe) => {
    setIsModalLoading(true);

    const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setRecipeDetails(data);
      setSelectedRecipe(recipe);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    } finally {
      setIsModalLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setRecipeDetails(null);
  };

  return (
    <div className="bg-gradient-to-r from-[#0E1628] to-[#380643] min-h-screen text-white">
      <Head>
        <title>Recipe Finder</title>
        <meta name="description" content="Find recipes based on the ingredients you have." />
      </Head>

      {/* Hero Section */}
      <header className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/1500x800)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6 animate__animated animate__fadeIn animate__delay-1s text-[#E5970F]">
            Find Delicious Recipes with What You Have
          </h1>
          <p className="text-xl sm:text-2xl mb-8 animate__animated animate__fadeIn animate__delay-2s">
            Enter your ingredients and discover the perfect dishes.
          </p>

          {/* Search Form */}
          <div className="relative w-full max-w-lg mx-auto mb-4">
            <input
              type="text"
              className="w-full p-4 pl-12 rounded-full text-black text-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E5970F]"
              placeholder="Enter ingredients..."
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#E5970F] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#E69A10] transition-all duration-300"
            >
              Search
            </button>
          </div>

          {/* Filters Section */}
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            {/* Diet */}
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="w-full p-4 rounded-full text-black text-xl"
            >
              <option value="">Select Diet</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="glutenFree">Gluten-Free</option>
              <option value="paleo">Paleo</option>
            </select>

            {/* Cuisines */}
            <select
              value={cuisines}
              onChange={(e) => setCuisines(e.target.value)}
              className="w-full p-4 rounded-full text-black text-xl"
            >
              <option value="">Select Cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Mexican">Mexican</option>
            </select>

            {/* Intolerances */}
            <select
              value={intolerances}
              onChange={(e) => setIntolerances(e.target.value)}
              className="w-full p-4 rounded-full text-black text-xl"
            >
              <option value="">Select Intolerances</option>
              <option value="dairy">Dairy</option>
              <option value="egg">Egg</option>
              <option value="gluten">Gluten</option>
              <option value="peanut">Peanut</option>
            </select>

            {/* Meal Type */}
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full p-4 rounded-full text-black text-xl"
            >
              <option value="">Select Meal Type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>

            {/* Calories */}
            <div className="w-full flex space-x-2">
              <input
                type="number"
                placeholder="Min Calories"
                value={minCalories}
                onChange={(e) => setMinCalories(e.target.value)}
                className="w-1/2 p-4 rounded-full text-black text-xl"
              />
              <input
                type="number"
                placeholder="Max Calories"
                value={maxCalories}
                onChange={(e) => setMaxCalories(e.target.value)}
                className="w-1/2 p-4 rounded-full text-black text-xl"
              />
            </div>

            {/* Preparation Time */}
            <div className="w-full flex space-x-2">
              <input
                type="number"
                placeholder="Min Prep Time"
                value={minPreparationTime}
                onChange={(e) => setMinPreparationTime(e.target.value)}
                className="w-1/2 p-4 rounded-full text-black text-xl"
              />
              <input
                type="number"
                placeholder="Max Prep Time"
                value={maxPreparationTime}
                onChange={(e) => setMaxPreparationTime(e.target.value)}
                className="w-1/2 p-4 rounded-full text-black text-xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Error/Loading State */}
      {loading && (
        <div className="text-center text-white py-4">
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 py-4">
          <p>{error}</p>
        </div>
      )}

      {/* Featured Recipes Section */}
      <section className="py-20 bg-[#1a1c2b]">
        <div className="container mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-[#E5970F]">Featured Recipes</h2>
          <p className="text-xl text-gray-400">Discover a variety of delicious dishes to suit your taste and dietary preferences.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 container mx-auto">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300 hover:shadow-xl">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#380643]">{recipe.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{recipe.readyInMinutes} mins | {recipe.servings} servings</p>
                <button
                  onClick={() => handleViewRecipe(recipe)}
                  className="mt-4 bg-[#E5970F] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#E69A10] transition-all duration-300"
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Recipe Details */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-4xl w-full relative">
            {isModalLoading ? (
              <div className="text-center text-[#E5970F]">Loading Recipe...</div>
            ) : (
              <>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 text-2xl"
                >
                  ×
                </button>
                {recipeDetails && (
                  <>
                    <h2 className="text-3xl font-semibold text-[#380643] mb-4">{recipeDetails.title}</h2>
                    <img
                      src={recipeDetails.image}
                      alt={recipeDetails.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold text-[#380643]">Ingredients:</h3>
                      <ul className="list-disc ml-6 mt-2">
                        {recipeDetails.extendedIngredients.map((ingredient) => (
                          <li key={ingredient.id} className="text-gray-700">{ingredient.original}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-[#380643]">Instructions:</h3>
                      <p className="text-gray-700">{recipeDetails.instructions}</p>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>

      )}
      <RandomRecipes />
      <TrendingRecipe />
      <MealPlanning />
      <FoodTrivia />
      <PriceBreakdown/>
    </div>
  );
};

export default Home;
