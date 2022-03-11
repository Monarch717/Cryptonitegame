import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import classes from "./Whitepaper.module.css";
function Whitepaper() {
  const showPreloader = () => {
    let preLoader = document.querySelector("main")
        preLoader.style.display = 'flex'
    let flag = document.querySelector("#multi-lenguage-whitepaper")
        flag.style.pointerEvents = 'none'
        preLoader.classList.add("fade-in-fwd")
    
    setTimeout(() => {
        preLoader.classList.remove("fade-in-fwd")
        preLoader.classList.add("slide-out-bck-center")
        flag.style.pointerEvents = 'all'
        setTimeout(() => {
            preLoader.style.display = 'none'
        },600)
        
    }, 1000)
}



const size = useWindowSize();

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    });
    useEffect(() => {

    function handleResize() {
        const topNav = document.querySelector('#nav')
        var iframe = document.querySelector('iframe')

        setWindowSize({
        width: topNav.offsetWidth,
        height: topNav.height,
        });
        
        iframe.style.height = `calc(100vh - ${topNav.offsetHeight + 100}px)`
        iframe.style.marginTop = `${topNav.offsetHeight - 40}px`
        
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
    }, []); 
    return windowSize;
}

/* function handleMultilingualWhitepaper() {
    let element = document.querySelector("#multi-lenguage-whitepaper")
    if (element.querySelector("a").href === 'https://cryptonite-game.gitbook.io/cryptonite-es/') {
        element.innerHTML = `<a href="https://cryptonite-game.gitbook.io/cryptonite/" target="iframe_a"><img class="leng-flag" src="${esFlag}"/></a>`
    } else {
        element.innerHTML = `<a href="https://cryptonite-game.gitbook.io/cryptonite-es/" target="iframe_a"><img class="leng-flag" src="${enFlag}"/></a>`
    }
    showPreloader()
} */


useEffect(() => {
        /* var nav = document.querySelector("nav")
        var multiLenguageWhitepaperLink = document.createElement("span")
            multiLenguageWhitepaperLink.classList.add("align-self-center")
            multiLenguageWhitepaperLink.classList.add("ml-5")
            multiLenguageWhitepaperLink.classList.add("nav-left-to-right")
            multiLenguageWhitepaperLink.classList.add("mr-auto")
            multiLenguageWhitepaperLink.classList.add("p-2")
            multiLenguageWhitepaperLink.id = "multi-lenguage-whitepaper"
        
            if (!document.querySelector("#multi-lenguage-whitepaper")){
                multiLenguageWhitepaperLink.innerHTML = `<a href="https://cryptonite-game.gitbook.io/cryptonite-es/" target="iframe_a"><img class="leng-flag" src="${enFlag}"/></a>`
            } else {
                multiLenguageWhitepaperLink.innerHTML = `<a href="https://cryptonite-game.gitbook.io/cryptonite/" target="iframe_a"><img class="leng-flag" src="${esFlag}"/></a>`
            }
            
        nav.insertBefore(multiLenguageWhitepaperLink, nav.children[3])

        var flag = document.querySelector("#multi-lenguage-whitepaper")
        flag.style.pointerEvents = 'none'
        flag.addEventListener("click", () => handleMultilingualWhitepaper()) */

        let preLoader = document.querySelector("main")
        setTimeout(() => {
            preLoader.classList.add("slide-out-bck-center")
            setTimeout(() => {
                preLoader.style.display = 'none'
            },600)
        }, 1000)
}, []);
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Header />
        
      </div>
        <iframe src="https://cryptonite-game.gitbook.io/cryptonite/" name="iframe_a" width="100%" title="Iframe Example"></iframe>
            <main>
                <div className="dank-ass-loader">
                    <div className="loaderRow">
                        <div className="arrow up outer outer-18"></div>
                        <div className="arrow down outer outer-17"></div>
                        <div className="arrow up outer outer-16"></div>
                        <div className="arrow down outer outer-15"></div>
                        <div className="arrow up outer outer-14"></div>
                    </div>
                    <div className="loaderRow">
                        <div className="arrow up outer outer-1"></div>
                        <div className="arrow down outer outer-2"></div>
                        <div className="arrow up inner inner-6"></div>
                        <div className="arrow down inner inner-5"></div>
                        <div className="arrow up inner inner-4"></div>
                        <div className="arrow down outer outer-13"></div>
                        <div className="arrow up outer outer-12"></div>
                    </div>
                    <div className="loaderRow">
                        <div className="arrow down outer outer-3"></div>
                        <div className="arrow up outer outer-4"></div>
                        <div className="arrow down inner inner-1"></div>
                        <div className="arrow up inner inner-2"></div>
                        <div className="arrow down inner inner-3"></div>
                        <div className="arrow up outer outer-11"></div>
                        <div className="arrow down outer outer-10"></div>
                    </div>
                    <div className="loaderRow">
                        <div className="arrow down outer outer-5"></div>
                        <div className="arrow up outer outer-6"></div>
                        <div className="arrow down outer outer-7"></div>
                        <div className="arrow up outer outer-8"></div>
                        <div className="arrow down outer outer-9"></div>
                    </div>
                </div>
            </main>
        <Footer/>
    </div>
  );
}

export default Whitepaper;
