import Head from 'next/head';

const Home = () => {
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
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6 animate__animated animate__fadeIn animate__delay-1s text-[#E5970F]">Find Delicious Recipes with What You Have</h1>
          <p className="text-xl sm:text-2xl mb-8 animate__animated animate__fadeIn animate__delay-2s">Enter your ingredients and discover the perfect dishes.</p>
          <div className="relative w-full max-w-lg mx-auto">
            <input
              type="text"
              className="w-full p-4 pl-12 rounded-full text-black text-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E5970F]"
              placeholder="Enter ingredients..."
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#E5970F] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#E69A10] transition-all duration-300">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Featured Recipes Section */}
      <section className="py-20 bg-[#1a1c2b]">
        <div className="container mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-[#E5970F]">Featured Recipes</h2>
          <p className="text-xl text-gray-400">Discover a variety of delicious dishes to suit your taste and dietary preferences.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 container mx-auto">
          {/* Recipe Card 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300 hover:shadow-xl">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Recipe 1"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-[#1a1c2b] mb-3">Chicken Tomato Garlic Pasta</h3>
              <p className="text-gray-600">A delicious pasta with a garlic, tomato, and chicken base. Perfect for a quick dinner.</p>
              <button className="mt-4 text-[#E5970F] font-semibold hover:underline transition-all duration-200">View Recipe</button>
            </div>
          </div>
          {/* Recipe Card 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300 hover:shadow-xl">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Recipe 2"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-[#1a1c2b] mb-3">Vegan Buddha Bowl</h3>
              <p className="text-gray-600">Packed with nutritious ingredients, this bowl is perfect for a healthy meal.</p>
              <button className="mt-4 text-[#E5970F] font-semibold hover:underline transition-all duration-200">View Recipe</button>
            </div>
          </div>
          {/* Recipe Card 3 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300 hover:shadow-xl">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Recipe 3"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-[#1a1c2b] mb-3">Vegetable Stir Fry</h3>
              <p className="text-gray-600">A quick and healthy stir fry with seasonal veggies, full of flavor.</p>
              <button className="mt-4 text-[#E5970F] font-semibold hover:underline transition-all duration-200">View Recipe</button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#1a1c2b] py-16">
        <div className="container mx-auto text-center text-white mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-[#E5970F]">How It Works</h2>
          <p className="text-xl text-gray-400 mb-8">Follow these simple steps to start exploring recipes with the ingredients you have.</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-12">
          <div className="bg-[#E5970F] p-8 rounded-lg shadow-lg w-full sm:w-1/3 text-center transform transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-4">1</div>
            <h3 className="text-2xl font-semibold mb-4">Enter Ingredients</h3>
            <p className="text-gray-700">Start by typing in the ingredients you have at home.</p>
          </div>
          <div className="bg-[#E5970F] p-8 rounded-lg shadow-lg w-full sm:w-1/3 text-center transform transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-4">2</div>
            <h3 className="text-2xl font-semibold mb-4">Find Recipes</h3>
            <p className="text-gray-700">Discover recipes that match the ingredients you entered.</p>
          </div>
          <div className="bg-[#E5970F] p-8 rounded-lg shadow-lg w-full sm:w-1/3 text-center transform transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-4">3</div>
            <h3 className="text-2xl font-semibold mb-4">Save & Share</h3>
            <p className="text-gray-700">Save your favorite recipes and share them with friends!</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 bg-[#0E1628] text-gray-400">
        <p>&copy; 2025 Recipe Finder. All rights reserved.</p>
        <div className="mt-4">
          <a href="#" className="text-[#E5970F] hover:underline">Privacy Policy</a> | 
          <a href="#" className="text-[#E5970F] hover:underline">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
