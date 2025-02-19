import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const querySERPapi = async (searchKeyword, country) => {
  const post_array = [
    {
      keyword: searchKeyword,
      location_name: country,
      language_code: "en",
      device: "desktop",
      os: "windows",
      depth: 50,
    },
  ];

  try {
    // Step 1: Create Task
    const postResponse = await axios.post(
      "https://api.dataforseo.com/v3/serp/google/organic/task_post",
      post_array,
      {
        auth: {
          username: process.env.SERP_API_LOGIN,
          password: process.env.SERP_API_PASSWORD,
        },
        headers: { "Content-Type": "application/json" },
      }
    );

    const taskId = postResponse.data.tasks?.[0]?.id;
    if (!taskId) throw new Error("Failed to retrieve Task ID.");

    // Step 2: Wait and Fetch Results
    await new Promise((resolve) => setTimeout(resolve, 20000)); // Wait 10 sec before fetching results

    const resultResponse = await axios.get(
      `https://api.dataforseo.com/v3/serp/google/organic/task_get/regular/${taskId}`,
      {
        auth: {
          username: process.env.SERP_API_LOGIN,
          password: process.env.SERP_API_PASSWORD,
        },
        headers: { "Content-Type": "application/json" },
      }
    );

    const results = resultResponse.data.tasks?.[0]?.result || [];

    return results.length ? results : null;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return null;
  }
};

export default querySERPapi;
