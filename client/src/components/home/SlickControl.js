import React, { useState, useEffect } from 'react'

//輪播-精選
var activitys = {
  arrows: false,
  dots: false,
  infinite: false,
  autoplay: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 599,
      settings: {
        arrows: false,
        dots: true,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

//輪播-大banner
var banner = {
  arrows: false,
  dots: false,
  infinite: true,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 2000,
  fade: true,
  cssEase: 'linear',
  autoplaySpeed: 5000,
  responsive: [
    {
      breakpoint: 599,
      settings: {
        arrows: false,
        dots: false,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 2000,
        fade: true,
        cssEase: 'linear',
        autoplaySpeed: 5000,
      },
    },
  ],
}

//輪播-時限
var countdowns = {
  arrows: true,
  dots: false,
  infinite: true,
  autoplay: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplaySpeed: 5000,
  responsive: [
    {
      breakpoint: 599,
      settings: {
        arrows: false,
        dots: true,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 5000,
      },
    },
  ],
}

export { activitys, banner, countdowns }
