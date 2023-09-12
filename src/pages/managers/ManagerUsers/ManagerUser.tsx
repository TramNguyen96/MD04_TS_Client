import './ManagerUser.scss'
import { useEffect, useState } from 'react'
import api from '@/services/apis'

interface User {
    id: string;
    avatar: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    isAdmin: boolean;
    createAt: Date;
    isActive: boolean;
}

export default function ManagerUser() {
    const [listUsers, setListUsers] = useState<User[]>([])

    useEffect(() => {
        api.userApi.findMany()
            .then(res => {
                if (res.status == 200) {
                    // console.log("res.data", res.data);
                    setListUsers(res.data.data)
                } else {
                    alert(res.data.message)
                }
            })
            .catch(err => {
                console.log("err", err);

            })
    }, [])

    // useEffect(() => {
    //     console.log("listUsers", listUsers);
    // }, [])

    return (
        <div>
            <h2 className='list_product_title_user'>LIST USERS</h2>
            <div className='list_product'>
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr className='list_product_thead'>
                            <th>#</th>
                            <th style={{ width: '20%' }}>User Name</th>
                            <th style={{ width: '25%' }}>Email</th>
                            <th style={{ width: '10%' }}>Full Name</th>
                            <th style={{ width: '10%' }}>User ID</th>
                            <th style={{ width: '10%' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listUsers.map((user, index) => (
                                <tr className='list_product_tbody' key={user.id}>

                                    <td>{index + 1}</td>
                                    <td>
                                        {user.userName}
                                    </td>

                                    <td> {user.email}</td>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.id}</td>
                                    <td>{user.isActive == true ? "Active" : "Blocked"}</td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
