import {createSlice, isFulfilled} from "@reduxjs/toolkit";
import {jarvisApi} from "./jarvisAPI";

const jarvisSlice = createSlice({
  name: "jarvis",
  initialState: {
    user: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(jarvisApi?.endpoints.signIn.matchFulfilled, (state, { payload }) => {
        const index = state.user.findIndex(object => {
          return object.auth === true;
        });

        if (index === -1) {
        state.user.push({auth: true, accessToken: payload.accessToken, uid: payload.uid, client: payload.client})
      }
      else {
        state.user[index].accessToken = payload.accessToken;
        state.user[index].uid = payload.uid;
        state.user[index].client = payload.client
      }
    }
    )},
})
export const jarvisReducer = jarvisSlice.reducer;
//
// addToUser: (state, action) => {
//   debugger;
//   const auth = state.user.find((item) => item?.auth);
//   console.log("\nAuthentication: ", auth);
//   // state.user.push({...action.payload});
// },