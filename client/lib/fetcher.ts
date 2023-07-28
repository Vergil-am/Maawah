import axios from "axios";

async function RefreshToken() {
  try {
    console.log("refresh token function");
    const res = await axios.get("http://localhost:5000/auth/refresh", {
      withCredentials: true,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    throw new Error("Refresh failed");
  }
}
// Function to make the original request with retries
export async function MakeRequest(url: string, options: any, retryCount = 0): Promise<any> {
  // 100 is too much i need to chage it before launch
  const MAX_RETRY_COUNT = 100;
  try {
    // Make the initial request
    console.log("initial request");
    const res = await axios(url, options);

    // Return the response if successful
    return res.data;
  } catch (error) {
    // Check if the error status is 401 (Unauthorized)
    if ((error as any).response && (error as any).response.status === 401) {
      // Retry the request after refreshing the token
      if (retryCount < MAX_RETRY_COUNT) {
        const newToken = await RefreshToken();
        console.log(newToken);
        // Retry the request
        return MakeRequest(url, options, retryCount + 1);
      } else {
        throw new Error("Max retry count exceeded.");
      }
    } else {
      // Handle other errors
      throw new Error("Request failed.");
    }
  }
}
