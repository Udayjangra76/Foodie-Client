import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { BASE_URL } from '../helper.js';

export default function MyOrder() {

    const [orderData, setOrderData] = useState({})

    const fetchMyOrder = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/myOrderData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            const data = await response.json();
            setOrderData(data);
            // console.log(orderData); // Updated value of orderData
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchMyOrder();
    }, [])



    return (
        <div style={{ position: 'relative' }}>
            <div>
                <Navbar />
            </div>
            <div className='container'>
                <div className='row'>
                    {
                        orderData !== {} ? Array(orderData).map((data) => {
                            return (
                                data.orderData ?
                                    data.orderData.order_data.slice(0).reverse().map((item) => {
                                        return (

                                            item.map((arrayData) => {

                                                return (
                                                    <div key={arrayData._id} >
                                                        {arrayData.Order_data ?
                                                            <div className='m-auto mt-5'>
                                                                {data = arrayData.Order_data}
                                                                <hr />
                                                            </div> :
                                                            <div className='col-12 col-md-6 col-lg-3' >
                                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                    <img src={arrayData.img} className="c " alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                            <span className='m-1'>{arrayData.qty}</span>
                                                                            <span className='m-1'>{arrayData.size}</span>
                                                                            <span className='m-1'>{data}</span>
                                                                            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                                ₹{arrayData.price}/-
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })
                                        )
                                    }) : "cannot have data"
                            )
                        }) : "cannot have data"}
                </div>
            </div>
            <div style={{ backgroundColor: "#FFA500", postion: "absolute", bottom: "0" }}><Footer /></div>
        </div>
    )
}