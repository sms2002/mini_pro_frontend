import React from 'react'
import ReactLoading from 'react-loading'
import './Loading.css'
function Loading() {
  return (
    <div className='loadingcontainer'>
       <ReactLoading type="spin" color="blue" height={'5%'} width={'5%'} />
    </div>
  )
}

export default Loading
