// This file is the global reducer needed for the states thingy for redux (for darkmode and sidebard)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes{
   isSidebarCollapsed: boolean;
   isDarkMode: boolean;
}


const initialState : InitialStateTypes = {
   isSidebarCollapsed: false,
   isDarkMode:false,
}

// storing darkmode data and collapsed
// This global slice will be taking the initial state of the collapsed side bar and dark Modern_Antiqua, which are false
// Then the reducers will have a function that will change the state whenever a user clicks on the buttons
// This will then update the global state of either the sidebar or dark mode
export const globalSlice = createSlice({
   name: "global",
   initialState,
   // Making a little function that stores the current sidebar collapse once the user clicks on it
   reducers:{
      setIsSidebarCollapsed:(state,action: PayloadAction<boolean>)=>{
         state.isSidebarCollapsed = action.payload;
      },

      setIsDarkMode: (state, action: PayloadAction<boolean>) => {
         state.isDarkMode = action.payload;
      },
   },   
});

export const {setIsSidebarCollapsed, setIsDarkMode} = globalSlice.actions;

export default globalSlice.reducer;