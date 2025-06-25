import ReactMarkdown from "react-markdown";

function AIRecipe({recipe}) {
  return (
    <div>
      <section
        className="-mt-56 mb-20 text-gray-200"
        aria-live="polite"
      >
        <h2>Chef Claude Recommends: </h2>
        <ReactMarkdown>{recipe}</ReactMarkdown>
      </section>
    </div>
  );
}

export default AIRecipe;
