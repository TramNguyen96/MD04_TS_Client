import Test from "@/components/Test"
import { Outlet } from "react-router-dom"
import { useState, useCallback } from 'react'

export interface Prop {
    count: number,
    handlePrintCount: (count: number) => void
}

export default function Product() {
    const [count, setCount] = useState(0);

    const [count2, setCount2] = useState(0);

    const handlePrintCount = useCallback((count: number) => {
        alert("Count value is: " + count)
    }, [count])


    console.log("re-render Product");

    return (
        <div>
            <h1>Product {count}</h1>
            <Test count={count} handlePrintCount={handlePrintCount} />
            <Outlet />
            <button onClick={() => {
                setCount(count + 1)
            }}>Increse</button><br />

            <button onClick={() => {
                setCount2(count2 + 1)
            }}>Increase 2</button>
        </div>
    )
}
