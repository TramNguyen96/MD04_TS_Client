import './ManagerReceipt.scss'
import { useEffect, useState } from 'react'
import api from '@/services/apis'
import { message } from 'antd'

interface Receipts {
    id: string;
    email: string;
    phoneNumber: string;
    total: number;
    payMode: string;
    createAt: Date;
    paid: boolean;
    state: string;
}

export default function ManagerReceipt() {

    const [listReceipts, setListReceipts] = useState<Receipts[]>([])

    useEffect(() => {
        api.purchaseApi.findAllGuestReceipt()
            .then(res => {
                if (res.status == 200) {
                    console.log("res.data receipt", res.data);
                    setListReceipts(res.data.data)
                } else {
                    message.warning(res.data.message)
                }
            })
            .catch(err => {
                console.log("err", err);

            })
    }, [])

    // useEffect(() => {
    //     console.log("listReceipts", listReceipts);
    // }, [])
    return (
        <div>
            <h2 className='list_product_title_user'>LIST ORDERS</h2>
            <div className='list_product'>
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr className='list_product_thead'>
                            <th>#</th>
                            <th style={{ width: '5%' }}>Order ID</th>
                            <th style={{ width: '20%' }}>Email</th>
                            <th style={{ width: '20%' }}>Phone Number</th>
                            <th style={{ width: '10%' }}>Pay Method</th>
                            <th style={{ width: '10%' }}>Paid</th>
                            <th style={{ width: '10%' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listReceipts.map((receipt, index) => (
                                <tr className='list_product_tbody' key={receipt.id}>

                                    <td>{index + 1}</td>
                                    <td>
                                        {receipt.id}
                                    </td>

                                    <td> {receipt.email}</td>
                                    <td>{receipt.phoneNumber}</td>
                                    <td>{receipt.payMode}</td>
                                    <td>{receipt.paid == true ? "Paid" : "Unpaid"}</td>
                                    <td>{receipt.state}</td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
