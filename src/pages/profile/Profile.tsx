import './Profile.scss'
import { useEffect, useState } from 'react'
import api from '@/services/apis'
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import { StoreType } from '@/stores';
import { useSelector } from 'react-redux';

interface User {
    id: string;
    avatar: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    userName: string
}

export default function Profile() {
    const store = useSelector(store => store) as StoreType;

    // console.log("store.userStore.data", store.userStore.data);

    return (
        <div className='profile'>
            <div className="student-profile py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card shadow-sm">

                                <div className="card-header bg-transparent text-center">
                                    <img
                                        className="profile_img"
                                        src={store.userStore.data.avatar}
                                    />
                                    <h3>{store.userStore.data.firstName} {store.userStore.data.lastName}</h3>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card shadow-sm">
                                <div className="card-header bg-transparent border-0">
                                    <h3 className="mb-0">
                                        <i className="far fa-clone pr-1" />
                                        General Information
                                    </h3>
                                </div>
                                <div className="card-body pt-0">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th width="30%">User Name</th>
                                                <td width="2%">:</td>
                                                <td>{store.userStore.data.userName}</td>
                                            </tr>
                                            <tr>
                                                <th width="30%">Email </th>
                                                <td width="2%">:</td>
                                                <td>{store.userStore.data.email}</td>
                                            </tr>
                                            <tr>
                                                <th width="30%">Relation</th>
                                                <td width="2%">:</td>
                                                <td>{store.userStore.data.isAdmin == false ? "Member" : "Admin"}</td>
                                            </tr>
                                            <tr>
                                                <th width="30%">Status</th>
                                                <td width="2%">:</td>
                                                <td>{store.userStore.data.isActive == true ? "Active" : "Blocked"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card shadow-sm">
                                <div className="card-header bg-transparent border-0">
                                    <h3 className="mb-0">
                                        <i className="far fa-clone pr-1" />
                                        Receipt Information
                                    </h3>
                                </div>
                                <div className="card-body pt-0">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th width="30%">Receipt</th>
                                                <td width="2%">:</td>
                                                <td>
                                                    <a href="/check-order" style={{ textDecoration: 'underline' }}>Check order status</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
