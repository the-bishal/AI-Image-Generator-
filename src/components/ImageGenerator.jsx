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

            setTimeout(()=>{
                setLoading(false);
            },15000)

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
            <h2 className='text-[10vw] font-semibold pb-8 md:text-7xl '>
                AI Image <span className='text-pink-700 font-bold'>Generator</span>
            </h2>

            <div className='Card w-4/5 flex flex-col items-center justify-center'>

                <div className='ImageDiv flex flex-col justify-center items-center w-full md:w-4/5 lg:w-3/4 max-w-[720px] overflow-auto'>
                    <img 
                        src={inputRef.current ? imgUrl : defaultImg} 
                        className='w-full'
                    />
                </div>
                <div className="loading w-full">
                    <div 
                        className="loadingBar text-left my-[0.2rem] mx-auto rounded-lg w-full md:w-4/5 lg:w-3/4 max-w-[720px] h-[0.5rem] bg-pink-700"
                        style={loading ? {transitionDuration:"15s", width: "48rem"}:{transitionDuration:"0s",width:"0"}}
                    >
                    </div>
                    {loading && (<div 
                        className="text-xl text-pink-700 relative left-24 font-bold lg:ml-24"
                    >Loading....</div>)}
                </div>

                <div className='flex w-full h-12 md:h-16 px-2 lg:h-24 justify-around items-center rounded-full bg-white mt-8'>
                    <input 
                        type="text" 
                        ref={inputRef} 
                        placeholder="Describe Your Image"
                        className='w-4/5 h-8 bg-transparent border-none outline-none text-xl font-bold text-pink-900 pl-8 mr-8 placeholder:text-[#999] placeholder:font-normal'
                        />
                    <button
                        onClick={handleClick}
                        className='genBtn items-center justify-center px-8 py-6 text-white text-3xl rounded-full bg-pink-600 cursor-pointer hidden lg:flex'
                        > Generate 
                    </button>
                </div>

                <button
                        onClick={handleClick}
                        className='genBtn mt-8 md:mt-4 items-center justify-center px-8 py-2 md:py-4 text-white text-3xl rounded-full bg-pink-600 cursor-pointer flex lg:hidden'
                        > Generate 
                </button>

            </div>
        </div>
    </section>
  )
}

export default ImageGenerator
