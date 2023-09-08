import { useEffect, useState } from 'react';
import './Collection.scss';
import api from '@services/apis';
import { Modal } from 'antd';


// const collections = [
//     {
//         id: 1,
//         img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2FD361-Square-05.jpg?alt=media&token=1476f530-393e-4664-b322-dc1212443035",
//         title: "Disney Fairy Tale Weddings",
//         des: "Growing up, you imagined a princess gown and dreamed of the day your special someone would step into your story. Now that day has arrived, and you're getting ready to begin your own real-life happily ever after. Start the next chapter of your life in a dress beyond your imagination - one with magic in every thread.",
//         link: "/collection/disney-fairy-tale-wedding",
//         banner: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2FD361-Aurora-05.jpg?alt=media&token=611534a8-ccb4-44af-8076-19f2a3d2e1fe",
//     },
//     {
//         id: 2,
//         img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2FE365T-01-Square.jpg?alt=media&token=3e59e2f3-1dd7-493d-979e-4451a95ef9ca",
//         title: "Allure",
//         des: "Extraordinary moments are meant to be enjoyed in your favorite dress. Madison James gowns have something for everyone. A modern wedding dress made for timeless memories. An exquisite bridal gown made for authentic enjoyment. We've combined elegance of traditional bridal fashion, with the sensibility of today's bride. Meet Madison James.",
//         link: "/collection/allure",
//         banner: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2FE365T-01-H2.jpg?alt=media&token=2f70208d-3826-44fb-ab4e-61ecbe6b37ff",
//     },
//     {
//         id: 3,
//         img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2Fhair-accessories-d.jpg?alt=media&token=70ecf2ec-1491-4cc7-8c98-873867678e64",
//         title: "Accessories",
//         des: "Dreamed up for the ultra-romantic, luxe bride, each and every Abella gown is an absolute statement. The collection encompasses timeless lace bridal looks, chic satin off-shoulder gowns, on-trend long sleeves and dramatic mermaid silhouettes. A look for every bride, each design more jaw-dropping than the last.",
//         link: "/collection/accessories",
//         banner: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2Faccessories-banner-d.jpg?alt=media&token=d678e6b4-c97f-4966-b781-e30faaa22546",
//     },
//     {
//         id: 4,
//         img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2Funnamed_8cc378d1-5547-4ffc-a6f6-cb24e2a88b05_1600x.jpg?alt=media&token=29967fa1-4368-4d2c-b273-060a56c010c0",
//         title: "Suits & Tuxedos",
//         des: "Allure Suits & Tuxedos presents five collections of modern suiting and tuxedos that beautifully blend classic lines with thoughtful detailing and an on-trend fit.",
//         link: "/collection/suits-texedos",
//         banner: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2Funnamed_8cc378d1-5547-4ffc-a6f6-cb24e2a88b05_1600x%20(1).jpg?alt=media&token=c050d5e4-e40b-4191-b72b-170095033cf9",
//     }
// ];

interface Category {
    id: number;
    img: string;
    title: string;
    des: string;
    link: string;
    banner: string;
}

export default function Collection() {

    const [selected, setSelected] = useState<Category | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        try {
            api.categoryApi.findMany()
                .then(res => {
                    if (res.status !== 200) {
                        Modal.warning(res.data.message)
                    } else {
                        setCategories(res.data.data)
                        if (selected === null && res.data.data.length > 0) {
                            setSelected(res.data.data[0]);
                        }
                    }
                })

        } catch (err) {
            console.log("err", err);
            alert("Server Network Client")

        }
    }, []);

    const handleProductClick = (itemId: number) => {
        const item: Category | undefined = categories.find((i) => i.id === itemId);
        if (item) {
            setSelected(item);
        }
    };

    return (
        <div className='collection'>
            <div className='collection_view_item'>
                {
                    categories.map((category) => (
                        <div key={category.id}
                            onClick={() => {
                                handleProductClick(category.id)
                            }}
                            className='collection_item'>

                            <img
                                src={category.img} alt="" />
                            <h4>{category.title}</h4>
                        </div>
                    ))
                }
            </div>

            {
                selected && (
                    <div className='collection_description'>
                        <div>
                            <img src={selected.banner} alt="" />
                        </div>
                        <div className='collection_description_text'>
                            <h2>{selected.title}</h2>
                            <p>{selected.des}</p>
                            <a href={selected.link}>VIEW THE COLLECTION <i className="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                )
            }

        </div>
    )
}
