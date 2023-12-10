import axios from "axios";

const signInService = async (userData) => {
  const url = "http://localhost:3001/auth";

  try {
    const response = await axios.post(url, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // Tangani kesalahan dari respon dengan status code di luar range 2xx
      console.error("Error:", error.response.data);
      return { error: error.response.data };
    } else if (error.request) {
      // Tangani kesalahan request tanpa respon dari server
      console.error("Error:", error.request);
      return { error: "No response from server" };
    } else {
      // Tangani kesalahan lainnya
      console.error("Error:", error.message);
      return { error: error.message };
    }
  }
};

export default signInService;
