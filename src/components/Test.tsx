/* Higher Order Component */
/* Memo bao ve comp khi props ko thay doi */
import { memo } from 'react';
import { Prop } from '@/pages/products/Product';

const Test = (data: Prop) => {
    const { count, handlePrintCount } = data;

    console.log("re-render Test");

    return (
        <div>
            <h1>TEST {count}</h1>
            <div>
                <button onClick={() => {
                    handlePrintCount(count)
                }}>Test 2</button>
            </div>

        </div>
    )
}

export default memo(Test);