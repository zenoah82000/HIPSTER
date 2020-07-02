import React from 'react'
import '../../styles/product/ProductDescription.scss'

function ProductDescription(props) {
  const { productContent } = props
  return (
    <>
      <div className="product-description">
        <h2 className="product-description-title">行程介紹</h2>
        <pre className="product-content">{productContent}</pre>
        <div className="product-images-area">
          <figure className="product-images">
            <img src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/blztfb2nbrjo7sslcwvk/%E3%80%90%E9%99%90%E6%99%82%E9%99%90%E9%87%8F%EF%BC%8C%E6%9C%80%E9%AB%98%E7%8F%BE%E6%8A%98TWD50%E3%80%91%E5%B0%8F%E7%90%89%E7%90%83%E5%BE%80%E8%BF%94%E8%88%B9%E7%A5%A8%E9%9B%BB%E5%8B%95%E6%A9%9F%E8%BB%8A%EF%BC%8F%E8%87%AA%E8%A1%8C%E8%BB%8A%E5%87%BA%E7%A7%9F.webp" />
            <figcaption>
              <div className="triangle"></div>
              和影壇永遠的女神－奧黛麗赫本並肩而坐，共享第凡內早餐
            </figcaption>
          </figure>
          <figure className="product-images">
            <img src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/blztfb2nbrjo7sslcwvk/%E3%80%90%E9%99%90%E6%99%82%E9%99%90%E9%87%8F%EF%BC%8C%E6%9C%80%E9%AB%98%E7%8F%BE%E6%8A%98TWD50%E3%80%91%E5%B0%8F%E7%90%89%E7%90%83%E5%BE%80%E8%BF%94%E8%88%B9%E7%A5%A8%E9%9B%BB%E5%8B%95%E6%A9%9F%E8%BB%8A%EF%BC%8F%E8%87%AA%E8%A1%8C%E8%BB%8A%E5%87%BA%E7%A7%9F.webp" />
            <figcaption>
              <div className="triangle"></div>
              和影壇永遠的女神－奧黛麗赫本並肩而坐，共享第凡內早餐
            </figcaption>
          </figure>
        </div>
      </div>
    </>
  )
}

export default ProductDescription
