import { createStore } from "vuex";
import state from "./state";
import * as getters from "./getters";
import * as actions from "./actions";
import * as mutations from "./mutation";

export default createStore({
  state,
  getters,
  actions,
  mutations,
});