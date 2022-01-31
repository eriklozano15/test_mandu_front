import axios from "axios";

const API_URL = process.env.REACT_APP_URL + 'api/';

class ApiService {
  getDivisions() {
    return axios
      .get(API_URL + "divisions", {
        headers: {
          
        }
      })
      .then(response => {
        return response.data;
      })
      .catch((error) => {
        console.error(error)
      })
  }

  postDivision(data) {
    return axios
      .post(API_URL + "divisions",data, {
        headers: {
          
        }
      })
      .then(response => {
        return response.data;
      })
      .catch((error) => {
        if(error.response){
          return error.response.data;
        }
        //console.error(error.response.data.message)
      })
  }

}

export default new ApiService();