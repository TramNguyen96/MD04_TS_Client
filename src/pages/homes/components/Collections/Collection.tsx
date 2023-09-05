import { useState } from 'react';
import './Collection.scss'

const collections = [
    {
        id: 1,
        img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2FD361-Square-05.jpg?alt=media&token=1476f530-393e-4664-b322-dc1212443035",
        title: "Disney Fairy Tale",
        des: "Growing up, you imagined a princess gown and dreamed of the day your special someone would step into your story. Now that day has arrived, and you're getting ready to begin your own real-life happily ever after. Start the next chapter of your life in a dress beyond your imagination - one with magic in every thread.",
        link: "/collection/disney-fairy-tale",
        fullImg: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2FD361-Aurora-05.jpg?alt=media&token=611534a8-ccb4-44af-8076-19f2a3d2e1fe",
    },
    {
        id: 2,
        img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2FMJ962-Square.jpg?alt=media&token=9bca5a8f-99b0-4d36-b992-cbaa02062308",
        title: "Madison James",
        des: "Extraordinary moments are meant to be enjoyed in your favorite dress. Madison James gowns have something for everyone. A modern wedding dress made for timeless memories. An exquisite bridal gown made for authentic enjoyment. We've combined elegance of traditional bridal fashion, with the sensibility of today's bride. Meet Madison James.",
        link: "/collection/madison-james",
        fullImg: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2FMJ962-08.jpg?alt=media&token=e7166028-3337-4f91-b77d-d16789b70035",
    },
    {
        id: 3,
        img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2FE365T-01-Square.jpg?alt=media&token=3e59e2f3-1dd7-493d-979e-4451a95ef9ca",
        title: "Abella",
        des: "Dreamed up for the ultra-romantic, luxe bride, each and every Abella gown is an absolute statement. The collection encompasses timeless lace bridal looks, chic satin off-shoulder gowns, on-trend long sleeves and dramatic mermaid silhouettes. A look for every bride, each design more jaw-dropping than the last.",
        link: "/collection/abella",
        fullImg: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2FE365T-01-H2.jpg?alt=media&token=2f70208d-3826-44fb-ab4e-61ecbe6b37ff",
    },
    {
        id: 4,
        img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2FA1107-Square-07.jpg?alt=media&token=223149db-8bbe-4fcb-acdc-13f531eabc47",
        title: "Suits & Tuxedos",
        des: "Allure Suits & Tuxedos presents five collections of modern suiting and tuxedos that beautifully blend classic lines with thoughtful detailing and an on-trend fit.",
        link: "/collection/suits-texedos",
        fullImg: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fcollections%2FA1107-07.jpg?alt=media&token=2cb7024a-e8be-427b-b8e2-b898212f1e1e",
    }
];

interface Item {
    id: number;
    img: string;
    title: string;
    des: string;
    link: string;
    fullImg: string;
}

export default function Collection() {

    const [selected, setSelected] = useState<Item | null>(null);

    const handleProductClick = (itemId: number) => {
        const item: Item | undefined = collections.find((i) => i.id === itemId);
        if (item) {
            setSelected(item);
        }
    };

    return (
        <div className='collection'>
            <div className='collection_view_item'>
                {
                    collections.map((item) => (
                        <div onClick={() => {
                            handleProductClick(item.id)
                        }}
                            className='collection_item'>

                            <img
                                src={item.img} alt="" />
                            <h4>{item.title}</h4>
                        </div>
                    ))
                }
            </div>

            {
                selected && (
                    <div className='collection_description'>
                        <div>
                            <img src={selected.fullImg} alt="" />
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
