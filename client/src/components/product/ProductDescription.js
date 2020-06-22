import React from 'react'
import '../../styles/product/ProductDescription.scss'

function ProductDescription(props) {
  return (
    <>
      <div className="product-description">
        <h2 className="product-description-title">行程介紹</h2>
        <p className="product-content">
          享兌票免排隊通道，KLOOK帶你搶先進入杜莎夫人蠟像館！想參觀世上最有看頭的杜莎夫人蠟像館，那就絕不能錯過日本東京分館，這裡的明星蠟像除了讓你近距離接觸各國的超紅大明星，還有許多東京限定的日本知名人士蠟像。全民夢中情人奧黛麗赫本、美國知名歌手貓王、好萊塢大帥哥布萊德彼特，都將在此一比一完整呈現，讓你盡情與之自拍合照。此外，還有日本各領域的大明星，如花式滑冰選手淺田真央、職業足球員三浦知良、知名小提琴大師葉加瀨太郎和演出半澤直樹的當紅偶像壇蜜，小粉絲們，這可是難得能一親偶像芳澤的好機會！博物館內除了可親身面見這些平日難得一見的大明星外，你也將認識館內蠟像的精彩製作過程，相信來到東京杜莎夫人蠟像館，保證不會令你失望。
        </p>
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
