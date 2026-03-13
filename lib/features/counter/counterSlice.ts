import { createSlice } from "@reduxjs/toolkit";

// define counterstate

export interface CounterState {
  value: number
}

<<<<<<< HEAD

=======
>>>>>>> 909d5cd (RTK Query Practice)
// define initialState
const initialState: CounterState = {
  value: 0,
}

// Define Reducer
export const counterSlice = createSlice({
    name: "counter",
    initialState,
     reducers: {
        increase : (state) => {
            state.value += 1;
        },
        decrease : (state) => {
            state.value -= 1;
        }
     }

})

// export 
export const {increase, decrease} = counterSlice.actions;

// export Reducer
export default counterSlice.reducer;









// compare like staff 