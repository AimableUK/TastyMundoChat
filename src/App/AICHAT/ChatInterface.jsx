import { Box, Typography, useMediaQuery } from "@mui/material";
import tastyMundoLogo from "/tastyMundo.png";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useEffect, useRef, useState } from "react";
import { getRecipeFromMistral } from "./AI/ai";
import AIRecipe from "./AIRecipe/AIRecipe";

const ChatInterface = () => {
  const isTablet = useMediaQuery("(max-width:768px)");

  const [ingredients, setIngredients] = useState([]);

  const [recipe, setRecipe] = useState("");

  const recipeSection = useRef(null);

  useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      const yCoord = recipeSection.current.getBoundingClientRect().top;
      window.scroll({
        top: yCoord,
        behavior: "smooth",
      });
    }
  }, [recipe]);

  const handleSubmit = (formData) => {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  };

  const getRecipe = async () => {
    try {
      const recipeMarkdown = await getRecipeFromMistral(ingredients);
      setRecipe(recipeMarkdown);
    } catch (err) {
      console.error("Error in getRecipe:", err.message);
    }
  };

  return (
    <Box mx="30px">
      <Box>
        {ingredients.length ? (
          <section className="flex flex-col h-screen">
            <h2 className="font-poppins font-semibold text-xl mb-3 mt-4">
              Ingredients on hand:
            </h2>
            <ul aria-live="polite">
              {ingredients.map((ingredient) => (
                <li className="text-gray-300" key={ingredient}>
                  {ingredient}
                </li>
              ))}
            </ul>

            {ingredients.length > 3 && (
              <div className="w-3/4 flex justify-between items-center rounded-md bg-gray-300 p-4 gap-3 mt-10">
                <div ref={recipeSection}>
                  <h3 className="text-gray-900 font-semibold text-2xl">
                    Ready for a recipe?
                  </h3>
                  <p className="font-2xl text-gray-600">
                    Generate a recipe from your list of ingredients.
                  </p>
                </div>
                <button
                  className="rounded-md bg-orange-600 hover:bg-orange-500 active:bg-orange-400 shadow-md p-2 mt-2 font-semibold text-md cursor-pointer transition-all duration-75 ease-in"
                  onClick={() => getRecipe()}
                >
                  Get a recipe
                </button>
              </div>
            )}
          </section>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Box
              component="img"
              src={tastyMundoLogo}
              alt="TastyMundo Logo"
              sx={{ width: 100, mb: 2 }}
            />

            <Typography variant="h4" fontWeight={600}>
              How can we assist you Today?
            </Typography>

            <Typography
              sx={{ width: { xs: "100%", md: "75%" }, mt: 2 }}
              color="text.secondary"
              fontWeight={500}
            >
              Get AI-powered culinary assistance tailored to your needs! Our
              intelligent agents specialize in recipe creation, meal planning,
              and ingredient optimization. Choose your perfect cooking companion
              and start crafting delicious dishes effortlessly.
            </Typography>
            <Box mt="10px" textAlign="start">
              <Typography color="#BDBDBD" fontWeight="bold">
                Create a Custom Recipe from Your Ingredients
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      {recipe && <AIRecipe recipe={recipe} />}

      {/* Text Box */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          position="fixed"
          bottom="0"
          bgcolor="#090b1f"
          padding="16px"
          sx={{
            width: "100%",
            zIndex: 1000,
          }}
        >
          <form
            action={handleSubmit}
            autoComplete="off"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <input
              type="text"
              placeholder="Type an ingredient..."
              name="ingredient"
              style={{
                flex: 1,
                padding: "12px 20px",
                background: "#1f2937",
                border: "1px solid #6b7280",
                borderRadius: "30px",
                color: "#BDBDBD",
                fontSize: "16px",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#6b7280",
                border: "none",
                padding: "10px 12px",
                borderRadius: "50%",
                color: "white",
                cursor: "pointer",
              }}
            >
              <ArrowUpwardIcon />
            </button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatInterface;
