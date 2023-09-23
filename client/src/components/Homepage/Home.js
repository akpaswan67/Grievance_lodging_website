import React, { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import img1 from './images/img1.jpg'
import img2 from './images/img2.jpg'
import img3 from './images/img3.jpg'
import img4 from './images/img4.jpg'
import img5 from './images/img5.jpg'

function Slider() {
    const sliderImages = [
        {
            url: `${img1}`,
        },
        {
            url: `${img2}`,
        },
        {
            url: `${img3}`,
        },
        {
            url: `${img4}`,
        },
        {
            url: `${img5}`,
        }
    ];
    return (
      <>
        <div>
            <SimpleImageSlider
                width={"100%"}
                height={"70%"}
                images={sliderImages}
                showBullets={true}
                showNavs={true}
                autoPlay={true}
                autoPlayDelay={3}
            />
        </div>
        </>
    );
}

export default Slider;