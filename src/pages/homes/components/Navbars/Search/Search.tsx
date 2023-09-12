import React, { useState, useEffect } from 'react';
import './Seach.scss'
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBInput
} from 'mdb-react-ui-kit';
import { SearchOutlined } from '@ant-design/icons'
import api from '@/services/apis';
import currency from 'currency.js';

interface Product {
    id: string;
    name: string;
    avatar: string;
    price: number;
    des?: string;
    categoryId: string;
}

export default function Search() {
    const [optXlModal, setOptXlModal] = useState(false);
    const toggleShow = (() => {
        setOptXlModal(!optXlModal)
        // dispatch(productActions.clearSearchData())
    });

    let timeOut: any;
    const [searchStatus, setSearchStatus] = useState(false)
    const [searchData, setSearchData] = useState<Product[]>([])

    async function searchKeyWords(keyWord: any) {
        clearTimeout(timeOut);
        if (keyWord.target.value === "") {
            setSearchData([]);
            return;
        }

        // Set searchStatus to true when starting the search.
        setSearchStatus(true);
        timeOut = setTimeout(async () => {
            try {

                // Call the API to search for products by name.
                let result = await api.productApi.search(keyWord.target.value);
                console.log("result", result);

                if (result.status === 200) {

                    await new Promise((resolve) => setTimeout(resolve, 500));
                    setSearchStatus(false);
                    setSearchData(result.data.data);
                } else {
                    console.log("API request failed with status", result.status);
                }
            } catch (err) {
                console.log("Error calling the API", err);
            }
        }, 250);
    }

    // useEffect(() => {
    //     console.log("searchData", searchData);

    // }, [searchData])

    return (
        <>
            <a onClick={toggleShow} style={{ backgroundColor: '', border: 'none', cursor: "pointer", marginBottom: "8px", zIndex: '9999' }}><SearchOutlined /></a>
            <MDBModal show={optXlModal} tabIndex='-1' setShow={setOptXlModal}>
                <MDBModalDialog size='xl'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>
                                <MDBInput label='Looking for...' id='typeText' type='text' className='inputSearch'
                                    onChange={(keyWord) => {
                                        searchKeyWords(keyWord)
                                    }}

                                />
                            </MDBModalTitle>

                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <div className='searchItems'>
                            {searchData?.map((item) =>
                                <div key={item.id}
                                    onClick={() => {
                                        window.open("/products/detail/" + item.id, "_blank");
                                    }}
                                    className='product_collection_item'>
                                    <div className='product_collection_item_img'>
                                        <img src={item.avatar} />
                                    </div>
                                    <div className='product_collection_item_h3'>
                                        <h3>{item.name}</h3>
                                    </div>
                                    <div className='product_collection_item_price'>
                                        <p>{currency(item.price).format()}</p>
                                    </div>

                                </div>
                            )}
                        </div>


                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </>
    );
}