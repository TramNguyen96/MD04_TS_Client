import './ManagerProduct.scss';
import { useEffect, useRef, useState } from 'react';
import api from '@services/apis';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Loading from '../../../pages/homes/auths/loadings/Loading';



interface Category {
    id: string;
    title: string;
    avatar: string;
}
interface Picture {
    file: File;
    url: string;
}

export default function ManagerProduct() {
    const [load, setLoad] = useState(false);
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );

    const [categories, setCategories] = useState([]);
    const [pictures, setPictures] = useState<Picture[]>([]);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [formValues, setFormValues] = useState({
        name: "",
        price: "",
        des: ""
    });

    useEffect(() => {
        api.categoryApi.findMany()
            .then(res => {
                if (res.status != 200) {
                    alert(res.data.message)
                } else {
                    setCategories(res.data.data)
                }
            })
    }, []);

    async function addNewProduct(e: FormDataEvent) {
        e.preventDefault();

        if (load) return;

        let formData = new FormData();
        formData.append("product", JSON.stringify({
            categoryId: (e.target as any).categoryId.value,
            name: (e.target as any).name.value,
            des: (e.target as any).des.value,
            price: (e.target as any).price.value,
        }))

        formData.append("imgs", avatarFile!)
        for (let i in pictures) {
            formData.append("imgs", pictures[i].file)
        }

        setLoad(true);

        await api.productApi.create(formData)
            .then(res => {
                console.log("res", res)
                setFormValues({
                    name: "",
                    price: "",
                    des: "",
                });
                setPictures([]);
            })
            .catch(err => {

            })

        message.success({
            content: "Add new product successfully!"
        })

        setLoad(false);
    }

    return (
        <div>
            <h2 className='manager_product_title'>ADD NEW PRODUCT</h2>
            <div >
                <form onSubmit={(e) => {
                    addNewProduct(e);
                }}
                >
                    <div className='manager_product'>
                        <div className='manager_product_form'>
                            <label htmlFor="">Product Name</label><br />
                            <input type="text" name="name" value={formValues.name}
                                onChange={(e) => {
                                    setFormValues({ ...formValues, name: e.target.value });
                                }} /><br />

                            <label htmlFor="">Price</label><br />
                            <input type="number" name="price" value={formValues.price}
                                onChange={(e) => {
                                    setFormValues({ ...formValues, price: e.target.value });
                                }} /><br />

                            <label htmlFor="">Description</label><br />
                            <input type="text" name="des" value={formValues.des}
                                onChange={(e) => {
                                    setFormValues({ ...formValues, des: e.target.value });
                                }} /><br />

                            <label htmlFor="">Collection: </label>
                            <select name='categoryId'>
                                {
                                    categories.map(category => <option key={Math.random() * Date.now()} value={(category as Category).id}>{(category as Category).title}</option>)
                                }
                            </select><br />
                        </div>

                        <div className='manager_product_picture'>
                            <div className='manager_product_picture_upload'>
                                <label htmlFor="images" className="drop-container" id="dropcontainer">
                                    <span className="drop-title">Drop files here</span>
                                    or
                                    <input type="file" name='imgs' multiple id="images" accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                if (e.target.files.length > 0) {
                                                    let tempPictures: Picture[] = [];
                                                    for (let i in e.target.files) {
                                                        if (i == "length") {
                                                            break;
                                                        }
                                                        tempPictures.push({
                                                            file: e.target.files[i],
                                                            url: URL.createObjectURL(e.target.files[i])
                                                        })
                                                    }
                                                    setPictures(tempPictures);

                                                    e.target.value = "";
                                                }
                                            }
                                        }}
                                    />
                                </label>

                                <div className='manager_product_picture_renderpicture'>
                                    {
                                        pictures.map((picture, index) => (
                                            <img key={Date.now() * Math.random()} src={`${picture.url}`} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        {
                            load ?? <Loading />
                        }
                        <button type='submit' className={`${load && 'active'} btn_submit register_form_btn `}>


                            <div className='btn_loading'>
                                <Spin indicator={antIcon} />
                            </div>
                            Add New Product
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}
