import './Navbar.scss'
import { Link } from 'react-router-dom';


export default function Navbar() {
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
                    {/* {
                        categories.map(category => (
                            <Link to={`/${category.id}`} className="item" key={Date.now() * Math.random()} > {category.title}</Link>
                        ))
                    } */}
                    {/* <Link to="/gift-set" className="item" key={Date.now() * Math.random()}>GIFTS & SETS</Link>
          <Link to="/makeup" className="item" key={Date.now() * Math.random()}>MAKE UP</Link>
          <Link to="/fragrance" className="item" key={Date.now() * Math.random()}>FRAGRANCE</Link>
          <Link to="/services" className="item" key={Date.now() * Math.random()}>SERVICES</Link> */}

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
                            {/* {
                                cartStore.data?.cart_details?.reduce((result, nextItem) => {
                                    return result += nextItem.quantity
                                }, 0)
                            } */}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
