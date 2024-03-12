import { useEffect, useState } from 'react';
import '../css/ImageSlider.css';
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs';

function ImageSlider({dataURL, limit=10, page=1}){
    const [data, setData] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchImages(dataUrl) {
        try {
            setLoading(true);
            const response = await fetch(`${dataUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();

            if (data) {
                setData(data)
            setLoading(false);
            }
        } catch(error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    }

    useEffect(()=>{
        if (dataURL !== null || dataURL !== '') {
            fetchImages(dataURL);
        }
    }, [dataURL]);

    if (loading) {
        return <>
                Loading...
            </>
    }
    if (errorMessage !== null) {
        return <>
            Error !!! {errorMessage}
            </>
    }


    function handlePrevious() {

        setCurrentSlide(currentSlide === 0 ? data.length - 1 : currentSlide - 1);

    }
    function handleNext() {

        setCurrentSlide(currentSlide === data.length-1 ? 0 : currentSlide + 1);
    }

    return (
        <>
            <div className="container">
        <BsArrowLeftCircleFill onClick={handlePrevious} className='arrow arrow-left'/>
        {
            data && data.length ? 

            data.map((dataItem, index)=>{
                return <img src={dataItem.download_url} alt={data.author} key={data.id} className={currentSlide === index ? 'current-image' : 'current-image hide-current-image'}/>
            })
            : null
        }
        <BsArrowRightCircleFill onClick={handleNext} className='arrow arrow-right'/>
        <span className="circle-indicators">
        {
            data && data.length ?
            data.map((_, index)=>{
                return <button key={index} className={
                    currentSlide === index ? "current-indicator" : "current-indicator inactive-indicator"
                }
            onClick={()=> setCurrentSlide(index)}
                    ></button>
            })
            :null
        }
        </span>
        </div>
        </>
    );
}

export default ImageSlider;
