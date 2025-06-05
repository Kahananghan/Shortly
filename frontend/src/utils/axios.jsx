import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000" 
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          alert("Bad Request (400): Please check your input.");
          break;
        case 401:
          alert("Unauthorized (401): Please login again.");
          break;
        case 403:
          alert("Forbidden (403): You don't have permission to access this.");
          break;
        case 404:
          alert("Not Found (404): Requested resource not found.");
          break;
        case 500:
          alert("Internal Server Error (500): Something went wrong on the server.");
          break;
        case 503:
          alert("Service Unavailable (503): Server is temporarily down.");
          break;
        default:
          alert(`Error ${status}: ${error.response.data.message || 'Unexpected error occurred.'}`);
          break;
      }
    } else if (error.request) {
      alert("No response from server. Please check your connection or try again later.");
    } else {
      alert("Request Error: " + error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;