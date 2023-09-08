import { useEffect, useRef, useState } from 'react'
import api from '@services/apis'

interface Category {
    id: string;
    title: string;
    avatar: string;
}
interface Picture {
    file: File;
    url: string;
}
export default function Product() {
    const imgPreviewRef = useRef();
    const [categories, setCategories] = useState([]);
    const [pictures, setPictures] = useState<Picture[]>([]);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    useEffect(() => {
        api.categoryApi.findMany()
            .then(res => {
                if (res.status != 200) {
                    alert(res.data.message)
                } else {
                    setCategories(res.data.data)
                }
            })
    }, [])

    function addNewProduct(e: FormDataEvent) {
        e.preventDefault();
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

        api.productApi.create(formData)
            .then(res => {
                console.log("res", res)
            })
            .catch(err => {

            })

        window.alert("OK")
    }
    return (
        <form onSubmit={(e) => {
            addNewProduct(e);
        }}>
            <h1>Add Product</h1>
            <div>
                Category
                <select name='categoryId'>
                    {
                        categories.map(category => <option key={Math.random() * Date.now()} value={(category as Category).id}>{(category as Category).title}</option>)
                    }
                </select>
            </div>
            <div>
                Name
                <input name='name' type="text" />
            </div>
            <div>
                Des
                <input name='des' type="text" />
            </div>
            <div>
                Price
                <input name='price' type="text" />
            </div>
            <div>
                Avatar
                <input name='imgs' type="file" onChange={(e) => {
                    if (e.target.files) {
                        if (e.target.files.length > 0) {
                            (imgPreviewRef.current! as HTMLImageElement).src = URL.createObjectURL(e.target.files[0]);
                            setAvatarFile(e.target.files[0])
                        }
                    }
                }} />
                <img ref={imgPreviewRef} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
            </div>
            <div>
                Pictures
                <input name="imgs" type="file" multiple onChange={(e) => {
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
                }} />
                <div>
                    {
                        pictures.map((picture, index) => (
                            <img key={Date.now() * Math.random()} src={`${picture.url}`} style={{ width: "100px", height: "100px", borderRadius: '50%' }} />
                        ))
                    }
                </div>
            </div>
            <button type='submit'>Add</button>
        </form>
    )
}

