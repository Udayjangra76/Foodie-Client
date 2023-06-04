import React, { useEffect, useState } from 'react'
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import Card from './../components/Card';
import { BASE_URL } from '../helper.js';

export default function Home() {

  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    let response = await fetch(`${BASE_URL}/api/foodData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json()
    setFoodItems(response[0])
    setFoodCat(response[1])
  }
  useEffect(() => {
    loadFoodItems()
  }, []);
  return (
    <>
      <div><Navbar /></div>
      <div >
        <div id="carouselExampleIndicators" className="carousel slide" datainterval="5000" datakeyboard="true" >

          <div className="carousel-inner">
            <div className=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active">
              <img className="d-block w-100 " src="https://images.unsplash.com/photo-1604382353954-7d61d1db1f9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60" alt="First slide" style={{ maxHeight: "500px", maxWidth: "100%", objectFit: "cover" }} />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="https://images.unsplash.com/photo-1626170809808-4bfd6f3d15e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGJ1cmdlcnxlbnwwfDB8MHx8&auto=format&fit=crop&w=600&q=60" alt="Third slide" style={{ maxHeight: "500px", maxWidth: "100%", objectFit: "cover" }} />
            </div>
            <div className="carousel-item ">
              <img className="d-block w-100" src="https://images.unsplash.com/photo-1559090337-8631216533fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGVyaWVzfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="Second slide" style={{ maxHeight: "500px", maxWidth: "100%", objectFit: "cover" }} />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fGZyaWVzfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="Fourth slide" style={{ maxHeight: "500px", maxWidth: "100%", objectFit: "cover" }} />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="https://images.unsplash.com/photo-1619860860774-1e2e17343432?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2FuZHdpdGNofGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="Fifth slide" style={{ maxHeight: "500px", maxWidth: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                // justify-content-center
                <div className='container ' style={{ margin: "50px" }} >
                  <div key={data._id} style={{
                    fontSize: "20px", margin: "3px", fontWeight: "bold", fontStyle: "revert-layer"
                  }} > {data.CategoryName}</div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />

                  <div className='row' >
                    {foodItems !== [] ? foodItems.filter(
                      (items) => (items.CategoryName === data.CategoryName && items.name.toLowerCase().includes(search.toLocaleLowerCase())))
                      .map(filterItems => {
                        return (
                          <div key={filterItems._id} className='col-lg-3 col-12 col-md-6 ' >
                            {console.log(filterItems.url)}
                            <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>
                          </div>
                        )
                      }) : <div> No Such Data </div>}
                  </div>
                </div>
              )
            })
            : ""}
      </div >
      <div style={{ backgroundColor: "#FFA500" }}><Footer /></div>
    </>
  )
}
