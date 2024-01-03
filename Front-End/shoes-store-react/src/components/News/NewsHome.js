import React from 'react';

function NewsHome(props) {
    return (
        <>
            <section id="news-home">
                <div className="container my-5">
                    <div className="row">
                        <div className="head d-flex justify-content-between">
                            <div className="title">
                                <h3>Tin tức</h3>
                                <p>Tin tức mới nhất từ Duvis</p>
                            </div>
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        <div className="col">
                            <div className="card h-100">
                                <img src="https://duvis.vn/wp-content/uploads/ao-hoodie-oversized-.jpg" className="card-img-top" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-body-secondary">Last updated 3 mins ago</small>
                                    </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100">
                                <img src="https://duvis.vn/wp-content/uploads/ao-hoodie-oversized-.jpg" className="card-img-top" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-body-secondary">Last updated 3 mins ago</small>
                                    </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100">
                                <img src="https://duvis.vn/wp-content/uploads/ao-hoodie-oversized-.jpg" className="card-img-top" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-body-secondary">Last updated 3 mins ago</small>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default NewsHome;
