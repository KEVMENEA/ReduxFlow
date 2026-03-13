<<<<<<< HEAD
=======
"use client"
>>>>>>> 909d5cd (RTK Query Practice)
import { counterSlice, decrease, increase } from "@/lib/features/counter/counterSlice"
import { useAppSelector } from "@/lib/hooks"
import { useDispatch } from "react-redux"

export default function Card() {
    const count = useAppSelector ((state) => state.counter.value)
    const dispatch = useDispatch();

    return (
        <div className="flex h-screen items-center justify-center">
             <h2>Calling Global state {count} </h2>
            <button onClick={() => dispatch(increase())}> Increase </button>
            <button onClick={() => dispatch(decrease())}> Decrease  </button>
        </div>
    )
}