import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const errorText = `Error: The route '${location.pathname}' does not exist.`;
    console.error(errorText);
    setErrorMessage(errorText);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="text-center mb-8">
        <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 text-lg font-semibold text-gray-900 bg-orange-400 rounded-lg shadow-md hover:bg-yellow-300 transition-all duration-300"
        >
          Return to Home
        </a>
      </div>
      <div className="w-11/12 max-w-4xl bg-black p-6 rounded-lg shadow-lg">
        <div className="text-green-400 font-mono text-sm">
          <p>
            <span className="text-yellow-500">user@website:</span>
            <span className="text-blue-500">~</span>${" "}
            <span className="text-white">npm run dev</span>
          </p>
          <p>
            <span className="text-yellow-500">error</span>: {errorMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
