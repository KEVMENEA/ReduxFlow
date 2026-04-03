"use client"
import { counterSlice, decrease, increase } from "@/lib/features/counter/counterSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"


export default function Card() {
    const count = useAppSelector ((state) => state.counter.value)
    const dispatch = useAppDispatch();

    return (
        <div className="flex h-screen items-center justify-center">
             <h2>Calling Global state {count} </h2>
            <button onClick={() => dispatch(increase())}> Increase </button>
            <button onClick={() => dispatch(decrease())}> Decrease  </button>
        </div>
    )
}