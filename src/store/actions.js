
import axios from "axios";
export const getProducts = ({ commit }) => {
    axios
      .get("https://localhost:44309/api/Product/GetAll")
      .then((res) => {
        commit("SET_PRODUCTS", res.data);
      })
      .catch((error) => console.log(error));
  };
export const getOdersStatic = ({commit}) => {
    axios.get("https://localhost:44309/api/Order/Statistical")
         .then((response) => {
            commit("SET_ODER_STATIC", response.data);
            console.log(response)
         });
    
};