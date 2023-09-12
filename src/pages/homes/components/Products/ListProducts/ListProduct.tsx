import './ListProduct.scss'
import { useState, useEffect } from "react";
import api from "@/services/apis";


export default function ListProduct() {
    const [maxItemPage, setMaxItemPage] = useState(3);
    const [skipItem, setSkipItem] = useState(0);
    const [maxPage, setMaxPage] = useState<any[]>([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.productApi.pagination(maxItemPage, skipItem)
            .then(res => {
                if (res.status == 200) {
                    console.log("res.data", res.data)
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(res.data.data.length)
                    setProducts(res.data.data)
                }
            })
    }, []);

    function changePage(pageItemObj: any) {
        api.productApi.pagination(maxItemPage, pageItemObj.skip)
            .then(res => {
                if (res.status == 200) {
                    // console.log("res.data", res.data)
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(res.data.data.length)
                    setProducts(res.data.data)
                }
            })
    }

    useEffect(() => {
        console.log("maxPage", maxPage);

    }, [])
    return (
        <div>
            <table>
                <tbody >
                    {products.map((product: any, index) => (
                        <tr
                            key={Date.now() * Math.random()}>
                            <th scope="row">{index + 1}</th>
                            <td>
                                <img
                                    style={{
                                        width: "180px",
                                        height: "100px",
                                        borderRadius: "1%",
                                        padding: "10px"
                                    }}
                                    src={product.avatar}
                                    alt=""
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.des}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))}

                </tbody>
            </table>

            <div className='page_box'>
                {
                    maxPage?.map(item => {
                        return (
                            <span style={{ marginRight: "15px", cursor: "pointer" }} onClick={() => {
                                changePage(item)
                            }}>{item.number}</span>
                        )
                    })
                }
            </div>
        </div>
    )
}
