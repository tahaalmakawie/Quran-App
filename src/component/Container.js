import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
// import QuranAPI from "./QuranAPI";
import {getBooks} from '../store/quranSlice'
import Swal from "sweetalert2";

function Container() {
    const dispatch = useDispatch()
    const {quran,isLoading} = useSelector( (state) => state.qurans )
    const [player,pause] = useState(false)
    // let [AyahIdx,setAyahIdx] = useState(0)
    let [count,setCount] = useState(1)
    useEffect( () => {
        dispatch(getBooks())
      }, [dispatch] )


      




    // const forward = ()=> {
    //   AyahIdx < AyahsAodius.length-1 ?
    //     AyahIdx++:AyahIdx= 0
    //     changeAyah(AyahIdx)
    //   }
      
      
      
      
    
    // const backward = ()=> {
    //   AyahIdx === 0? AyahIdx = AyahsAodius.length - 1 :
    //   AyahIdx--
    
    //   // AyahIdx--
    //   changeAyah(AyahIdx)
    // }



      
      const quranList = 

      // quran.length > 0 ?
  
      quran.map((surah,idx) => (
          <div  className='surah-title' key={idx}>
            <div className='text'>
             <h3 className='title ar'>{surah.asma.ar.long}</h3>
             <p className='title en'>{surah.asma.en.short}</p>
            </div>
  
           <a href={surah.recitation.full} className='daon' download ><i className="fas fa-download"></i></a>
          </div>
      ))
      // :null



      let played = document.querySelector('.play');
      let next = document.querySelector('.next');
      let prev = document.querySelector('.prev');
      let audio = document.querySelector('.audio');
      let ayahat = document.querySelector('.ayahat');
      let allSurahs = document.querySelectorAll('.surah-title');
      let AyahsAodius;
      let AyahsText;
      allSurahs.forEach((surah,idx)=> {
        surah.addEventListener('click', () => {
          fetch(`https://quran-endpoint.vercel.app/quran/${idx + 1}`)
          .then( res => res.json() )
          .then(data => {
            let ayahs = data.data.ayahs;
            AyahsAodius = []
            AyahsText = []
            ayahs.forEach(ayah => {
                AyahsAodius.push(ayah.audio.url)
                AyahsText.push(ayah.text.ar)
            })
            // console.log(suar);
            // console.log(AyahsText)
            // console.log(AyahsAodius)
            let changeAyah = (idx) => {
              audio.src = AyahsAodius[idx]
              // console.log(idx);
              // audio.play()
              ayahat.innerHTML =  AyahsText[idx]
          }
      
            let AyahIdx = 0
            audio.addEventListener('ended', ()=> {
                
                AyahIdx++
                if (AyahIdx < AyahsAodius.length-1 ) {
                    changeAyah(AyahIdx)
                    
                    
                }else{
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Surah has been ended',
                    showConfirmButton: false,
                    timer: 1500
                  })
                    pause(player === true)
                    AyahIdx = 0 
                    changeAyah(AyahIdx)
                    audio.pause()
                    
                }
                
                
            })
            next.addEventListener('click', 
            () => {
              AyahIdx < AyahsAodius.length-1 ?
              AyahIdx++
              :AyahIdx= 0
              changeAyah(AyahIdx)
            })
            prev.addEventListener('click', 
            () => {
              AyahIdx = 0 ? AyahIdx = AyahsAodius.length-1 :
              AyahIdx--
              changeAyah(AyahIdx)
            })
            changeAyah(AyahIdx)
            // let isPlaying = false
            // function togglePlay() {

            // }
            // togglePlay()
            
            // played.addEventListener('click', togglePlay)
        } )



        }) 
        
      })

      
      const play = () => {
        audio.play()
        pause(!player)
      }
      const pauser = () => {
        audio.pause()
        pause(!player)
      }





 


  return (
    <div>
        <div className="container">
            <div className="nvbar">
                <p className="ayahat">اضغط عل السوره لتشغيلها</p>
                <audio src='' controls  className="audio" autoPlay></audio>
                <div className="buttons">
                    <div className="icon next" > <i className="fas fa-forward"></i> </div>
                    {player? 
                    
                    <div className="icon play" onClick={play}> <i  className="fas fa-play"></i> </div>:
                    <div className="icon play" onClick={pauser}> <i  className="fas fa-pause"></i> </div>
                }
                    <div className="icon prev" > <i className="fas fa-backward"></i> </div>
                </div>
            </div>
            {isLoading? <h3 className="loading"> يرجي الانتظار..... </h3>: quranList }
            
        </div>
    </div>
  )
}

export default Container