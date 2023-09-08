import { useEffect, useState } from 'react'
import './productDetail.scss'
import api from '@/services/apis'
import { useParams } from 'react-router-dom'
import currency from "currency.js";


interface Product {
    id: string;
    name: string;
    avatar: string;
    price: number;
    des: string;
    categoryId: string;
    productPictures: {
        id: string;
        path: string;
    }[]
}

interface CartItem {
    productId: string;
    quantity: number;
}

export default function ProductDetail() {
    const { productId } = useParams() as { productId: string };

    const [productDetail, setProductDetail] = useState<Product | null>(null)

    const [avatar, setAvatar] = useState('');

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        api.productApi.findById(productId)
            .then(res => {
                setProductDetail(res.data.data)
                avatar != res.data.data.avatar ? setAvatar(avatar) : setAvatar(res.data.data.avatar)

            })
            .catch(err => {
                console.log("err", err);

                alert("Network Server")
            })
    }, [])

    useEffect(() => {
        console.log("productDetail", productDetail);

    })

    function handleAddToCart(productId: string) {
        let carts: CartItem[] = JSON.parse(localStorage.getItem("carts") ?? "[]");
        if (carts.length == 0) {
            // cart rỗng
            carts.push({
                productId,
                quantity: quantity
            })
        } else {
            // cart có sp
            let flag: boolean = false;
            carts = carts.map(item => {
                if (item.productId == productId) {
                    item.quantity += 1
                    flag = true;
                }
                return item
            })
            if (!flag) {
                carts.push({
                    productId,
                    quantity: quantity
                })
            }
        }
        localStorage.setItem("carts", JSON.stringify(carts)) // save to local
    }


    return (
        <div className='product_detail'>
            <div className='product_detail_gallery'>
                <div
                    className="ecommerce-gallery"
                    data-mdb-zoom-effect="true"
                    data-mdb-auto-height="true"
                >
                    <div className="row shadow-5" style={{ width: '450px', height: '400px' }}>
                        <div className="col-12 avatar_large">
                            <div className="lightbox">
                                <img
                                    src={avatar == '' ? productDetail?.avatar : avatar}
                                    alt="Gallery image 1"
                                    className="ecommerce-gallery-main-img active w-100"
                                />
                            </div>
                        </div>
                        {
                            productDetail?.productPictures.map((picture, index) => (
                                <div className="col-3" style={{ marginTop: '0.5em' }}>
                                    <img onClick={() => {
                                        setAvatar(picture?.path);
                                    }}
                                        src={picture?.path}
                                        data-mdb-img={picture?.path}
                                        alt="Gallery image 1"
                                        className="active w-100"
                                        data-picture={JSON.stringify(picture)}
                                    />
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>

            <div className='content'>
                <div className='content-name'>{productDetail?.name}</div>
                <div className='content-price'>{currency(productDetail?.price!).format()}</div>
                <button type="button" className="btn btn-outline-dark"
                    onClick={() => {
                        if (quantity == 1) {
                            alert("You can't buy less than one !")
                        }
                        if (quantity > 1) {
                            setQuantity(quantity - 1)
                        }
                    }}
                >-</button>
                <span className='content-quantity'>{quantity}</span>
                <button type="button" className="btn btn-outline-dark"
                    onClick={() => {

                        setQuantity(quantity + 1)

                    }}
                >+</button><br />

                <p className='content-text'>
                    <p>{productDetail?.des}</p>
                    <ul>
                        <li>Free express shipping</li>
                        <li>Free returns</li>
                        <li>2 years warranty</li>
                    </ul>
                    <p>Cherry flowers are always beautiful, even if they're square-shaped. The Quadro Cherry Blossom combines the beauty of pastel tones with the sophisticated shimmer of genuine mother of pearl. Incrusted in a case made from rose gold plated stainless steel, this monochrome watch balances color with fine detailing and clear design lines. Wear it in spring or whenever your outfits need to bloom.</p>
                </p>

                <button onClick={() => {
                    handleAddToCart(productDetail?.id!)
                }}
                    type="button" className="btn btn-outline-dark w-50"

                >ADD TO BAGS</button>
            </div>

        </div>
    )
}