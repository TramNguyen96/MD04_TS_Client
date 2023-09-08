import React, { Component } from "react";
import Slider from "react-slick";
import './AutoImage.scss';

const listRealWed = [
    {
        img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2FBanner-14.jpg?alt=media&token=61964dc8-4fb6-4dc0-be5e-589ad4fe6c3c",
        date: "11/04/2023",
        title: "KAREN AND GEORG’S EVENING WEDDING CEREMONY",
    },
    {
        img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2F1-10-10.jpg?alt=media&token=d0ccd311-2de7-4b40-b11b-45f6cf986bba",
        date: "01/08/2023",
        title: "KACEY AND BRADLEY’S IDYLLIC WEDDING VENUE BANBURY",
    },
    {
        img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2F1-22-4.jpg?alt=media&token=b4e26bdf-5d26-4ebe-b248-be0fe169eef1",
        date: "26/05/2023",
        title: "IMOGEN AND ZACH’S HAMPSHIRE WEDDING VENUE",
    },
    {
        img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2F4-4.jpg?alt=media&token=e6af549e-d3a8-47e8-9792-53a62910f82a",
        date: "17/01/2023",
        title: "TIFFANY AND NICK’S PRETTY VILLAGE HALL WEDDING",
    },
    {
        img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2Fbanner-12.jpg?alt=media&token=8931be27-77d6-4fd3-bf8a-b1e81c0999a3",
        date: "30/03/2023",
        title: "ALICE AND DALE’S FAMILY-FRIENDLY ESSEX WEDDING",
    },
    {
        img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2FBanner-11.jpg?alt=media&token=bf2fae09-923e-4946-9ccd-cadd1962a36f",
        date: "14/03/2023",
        title: "IRIS AND MICHAEL’S COSY WEDDING AT HOME",
    },
    {
        img: "https://firebasestorage.googleapis.com/v0/b/md04-a5458.appspot.com/o/images%2F09-7.jpg?alt=media&token=2b557768-03f1-4878-a3c9-f07b111428d5",
        date: "02/10/2022",
        title: "JENNIFER AND COLIN’S ROMANTIC PARIS ELOPEMENT",
    }
]

export default class AutoPlay extends Component {
    render() {
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 3,
            speed: 1200,
            autoplay: true,
        };

        return (
            <div>
                <h2 className="real_weddings">REAL WEDDINGS</h2>
                <Slider {...settings}>
                    {
                        listRealWed.map((item, index) => (
                            <div className="autoImage">
                                <img src={item.img} className="autoImage_img" />
                                <p className="autoImage_date">{item.date} </p>
                                <h3 className="autoImage_title">{item.title}</h3>
                            </div>
                        ))
                    }
                </Slider>
            </div>
        );
    }
}