import { useEffect, useState } from "react";
import api from '@services/apis'
import './Category.scss';
import currency from "currency.js";
import { Link, useParams } from 'react-router-dom';

interface Category {
    id: string;
    title: string;
    active: boolean;
    avatar: string;
    img?: string;
    banner?: string;
    des?: string;
    link?: string;
    products: Product[];
}

interface Product {
    id: string;
    name: string;
    avatar: string;
    price: number;
    des?: string;
    categoryId: string;
    category: Category;
}

export default function Category() {

    const { category } = useParams() as { category: string };
    const [pageData, setPageData] = useState<Category[]>([]);

    useEffect(() => {
        api.categoryApi.findByCategotyId(category)
            .then(res => {
                if (res.status == 200) {
                    setPageData(res.data.data)
                } else {
                    alert(res.data.message)
                }
            })
            .catch(err => {
                console.log("err", err);

                alert("Server Network Client")
            })
    }, [category])

    useEffect(() => {
        console.log('pageData', pageData);
    }, []);
    return (
        <div>
            <div className="product_collection">
                {
                    Array.isArray(pageData) && pageData.length > 0 ? (
                        pageData.map((category: Category) =>
                            category.products.map((product: Product) => (
                                <Link to={`/products/detail/${product.id}`} key={product.name}>
                                    <div className='product_collection_item'>
                                        <div className='product_collection_item_img'>
                                            <img src={product.avatar} />
                                        </div>
                                        <div className='product_collection_item_h3'>
                                            <h3>{product.name}</h3>
                                        </div>
                                        <div className='product_collection_item_price'>
                                            <p>{currency(product.price).format()}</p>
                                        </div>
                                        <div className='product_collection_item_des'>
                                            <p>{product.des}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )
                    ) : (
                        <p>No products found</p>
                    )
                }
            </div>
        </div>
    )
}
