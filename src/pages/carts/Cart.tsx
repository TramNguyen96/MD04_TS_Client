import React, { useEffect, useState } from 'react'
import './Cart.scss'
import api from '@/services/apis'
import currency from "currency.js";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { useSelector } from 'react-redux';
import { StoreType } from "../../stores";
import { message, Modal } from 'antd';


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
interface CartItemDetail extends CartItem {
    productDetail: Product
}

interface newGuestReceipt {
    email: string;
    total: number;
    payMode: string;
}

export default function Cart() {
    const [cart, setCart] = useState<CartItemDetail[]>([]);

    const store = useSelector(store => store) as StoreType;

    // const initialCart = JSON.parse(localStorage.getItem('cart') || '[]');
    // const [cartQuantity, setCartQuantity] = useState<{ id: string; name: string; quantity: number }[]>(initialCart);

    async function formatCart() {
        let cartTemp: CartItemDetail[] = [];
        let carts: CartItem[] = JSON.parse(localStorage.getItem("carts") ?? "[]");
        for (let i in carts) {
            let productDetail = await api.productApi.findById(carts[i].productId).then(res => res.data.data)
            cartTemp.push({
                ...carts[i],
                productDetail
            })
        }
        setCart(cartTemp)
    }

    useEffect(() => {
        formatCart();
    }, [])

    // useEffect(() => {
    //     localStorage.setItem('cart', JSON.stringify(cartQuantity));
    // }, [cartQuantity]);

    function updateCart(e: React.MouseEvent<HTMLButtonElement>, itemToUpdate: any) {
        e.preventDefault();
        const updatedCart = [...cart];
        const index = updatedCart.findIndex((item) => item.productId === itemToUpdate.productId);

        if (index !== -1) {
            if (e.target instanceof HTMLButtonElement) {
                if (e.target.innerText === '-') {
                    updatedCart[index].quantity -= 1;
                    if (updatedCart[index].quantity === 0) {
                        let confirm = window.confirm("Do you want to delete the product?")
                        if (confirm) {
                            updatedCart.splice(index, 1); // Remove the item from the cart
                        } else {
                            updatedCart[index].quantity = 1
                        }
                        setCart(updatedCart)
                    }
                } else if (e.target.innerText === '+') {
                    updatedCart[index].quantity += 1;
                }

                localStorage.setItem('carts', JSON.stringify(updatedCart));
                setCart(updatedCart);
            }
        }
    }

    function deleteItem(index: number, itemId: string) {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);

        // Cập nhật giỏ hàng ở localStorage và state
        localStorage.setItem('carts', JSON.stringify(updatedCart));
        setCart(updatedCart);

    }
    function handleOrder() {

        if (store.userStore.isLogin == true) {
            let newGuestReceipt: newGuestReceipt = {
                email: store.userStore.data.email,
                total: cart.reduce((value, cur) => {
                    return value + cur.quantity * cur.productDetail.price
                }, 0),
                payMode: "CASH"
            }
            let guestReceiptDetailList = JSON.parse(localStorage.getItem("carts") ?? "[]")

            api.purchaseApi.createGuestReceipt(newGuestReceipt, guestReceiptDetailList)
                .then(res => {
                    console.log("res", res.data)
                })
                .catch(err => {
                    console.log("err", err);

                })
        } else {
            let userConfirm = window.confirm("You have not registered yet, please enter your information to purchase")
            if (userConfirm) {
                window.location.href = '/get-info'
            }
        }

    }

    return (
        <div className='cart-total' >
            <div className='cart-total-table'>
                <section className="pt-5 pb-5">
                    <div className="container">
                        <div className="row w-100">
                            <div className="col-lg-12 col-md-12 col-12">
                                <h3 className=" mb-3 text-center" style={{ fontSize: '30px', fontWeight: 'bold' }}>List Shopping Cart</h3>
                                <p className="mb-3 text-center">
                                    <i className="fa-solid fa-tags"></i> <span className=" font-weight-bold">{cart.length}</span> items in your cart
                                </p>
                                <table
                                    id="shoppingCart"
                                    className="table table-condensed table-responsive"
                                    style={{ color: '#000' }}
                                >
                                    <thead>
                                        <tr>
                                            <th style={{ width: "40%", fontWeight: 'bold' }}>Product</th>
                                            <th style={{ width: "12%", fontWeight: 'bold' }}>Price</th>
                                            <th style={{ width: "20%", fontWeight: 'bold' }}>Quantity</th>
                                            <th style={{ width: "15%", fontWeight: 'bold' }}>Total Item</th>
                                            <th style={{ width: "15%", fontWeight: 'bold' }} />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart.map((item, index) => (
                                                <tr key={item.productId}>
                                                    <td data-th="Product">
                                                        <div className="row">
                                                            <div className="col-md-3 text-left">
                                                                <img
                                                                    src={item.productDetail.avatar}
                                                                    alt=""
                                                                    className="img-fluid d-none d-md-block rounded mb-2 shadow "
                                                                />
                                                            </div>
                                                            <div className="col-md-9 text-left mt-sm-2">
                                                                <h4>{item.productDetail.name}</h4>
                                                                {/* <p className="font-weight-light">Brand &amp; Name</p> */}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td data-th="Price">{currency(item.productDetail.price).format()}</td>
                                                    <td data-th="Quantity" className='content-quantity'>
                                                        <button type="button"
                                                            onClick={(e) => {
                                                                updateCart(e, item);
                                                            }}
                                                        >-</button>
                                                        <span>{item.quantity}</span>
                                                        <button type="button"
                                                            onClick={(e) => {
                                                                updateCart(e, item);
                                                            }}
                                                        >+</button><br />
                                                    </td>
                                                    <td>
                                                        {currency(item.productDetail.price * item.quantity).format()}
                                                    </td>
                                                    <td className="actions" data-th="">
                                                        <div className="text-right">
                                                            {/* <button className="btn btn-white border-secondary bg-white btn-md mb-2">
                                                            <i className="fas fa-sync" />
                                                        </button> */}
                                                            <button onClick={() => {
                                                                if (window.confirm("Delete?")) {
                                                                    deleteItem(index, item.productId)
                                                                    window.location.reload()
                                                                }
                                                            }}
                                                                className="btn btn-white border-secondary bg-white btn-md mb-2">
                                                                <i className="fas fa-trash" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                                <div className="float-right text-right">
                                    <h4 style={{ fontSize: '20px' }}>Subtotal:</h4>
                                    <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '0.5em' }}>
                                        {
                                            cart ? (
                                                currency(cart?.reduce((value, nextItem) => {
                                                    return value + (nextItem.quantity * nextItem.productDetail.price)
                                                }, 0)).format()
                                            )
                                                :
                                                currency(0).format()
                                        }
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 d-flex align-items-center">
                            <div className="col-sm-6 order-md-2 text-right">
                                {/* <a
                                    href="catalog.html"
                                    className="btn btn-primary mb-4 btn-lg pl-5 pr-5"
                                >
                                    Checkout
                                </a> */}
                            </div>
                            <div className="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
                                <a href="/">
                                    <i className="fas fa-arrow-left mr-2" /> Continue Shopping
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className='cart-total-payment'>
                <MDBCol lg="12" className="px-5 py-4">
                    <MDBTypography
                        tag="h3"
                        className=" mb-5 mt-3 pt-2 text-center fw-bold "
                        style={{ fontSize: '30px' }}
                    >
                        Payment Method
                    </MDBTypography>

                    <div className="mb-5">
                        <MDBRow>
                            <MDBCol>
                                <>
                                    {/* Payment Method */}
                                    <>
                                        <form
                                        // onSubmit={(eventForm) => {
                                        //     checkOut(eventForm);
                                        // }}
                                        >

                                            {/* Cash */}
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    value="CASH"
                                                    name='payment'
                                                    id="flexRadioDefault1"
                                                />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    {" "}
                                                    Cash{" "}
                                                </label>
                                            </div>
                                            {/* ZaloPay */}
                                            <div className="form-check mb-4">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    value="ZALO"
                                                    name='payment'
                                                    id="flexRadioDefault2"
                                                // defaultChecked=""
                                                />
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    {" "}
                                                    ZaloPay{" "}
                                                </label>
                                            </div>

                                            <button onClick={() => {
                                                handleOrder()
                                            }}
                                                type='button' className="payment-btn"
                                            >CHECKOUT</button>

                                        </form>
                                    </>

                                </>

                            </MDBCol>
                        </MDBRow>
                    </div>

                </MDBCol>
            </div>
        </div>
    )
}
