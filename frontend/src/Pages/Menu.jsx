import React from 'react'
import axios from 'axios'

const Menu = () => {

  axios.get('http://localhost:3300/api/v1/items/Kheer').then((obj)=>{
    console.log(obj.data)
  }).catch((err)=>{
    console.log(err)
  })
  return (
    <div>

    </div>
  )
}

export default Menu
