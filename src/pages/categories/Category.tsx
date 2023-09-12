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

const collections = [
    {
        title: "Disney Fairy Tale Wedding Dresses",
        content: "Dress dreams come true with the official Disney Fairy Tale Weddings dress collection, inspired by your favorite Disney Princesses. Growing up, you imagined a princess gown and dreamed of the day your special someone would step into your story. Now that day has arrived, and you're getting ready to begin your own real-life happily ever after. Start the next chapter of your life in a dress beyond your imagination - one with magic in every thread.",
        img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2Fapij4llbg__92060.original.jpg?alt=media&token=bc28ce6b-dbb9-4ebb-8e7b-3d7a4a5645a6"
    },
    {
        title: "Allure Romance Dresses",
        content: "Silky Mikado and soft, lace-paneled crepe are the stars of our Allure Romance collection, which focuses on beautiful design and a return to simplicity. There are abundant ethereal touches — blush tones, our timeless lace and layers of soft tulle. Understated silhouettes and matte-finish fabrics lend modernity, while detachable trains add an exotic flair to bridal looks throughout the collection.",
        img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2Fapi0dtj4e__35381.original.jpg?alt=media&token=6cb70e11-c5d0-4743-a1cc-1abd747d983d"
    },
    {
        title: "Accessories",
        content: "Allure Bridals pursues excellence in design and irreproachable craftsmanship to create a gown worthy of a bride’s most treasured moments. We believe brides should feel nothing less than gorgeous on their wedding day. Our designs blend rich fabrics like satin and lace with decadent beading and detailing, in addition to the comfort of our patented Allure construction. The result is the Allure Bridals brand family, with collections that embody the unique style of our brides.",
        img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2Fapilzbmqj__96965.original.jpg?alt=media&token=47b28b4c-c08d-439d-bbcd-e29de5cf727e"
    },
    {
        title: "Suits and Wedding Tuxedos",
        content: "Catherine Deane Wedding Suits & Tuxedos presents four collections of modern suiting which beautifully blends classic lines with thoughtful detailing and an on-trend fit. Our line of men’s and women’s wedding suits has something for everyone. Explore both traditional and modern men’s wedding suits in a range of styles and colors to suit grooms and their groomsmen. Find a timeless look with our luxurious velvet jackets, or choose something sleek and modern with dark blue, brown, or light gray merino wool.  ",
        img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2Fapib8pxik__38454.original.jpg?alt=media&token=727523f4-b0d9-4083-8e86-4ed8190c197f"
    }
]

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
            {
                pageData.map((collection) => (
                    <div className="product_collection_before">
                        <div className="product_collection_before_title">
                            <div className="product_collection_before_title_h1">
                                <h1>{collection.title}</h1>
                            </div>
                            <div className="product_collection_before_title_des">
                                <p>{collection.des}</p>
                            </div>
                        </div>
                        <div className="product_collection_before_title_img">
                            <img src={collection.banner} alt="images" />
                        </div>
                    </div>
                ))
            }

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
