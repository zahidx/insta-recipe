"use client";
import Head from "next/head";
import { useState } from "react";

const RandomRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [prepTime, setPrepTime] = useState("");

  const handleSurpriseMe = async () => {
    setLoading(true);
    setError("");

    const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
    let url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=8`;

    if (cuisine) url += `&tags=${cuisine}`;
    if (diet) url += `&diet=${diet}`;
    if (prepTime) url += `&maxReadyTime=${prepTime}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.recipes) {
        setRecipes(data.recipes);
      } else {
        setError("No recipes found.");
      }
    } catch (error) {
      setError("Error fetching recipes. Please try again.");
      console.error("Error fetching recipes:", error);
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

      const cleanedInstructions = data.instructions
        ? data.instructions.replace(/<[^>]*>/g, "")
        : "Instructions not available";

      setRecipeDetails({ ...data, instructions: cleanedInstructions });
      setSelectedRecipe(recipe);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
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
        <title>Random Recipes</title>
        <meta name="description" content="Discover random recipes with the Surprise Me feature." />
      </Head>

      <header className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/1500x800)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6 text-[#E5970F]">
            Discover Random Recipes
          </h1>
          <p className="text-xl sm:text-2xl mb-8">
            Click "Surprise Me" to explore delicious recipes.
          </p>

          <div className="mb-6 flex flex-wrap gap-4 justify-center">
            <select
              className="bg-gray-700 text-white px-4 py-2 rounded"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            >
              <option value="">Cuisine</option>
              <option value="italian">Italian</option>
              <option value="mexican">Mexican</option>
              <option value="indian">Indian</option>
              <option value="chinese">Chinese</option>
            </select>

            <select
              className="bg-gray-700 text-white px-4 py-2 rounded"
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
            >
              <option value="">Diet</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten free">Gluten Free</option>
            </select>

            <input
              type="number"
              placeholder="Max Prep Time (mins)"
              className="bg-gray-700 text-white px-4 py-2 rounded"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
            />
          </div>

          <button
            onClick={handleSurpriseMe}
            className="bg-[#E5970F] text-white px-8 py-4 rounded-full font-semibold text-xl hover:bg-[#E69A10] transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Surprise Me
          </button>
        </div>
      </header>

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

      <section className="py-20 bg-[#1a1c2b]">
        <div className="container mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-[#E5970F]">Random Recipes</h2>
          <p className="text-xl text-gray-400">Explore a variety of delicious dishes handpicked just for you.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 container mx-auto">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300 hover:shadow-xl cursor-pointer"
              onClick={() => handleViewRecipe(recipe)}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#1a1c2b] mb-2">{recipe.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-auto">
            {isModalLoading ? (
              <div className="text-center text-gray-500 py-8 text-lg">
                Loading Recipe Details...
              </div>
            ) : (
              <>
                <h2 className="text-4xl font-semibold text-[#0E1628] mb-6">{recipeDetails?.title}</h2>
                <img
                  src={recipeDetails?.image}
                  alt={recipeDetails?.title}
                  className="w-full h-72 object-cover rounded-xl shadow-md mb-6"
                />
                <h3 className="text-2xl font-semibold text-[#1a1c2b] mb-4">Ingredients:</h3>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  {recipeDetails?.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id} className="text-gray-700 text-lg">
                      {ingredient.original}
                    </li>
                  ))}
                </ul>
                <h3 className="text-2xl font-semibold text-[#1a1c2b] mb-4">Instructions:</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {recipeDetails?.instructions}
                </p>
                <button
                  onClick={closeModal}
                  className="mt-6 bg-[#E5970F] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#E69A10] transition-all duration-300"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="text-center py-8 bg-[#0E1628] text-gray-400">
        <p>&copy; 2025 Random Recipes. All rights reserved.</p>
        <div className="mt-4">
          <a href="#" className="text-[#E5970F] hover:underline">Privacy Policy</a> |
          <a href="#" className="text-[#E5970F] hover:underline">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default RandomRecipes;
