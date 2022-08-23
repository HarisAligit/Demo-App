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
      const userInstance = state.user.some(item => item['auth']);
      if (userInstance === false) {
        state.user.push({auth: true, accessToken: payload.accessToken, uid: payload.uid, client: payload.client})
      }
      debugger;
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