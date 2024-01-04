import React, { useState } from 'react';
import Lightbox from "react-18-image-lightbox";
import Slider from 'react-slick';
import 'react-18-image-lightbox/style.css'; // Import CSS của Lightbox
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; // Import CSS của Slick

function ProductImageGallery({ images }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const openLightbox = (index) => {
        setCurrentImage(index);
        setIsOpen(true);
    };

    return (
        <div className="product-image-gallery">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} onClick={() => openLightbox(index)}>
                        <img
                            src={image}
                            alt={`Product Image ${index + 1}`}
                        />
                    </div>
                ))}
            </Slider>

            {isOpen && (
                <Lightbox
                    mainSrc={images[currentImage]}
                    nextSrc={images[(currentImage + 1) % images.length]}
                    prevSrc={images[(currentImage + images.length - 1) % images.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setCurrentImage((currentImage + images.length - 1) % images.length)
                    }
                    onMoveNextRequest={() =>
                        setCurrentImage((currentImage + 1) % images.length)
                    }
                />
            )}
        </div>
    );
}

export default ProductImageGallery;
