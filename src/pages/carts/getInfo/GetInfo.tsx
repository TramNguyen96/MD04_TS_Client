import { useEffect, useState } from 'react';
import './GetInfo.scss'
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
import api from '@/services/apis';
import { Modal } from 'antd';

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
    phoneNumber: string;
    total: number;
    payMode: string;
}

export default function GetInfo() {
    const [cart, setCart] = useState<CartItemDetail[]>([]);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

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

    async function handleOrderGuest(event: any) {
        event.preventDefault();

        let newGuestReceipt: newGuestReceipt = {
            email: email,
            phoneNumber: phone,
            total: cart.reduce((value, cur) => {
                return value + cur.quantity * cur.productDetail.price
            }, 0),
            payMode: "CASH"
        }

        let guestReceiptDetailList = JSON.parse(localStorage.getItem("carts") ?? "[]")

        await api.purchaseApi.createGuestReceipt(newGuestReceipt, guestReceiptDetailList)
            .then(res => {
                console.log("res", res.data)
                Modal.success({
                    content: "Order Payment Successful!",
                    onOk: () => {
                        window.location.href = "/check-order"
                    }
                })

            })
            .catch(err => {
                console.log("err api", err);

            })
        localStorage.removeItem("carts")
        setEmail('')
        setPhone('')

    }

    return (
        <div className="get_info">
            <MDBCol lg="12" className="px-5 py-4">
                <MDBTypography
                    tag="h3"
                    className=" mb-5 mt-3 pt-2 text-center fw-bold "
                    style={{ fontSize: '30px' }}
                >
                    Payment for Guest
                </MDBTypography>

                <div className="mb-5">
                    <MDBInput
                        className="mb-5"
                        label="Email"
                        name='email'
                        type="text"
                        size="lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%' }}

                    // defaultValue={
                    //     userStore.data ? "1234 5678 9012 3457" : ""
                    // }

                    />

                    <MDBInput
                        className="mb-5"
                        label="Phone Number"
                        name='phone'
                        type="text"
                        size="lg"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ width: '100%' }}

                    // defaultValue={
                    //     userStore.data ? `${userStore.data?.first_name} ${userStore.data?.last_name}` : ""
                    // }
                    />

                    {/* <MDBInput
                            className="mb-5"
                            label="Total"
                            name='total'
                            type="text"
                            size="lg"
                        // defaultValue={
                        //     userStore.data ? `${userStore.data?.first_name} ${userStore.data?.last_name}` : ""
                        // }
                        /> */}

                    <MDBRow>
                        <MDBCol>
                            <>
                                Payment Method
                                <>
                                    <form
                                        onSubmit={(eventForm) => {
                                            handleOrderGuest(eventForm);
                                        }}
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

                                        <button
                                            // onClick={() => {
                                            //     handleOrder()
                                            // }}
                                            type='submit' className="payment-btn"
                                        >CHECKOUT</button>

                                    </form>
                                </>

                            </>

                        </MDBCol>
                    </MDBRow>
                </div>

            </MDBCol>
        </div>
    )
}
