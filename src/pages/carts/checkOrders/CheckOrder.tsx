import './CheckOrder.scss'
import { useEffect, useState } from 'react'
import api from '@/services/apis';
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
import currency from 'currency.js';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Loading from '../../homes/auths/loadings/Loading';


interface GuestReceipt {
    acceptTime: null | string;
    createAt: string;
    doneTime: null | string;
    email: string;
    guestReceiptDetail: GuestReceiptDetail[];
    id: string;
    paid: boolean;
    payMode: string;
    phoneNumber: string;
    shippingTime: null | string;
    state: string;
    total: number;
}

interface GuestReceiptDetail {
    id: string;
    productId: string;
    quantity: number;
    guestReceiptId: string;
    product: Product;
}

interface Product {
    avatar: string;
    categoryId: string;
    des: string;
    id: string;
    name: string;
    price: number;
}


export default function CheckOrder() {
    const [load, setLoad] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [receipts, setReceipts] = useState<GuestReceipt[]>([])

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );
    function handleGetOtp() {

        api.purchaseApi.findGuestReceipt({ email: emailInput })
            .then(res => {
                if (res.status == 200) {
                    message.success(res.data.message)
                } else {
                    message.error("Receipt not found !")
                }
            })
            .catch(err => {
                console.log("lỗi", err)
            })

    }

    function handleGetReceipt() {
        api.purchaseApi.findGuestReceipt({ email: emailInput, otp: window.prompt("OTP của bạn ?") ?? "00000" })
            .then(res => {
                if (res.status == 200) {
                    setReceipts(res.data.data)
                    message.success(res.data.message)
                } else {
                    message.error(res.data.message)
                }
            })
        setEmailInput("")
    }

    // useEffect(() => {
    //     console.log("receipts", receipts);

    // })

    return (
        <div className='check_order'>
            <div className='check_order_form'>
                <h1>Check Order Receipt</h1>
                <div className='check_order_form_input'>
                    <MDBInput
                        className="mb-3"
                        label="Email"
                        name='email'
                        type="text"
                        size="lg"
                        value={emailInput}
                        onChange={(e) => {
                            setEmailInput(e.target.value)
                        }}
                        style={{ width: '100%' }}
                    />

                    <div className='add-cart-btn ' >
                        {
                            load ?? <Loading />
                        }
                        <button className={`${load && 'active'} btn_submit `} onClick={() => {
                            handleGetOtp()
                        }}>GET OTP CODE
                            <div className='btn_loading'>
                                <Spin indicator={antIcon} />
                            </div>
                        </button>
                    </div>

                    <div className='add-cart-btn'>
                        <button onClick={() => {
                            handleGetReceipt()
                        }}>GET RECEIPT</button>
                    </div>

                </div>
            </div>

            {
                receipts.length > 0 ? (
                    <div className='check_order_list_receipt'>
                        <div className="row">
                            {
                                receipts.map((receipt) => (
                                    <div key={receipt.id} className="well col-xs-12 col-sm-12 col-md-12 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
                                        <div className="row">
                                            <div className="col-xs-6 col-sm-6 col-md-6">
                                                <address>
                                                    <strong>{receipt.email}</strong><br />
                                                    <abbr title="Phone">Phone:</abbr> {receipt.phoneNumber}
                                                </address>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6 text-right">
                                                <p>
                                                    <em>Date: {receipt.createAt}</em>
                                                </p>
                                                <p>
                                                    <em>Receipt #: {receipt.id}</em>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="text-center fw-bold" style={{ fontSize: '30px', margin: '0.5em' }}>
                                                <h1>Receipt</h1>
                                            </div>
                                            <table className="table table-hover" style={{ color: '#000' }}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ fontWeight: 'bold' }}>Product</th>
                                                        <th style={{ fontWeight: 'bold' }}>Quantity</th>
                                                        <th style={{ fontWeight: 'bold' }} className="text-center">Price</th>
                                                        <th style={{ fontWeight: 'bold' }} className="text-center">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        receipt.guestReceiptDetail.map((item) => (
                                                            <tr>
                                                                <td className="col-md-9">
                                                                    <em>{item.product.name}</em>
                                                                </td>
                                                                <td className="col-md-1" style={{ textAlign: "center" }}>
                                                                    {item.quantity}
                                                                </td>
                                                                <td className="col-md-1 text-center">{currency(item.product.price).format()}</td>
                                                                <td className="col-md-1 text-center">{currency(item.quantity * item.product.price).format()}</td>
                                                            </tr>
                                                        ))
                                                    }


                                                    <tr>
                                                        <td> &nbsp; </td>
                                                        <td> &nbsp; </td>
                                                        <td className="text-right">
                                                            <p>
                                                                <strong>Subtotal:&nbsp;</strong>
                                                            </p>
                                                            <p>
                                                                <strong>Tax:&nbsp;</strong>
                                                            </p>
                                                        </td>
                                                        <td className="text-center">
                                                            <p>
                                                                <strong>{currency(receipt.total).format()}</strong>
                                                            </p>
                                                            <p>
                                                                <strong>{currency(0).format()}</strong>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td> &nbsp; </td>
                                                        <td> &nbsp; </td>
                                                        <td className="text-right">
                                                            <h4>
                                                                <strong>Total:&nbsp;</strong>
                                                            </h4>
                                                        </td>
                                                        <td className="text-center text-danger">
                                                            <h4 style={{ fontSize: '18px' }}>
                                                                <strong>{currency(receipt.total).format()}</strong>
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>

                    </div>
                )
                    :
                    ""
            }
        </div>
    )
}
{/* <ul>
                {
                    receipts.map((receipt: any, index: number) => {
                        return (
                            <li key={receipt.id}>
                                <p>STT: {index + 1}</p>
                                <p>Mã hóa đơn: {receipt.id}</p>
                                <div>
                                    Sản Phẩm
                                    <ul>
                                        {
                                            receipt.guestReceiptDetail.map((item: any, index2: number) => {
                                                return (
                                                    <li key={item.productId}>
                                                        <p>STT: {index2 + 1}</p>
                                                        <p>Mã SP: {item.productId}</p>
                                                        <p>Số Lượng: {item.quantity}</p>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </li>
                        )
                    })
                }
            </ul> */}