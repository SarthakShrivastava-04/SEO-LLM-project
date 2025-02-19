import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const  dataForSeoLabsApi = async (domain, country) => {
 const post_array = [];
 post_array.push({
   "target": domain,
   "language_name": "English",
   "location_name": country,
  //  "filters": [
  //    ["keyword_data.keyword_info.search_volume", "<>", 0],
  //    "and",
  //    [
  //      ["ranked_serp_element.serp_item.type", "<>", "paid"],
  //      "or",
  //      ["ranked_serp_element.serp_item.is_paid", "=", false]
  //    ]
  //  ],
   "limit": 3
 });

 try {

   const response = await axios({
     method: 'post',
     url: 'https://api.dataforseo.com/v3/dataforseo_labs/google/ranked_keywords/live',
     auth: {
       username: process.env.SERP_API_LOGIN,
       password: process.env.SERP_API_PASSWORD
     },
     data: post_array,
     headers: {
       'content-type': 'application/json'
     }
   });
   const result = JSON.stringify(response.data.tasks, null, 2)
   return result;
 } catch (error) {
   console.error('Error fetching data:', error);
 }
};

export default dataForSeoLabsApi;
