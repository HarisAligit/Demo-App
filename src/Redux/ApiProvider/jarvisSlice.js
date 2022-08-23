import {createSlice, current, isFulfilled} from "@reduxjs/toolkit";
import {jarvisAPIAuth} from "./jarvisAPIAuth";
import {jarvisAPIOpen} from "./jarvisAPIOpen";

const jarvisSlice = createSlice({
  name: "jarvis",
  initialState: {
    user: [],
    LoggedIn: false,
    name: '',
    reference_number: null,
    phone: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(jarvisAPIOpen?.endpoints?.signIn?.matchFulfilled, (state, { payload }) => {

      const index = current(state.user).findIndex(object => {
        return object.auth === true;
      });

      if (index === -1) {
        current(state.user).push({auth: true, accessToken: payload.accessToken, uid: payload.uid, client: payload.client})
      }
      else {
        current(state.user)[index].accessToken = payload.accessToken;
        current(state.user)[index].uid = payload.uid;
        current(state.user)[index].client = payload.client
      }
      console.log(current(state.user))
    })
   builder.addMatcher(jarvisAPIAuth?.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
      debugger;
     console.log("\nCurr _ User", current(state))
     if (current(state?.curr_user)["LoggedIn"] === false){
       current(state.curr_user)["LoggedIn"] = true;
       current(state.curr_user)["name"] = payload.user.name;
       current(state.curr_user)["reference_number"] = payload.user.reference_number;
       current(state.curr_user)["phone"] = payload.user.phone;
     }
   })
  },
})
export const jarvisReducer = jarvisSlice.reducer;