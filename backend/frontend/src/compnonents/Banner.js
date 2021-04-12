import React, { useState , useEffect} from 'react'
import './Banner.css';
import TypeWriter from 'react-typewriter'
// import Header from './Header'
const Images=[
    'https://cdn.dribbble.com/users/844597/screenshots/5570533/walnut_texture_4x.png?compress=1&resize=800x600',
    'https://cdn.dribbble.com/users/541924/screenshots/6142462/plastic-pouch-mock-up.jpg?compress=1&resize=800x600',
    'https://cdn.dribbble.com/users/1784320/screenshots/13641139/media/5e2288f9b0d5c10c859b47027e379c5f.png?compress=1&resize=800x600',
    'https://cdn.dribbble.com/users/1978733/screenshots/5448829/cashew-plant_4x.jpg?compress=1&resize=800x600',
    'https://cdn.dribbble.com/users/38195/screenshots/14163131/media/64c1e52709bab83c6e4f66d2c057bd6d.png?compress=1&resize=1000x750'
]

function Banner() {
    const [bannerImage, setBannerImage] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const request = Images.map((image)=>image);
        setBannerImage(
            request[
            Math.floor(Math.random() *5)
            ]
        );
        return request;
        }

        fetchData();
    }, []);    
    return (
        
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("${bannerImage}")`,
                backgroundPosition: "top center",
            }}
        >
            
            <div className="banner__content">
                <h1><TypeWriter typing={0.8}>One of the best Tea Powder and Dry Fruits are available here</TypeWriter></h1>
            </div>
            
        </header>
    )
}

export default Banner