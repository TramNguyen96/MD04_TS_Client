import './Navbar.scss'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '@services/apis';
import { Modal } from 'antd';

interface Category {
    id: number;
    img: string;
    title: string;
    des: string;
    link: string;
    banner: string;
}

export default function Navbar() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [totalCart, setTotalCart] = useState(0);

    useEffect(() => {
        try {
            api.categoryApi.findMany()
                .then(res => {
                    if (res.status !== 200) {
                        Modal.warning(res.data.message)
                    } else {
                        setCategories(res.data.data)
                    }
                })

        } catch (err) {
            console.log("err", err);
            alert("Server Network Client")

        }
    }, []);

    useEffect(() => {
        let total = JSON.parse(localStorage.getItem("carts") ?? "[]");
        let totalCart = total.reduce((result: number, nextItem: any) => {
            return result += nextItem.quantity;

        }, 0)
        console.log("totalCart", totalCart);

        setTotalCart(totalCart);
    }, [totalCart])

    return (
        <div className='nav' >
            <div className="nav_content">
                <div className="left_content">
                    {/* Logo */}

                    <a href="/">
                        <img src="https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Flogo.png?alt=media&token=4b39d89a-6f8c-4b8e-a7a7-7437faae69b9" className="logo" />
                    </a>

                </div>
                <div className="middle_content">

                    <Link to="/" className="item" key={Date.now() * Math.random()}>HOME</Link>
                    {
                        categories.map(category => (
                            <Link to={`/category/${category.id}`} className="item" key={Date.now() * Math.random()} style={{ textTransform: 'uppercase' }} > {category.title}</Link>
                        ))
                    }

                </div>
                <div className="right_content">
                    {/* Search */}
                    {/* <SearchByName /> */}
                    {/* Wishlist */}
                    <i className="fa-regular fa-heart" style={{ cursor: "pointer" }}></i>
                    {/* Cart */}
                    <Link to="/carts" className="item_cart">
                        <i className="fa-solid fa-bag-shopping " style={{ color: "#000" }}></i>
                        <span className="item_cart_number" style={{ color: "#000" }}>
                            {totalCart}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
