"use client";
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import RandomRecipes from './pages/RandomRecipes';
import TrendingRecipe from './pages/TrendingRecipe';
import MealPlanning from './pages/MealPlanning';
import FoodTrivia from './pages/FoodTrivia';
import PriceBreakdown from './pages/PriceBreakdown';

const Home = () => {
  const [viewType, setViewType] = useState('list'); // Default to list view

  const [recipeDetails, setRecipeDetails] = useState(null);
  const [selectedServings, setSelectedServings] = useState(recipeDetails?.servings || 1);
  


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

  const [isModalLoading, setIsModalLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // Added to store autocomplete suggestions

  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (ingredients.length > 1) { // Fetch suggestions if more than 1 character is typed
      const fetchSuggestions = async () => {
        const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
        const url = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${apiKey}&query=${ingredients}&number=5`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]); // Clear suggestions if input is cleared
    }
  }, [ingredients]); // Dependency array

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]); // Clear suggestions if clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

          <div className="relative w-full max-w-lg mx-auto mb-4">
      <input
        type="text"
        className="w-full p-4 pl-12 rounded-full text-black text-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E5970F]"
        placeholder="Enter ingredients..."
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul
          ref={suggestionsRef}
          className="absolute bg-white text-black w-full mt-2 rounded-lg shadow-lg z-50"
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setIngredients(suggestion.name); // Set selected suggestion
                setSuggestions([]); // Clear suggestions to hide the list
              }}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
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


      {selectedRecipe && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-2xl max-w-4xl w-full relative overflow-y-auto max-h-[90vh]">
      {isModalLoading ? (
        <div className="text-center text-[#E5970F] text-lg font-medium">Loading Recipe...</div>
      ) : (
        <>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 text-3xl hover:text-black transition-colors duration-200"
          >
            ×
          </button>
          {recipeDetails && (
            <>
              <h2 className="text-4xl font-bold text-[#380643] mb-6 text-center">
                {recipeDetails.title}
              </h2>
              <div className="flex justify-center items-center mb-6">
                <img
                  src={recipeDetails.image}
                  alt={recipeDetails.title}
                  className="max-w-full h-auto rounded-xl opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* Servings Selector */}
              <div className="mb-6">
                <label
                  htmlFor="servings"
                  className="block text-xl font-semibold text-[#380643] mb-2"
                >
                  Adjust Servings:
                </label>
                <select
                  id="servings"
                  value={selectedServings}
                  onChange={(e) => setSelectedServings(Number(e.target.value))}
                  className="bg-white border border-gray-300 text-gray-800 rounded-lg px-4 py-2 focus:ring-[#380643] focus:border-[#380643]"
                >
                  {Array.from({ length: 99 }, (_, i) => i + 1).map((serving) => (
                    <option key={serving} value={serving}>
                      {serving}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <div className="flex flex-col items-start mb-4">
                  <h3 className="text-2xl font-semibold text-[#380643]">Ingredients:</h3>
                  <button
                    onClick={() => setViewType((prev) => (prev === "grid" ? "list" : "grid"))}
                    className="bg-[#380643] text-white px-4 py-2 rounded-lg hover:bg-[#4c0a63] transition-colors duration-200 mb-2"
                  >
                    {viewType === "grid" ? "List View" : "Grid View"}
                  </button>
                </div>
                {viewType === "grid" ? (
                  <div className="grid grid-cols-5 gap-6">
                    {recipeDetails.extendedIngredients.map((ingredient) => {
                      const { amount, unit, name, image } = ingredient;

                      // Function to abbreviate units
                      const abbreviateUnit = (unit) => {
                        if (!unit) return unit;
                        return unit
                          .replace(/tablespoons?/i, "Tbsp")
                          .replace(/teaspoons?/i, "Tsp");
                      };

                      // Adjust quantity based on servings
                      const adjustedAmount = (amount * selectedServings) / recipeDetails.servings;

                      return (
                        <div
                          key={ingredient.id}
                          className="relative text-center p-2 rounded-xl"
                          style={{ height: "140px", width: "140px" }}
                        >
                          {image && (
                            <div className="relative w-full h-20">
                              <span className="absolute -top-4 left-4 text-gray-700 text-sm font-semibold px-2 py-1 rounded">
                                {adjustedAmount && unit
                                  ? `${adjustedAmount.toFixed(2)} ${abbreviateUnit(unit)}`
                                  : adjustedAmount || abbreviateUnit(unit)}
                              </span>
                              <img
                                src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`}
                                alt={name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          <span className="block text-gray-800 text-sm mt-2">{name}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <ul className="space-y-6">
                    {recipeDetails.extendedIngredients.map((ingredient) => {
                      const { amount, unit, name, image } = ingredient;

                      // Function to abbreviate units
                      const abbreviateUnit = (unit) => {
                        if (!unit) return unit;
                        return unit
                          .replace(/tablespoons?/i, "Tbsp")
                          .replace(/teaspoons?/i, "Tsp");
                      };

                      // Adjust quantity based on servings
                      const adjustedAmount = (amount * selectedServings) / recipeDetails.servings;

                      return (
                        <li
                          key={ingredient.id}
                          className="flex items-center space-x-4 border-b border-gray-300 pb-4"
                        >
                          {image && (
                            <img
                              src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`}
                              alt={name}
                              className="w-16 h-16 object-contain rounded-full"
                            />
                          )}
                          <div className="flex-1">
                            <span className="block font-semibold text-gray-800 text-lg">{name}</span>
                            <span className="block text-gray-600 text-sm">
                              {adjustedAmount && unit
                                ? `${adjustedAmount.toFixed(2)} ${abbreviateUnit(unit)}`
                                : adjustedAmount || abbreviateUnit(unit)}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-[#380643] mb-4">Instructions:</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {recipeDetails.instructions}
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  </div>
)}



      <RandomRecipes />
      {/* <TrendingRecipe /> */}
      <MealPlanning />
      <FoodTrivia />
      <PriceBreakdown/>
    </div>
  );
};

export default Home;
