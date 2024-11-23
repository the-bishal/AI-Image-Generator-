import React, { useEffect, useRef, useState } from 'react'
import defaultImg from '../assets/defaultImage.jpeg'
import background from '../assets/background.jpg'
import { usePollinationsImage } from "@pollinations/react"
import "./ImageGenerator.css"

const ImageGenerator = () => {

    let inputRef = useRef(null);
    const [prompt,setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    
    const imgUrl = usePollinationsImage(prompt,{
        width: 768,
        height: 480,
        seed: 42,
        model: 'flux',
        nologo: true,
        enhance: true
    })

    useEffect(()=>{
        if(imgUrl){
            setLoading(false);
        }
    },[imgUrl]);

    const handleClick = async () => {
        const UserInput = inputRef.current?.value;
        if(UserInput.trim()==='') return 0;
        setPrompt(UserInput);
        setLoading(true);
    }

  return (
    <section className='w-full h-screen overflow-hidden bg-no-repeat bg-center bg-cover]'
    style={{backgroundImage: `url(${background})`}}
    >
        <div className='flex flex-col m-auto items-center mt-[2.5rem] gap-8'>
        <h2 className='text-7xl font-semibold pb-8'>
            AI Image <span className='text-pink-700 font-bold'>Generator</span>
        </h2>

        <div className='Card'>

            <div className='ImageDiv flex flex-col justify-center items-center w-[60rem]'>
                <img 
                    src={inputRef.current ? imgUrl : defaultImg} 
                    className='w-[48rem] h-[30rem]'
                />
            </div>
            <div className="loading">
                <div 
                    className="loadingBar my-[0.2rem] mx-auto rounded-lg w-[48rem] h-[0.5rem] bg-pink-700 relative -left-5 duration-[15s]"
                    style={loading ? { width: "48rem"}:{width:"0"}}
                >
                </div>
                {loading && (<div 
                    className="text-xl relative left-24 font-bold "
                >Loading....</div>)}
            </div>

            <div className='flex w-[62.5rem] h-24 justify-around items-center rounded-full bg-white mt-8'>
                <input 
                    type="text" 
                    ref={inputRef} 
                    placeholder="Describe Your Image"
                    className='w-[37.5rem] h-12 bg-transparent border-none outline-none text-xl font-bold text-pink-900 pl-8 mr-8 placeholder:text-[#999] placeholder:font-normal'
                     />
                <button
                    onClick={handleClick}
                    className='genBtn flex items-center justify-center -mr-4 w-[18.75rem] h-[5.5rem] text-white text-3xl rounded-full bg-pink-600 cursor-pointer'
                > Generate </button>
            </div>

        </div>
        </div>
    </section>
  )
}

export default ImageGenerator
