import './Collection_Disney.scss';
import React, { Component } from "react";
import Slider from "react-slick";


export default class Collection_Disney extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    return (
      <div>
        <h2 className='product_collection_name'>Disney Fairy Tale Weddings</h2>
        <div className='product_collection'>
          <div className='product_collection_intro'>
            <p>Growing up, you imagined a princess wedding gown and dreamed of the day your special someone would step into your story. Now that day has arrived, and you're getting ready to begin your own real-life happily ever after. Start the next chapter of your life in a dress beyond your imagination - one with magic in every thread. Browse our Disney Fairy Tale Weddings collection for a selection of princess inspired wedding dresses designed to make your fairy tale wedding dreams a reality. </p>
            <a href="">View Disney Fairy Tale Weddings <i className="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
        <Slider {...settings}>
          <div>
            <div className='product_collection_item'>
              <img src="https://cdn11.bigcommerce.com/s-7kdijiqhnq/images/stencil/640w/products/2955/57443/DP353T-Cinderella-01__29015.1678992637.jpg?c=1" alt="" />
              <h3>DP353T - Cinderella Train</h3>
              <p>The Cinderella Platinum detachable train, composed of gorgeous scattered sequin sparkle tulle with carriage inspired beaded lace appliqués truly transformation the look.</p>
            </div>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>

        </Slider>
      </div>
    );
  }
}