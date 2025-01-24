import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TrendingRecipe = () => {
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // For holding the selected recipe
  const [isLoadingModal, setIsLoadingModal] = useState(false); // Modal loading state

  // Fetch trending recipes on component mount
  useEffect(() => {
    const fetchTrendingRecipes = async () => {
      const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
      const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=12`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setTrendingRecipes(data.recipes);
      } catch (error) {
        console.error("Error fetching trending recipes:", error);
      }
    };

    fetchTrendingRecipes();
  }, []);

  // Fetch recipe details
  const handleViewRecipe = async (recipeId) => {
    setIsLoadingModal(true);
    const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSelectedRecipe(data); // Store recipe details in the state
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    } finally {
      setIsLoadingModal(false);
    }
  };

  // Close the modal
  const closeModal = () => {
    setSelectedRecipe(null);
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-[#0E1628] to-[#380643] min-h-screen py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#E5970F] text-center mb-10">
          Trending Recipes
        </h1>
        <Slider {...sliderSettings}>
          {trendingRecipes.map((recipe) => (
            <div key={recipe.id} className="p-4">
              <div
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => handleViewRecipe(recipe.id)}
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-[#1a1c2b] mb-2">
                    {recipe.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Ready in {recipe.readyInMinutes} minutes
                  </p>
                  <button
                    className="bg-[#E5970F] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#E69A10] transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent click event
                      handleViewRecipe(recipe.id);
                    }}
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-auto transform transition-all duration-300 ease-in-out scale-95 hover:scale-100 shadow-2xl shadow-black/50">
            {isLoadingModal ? (
              <div className="text-center text-gray-500 py-8 text-lg">
                Loading Recipe Details...
              </div>
            ) : (
              <>
                {/* Recipe Title */}
                <h2 className="text-4xl font-semibold text-[#0E1628] mb-6 tracking-wide">
                  {selectedRecipe?.title}
                </h2>

                {/* Recipe Image */}
                <img
                  src={selectedRecipe?.image}
                  alt={selectedRecipe?.title}
                  className="w-full h-72 object-cover rounded-xl shadow-md mb-6"
                />

                {/* Ingredients Section */}
                <h3 className="text-2xl font-semibold text-[#1a1c2b] mb-4">
                  Ingredients:
                </h3>
                <ol className="list-decimal pl-5 mb-6 space-y-2">
                  {selectedRecipe?.extendedIngredients.map((ingredient) => (
                    <li
                      key={ingredient.id}
                      className="text-gray-700 text-lg leading-relaxed"
                    >
                      {ingredient.original}
                    </li>
                  ))}
                </ol>

                {/* Instructions Section */}
                <h3 className="text-2xl font-semibold text-[#1a1c2b] mb-4">
                  Instructions:
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {selectedRecipe?.instructions || "Instructions not available"}
                </p>

                {/* Close Modal Button */}
                <button
                  onClick={closeModal}
                  className="mt-6 bg-[#E5970F] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#E69A10] transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingRecipe;
