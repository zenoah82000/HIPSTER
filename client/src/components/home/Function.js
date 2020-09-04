import React, { useState, useEffect } from 'react'

//找出精選3筆商品
async function homeProductFeaturedlist(item) {
  // 注意資料格式要設定，伺服器才知道是json格式
  const request = new Request(
    'http://localhost:5000/homeproductfeaturedlist/',
    {
      method: 'POST',
      body: JSON.stringify(),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    }
  )
  const response = await fetch(request)
  const data = await response.json()
  //   console.log('3筆商品', data)
  //   console.log(item)
  return data
  //   setProductFeaturedlist(data)
}

//找出中間banner商品資料
async function homeslickBannerData(item) {
  // 注意資料格式要設定，伺服器才知道是json格式
  const request = new Request('http://localhost:5000/homeslickbannerdata/', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
  const response = await fetch(request)
  const data = await response.json()
  // console.log('1筆商品', data)
  //   setslickBannerData(data)
  return data
}

//找出中間banner商品(多圖)資料
async function homeslickBannerImgData(item) {
  // 注意資料格式要設定，伺服器才知道是json格式
  const request = new Request('http://localhost:5000/homeslickbannerimgdata/', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
  const response = await fetch(request)
  const data = await response.json()
  // console.log('4張圖片', data)
  //   setslickBannerImgData(data)
  return data
}

//找出倒數結束5筆商品
async function homeProductEndlist(item) {
  // 注意資料格式要設定，伺服器才知道是json格式
  const request = new Request('http://localhost:5000/homeproductendlist/', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
  const response = await fetch(request)
  const data = await response.json()
  // console.log('5筆商品', data.length)
  // setProductEndlist(data)
  return data
}

//找出6筆最新文章
async function homeArticleslist(item) {
  // 注意資料格式要設定，伺服器才知道是json格式
  const request = new Request('http://localhost:5000/homearticleslist/', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
  const response = await fetch(request)
  const data = await response.json()
  // console.log('6筆文章', data)
  // setarticleslist(data)
  return data
}

export {
  homeProductFeaturedlist,
  homeslickBannerData,
  homeslickBannerImgData,
  homeProductEndlist,
  homeArticleslist,
}
