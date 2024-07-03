import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import styles from "./Homepage.module.css";
import ScenePC from "./ScenePC";
import SceneMobile from "./SceneMobile";
import { Html, useProgress, Effects } from "@react-three/drei";
import HomeNavigator from "./HomeNavigator";
import { useGLTF } from "@react-three/drei";
import { useSwipeable } from "react-swipeable";
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing'
import { UnrealBloomPass } from 'three-stdlib'
import VR_Button from "./VR_Button";

extend({ UnrealBloomPass })

export default function Homepage() {
  const [navIndex, setNavIndex] = useState(-2);
  const [entered, setEntered] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const [isVR, setIsVR] = useState(false);
  const [isVREnabled, setIsVREnabled] = useState(false);
  
  const [isBloomDisabled, setIsBloomDisabled] = useState(false);
  const enterSFX = new Audio("/sfx/enter.aac")
  const slideSFX = new Audio("/sfx/slide3.aac")
  enterSFX.volume = 0.1
  slideSFX.volume = 0.02
  const keyframes = [
    {
      title: "EVENTS",
      position: [-5, 3, -15],
      rotation: [0, 2.2, 0],
      positionMob: [-2, 0, -12],
      rotationMob: [0, 2.2, 0],
      vrLocation: {
        pos: [-15,1,-3],
        rot: [0,2.2,0]
      },
      linkText: "Open",
      linkRoute: "/events"
    },
    {
      title: "ACTIVITIES",
      position: [-5.5, 3, -21],
      rotation: [0, 1.1, 0],
      positionMob: [-2, 0, -14],
      rotationMob: [0, 1.1, 0],
      vrLocation: {
        pos: [-16,1,-21],
        rot: [0,1.1,0]
      },
      linkText: "Open",
      linkRoute: "/comingsoon"
    },
    {
      title: "THEME",
      position: [0, 3, -23.5],
      rotation: [0, -0.01, 0],
      positionMob: [0, 0, -18],
      rotationMob: [0, 0.03, 0],
      vrLocation: {
        pos: [0,1,-31],
        rot: [0,0,0]
      },
      linkText: "Open",
      linkRoute: "/comingsoon"
    },
    {
      title: "INITIATIVES",
      position: [5.5, 3, -20],
      rotation: [0, -1.1, 0],
      positionMob: [2, 0, -14],
      rotationMob: [0, -1.13, 0],
      vrLocation: {
        pos: [16,1,-21],
        rot: [0,-1.15,0]
      },
      linkText: "Open",
      linkRoute: "/comingsoon"
    },
    {
      title: "SPONSORS",
      position: [5, 3, -14],
      rotation: [0, -2.2, 0],
      positionMob: [2, 0, -12],
      rotationMob: [0, -2.2, 0],
      vrLocation: {
        pos: [15.5,1,-3],
        rot: [0,-2.2,0]
      },
      linkText: "Open",
      linkRoute: "/sponsors"
    },
  ]

  let frames = 0, frameRate=60, prevTime = performance.now();
  // calcfps();

  useEffect (() => {
    calcfps();
  },[])

  function calcfps() {

    requestAnimationFrame( calcfps );
    
    // FPS
    
    frames ++;
    const time = performance.now();
    
    if ( time >= prevTime + 10000 ) {
      frameRate = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
      // console.log(frameRate);
      if (frameRate < 30) {
        setIsBloomDisabled(true);
      }
      // else if (frameRate >=55) {
      //   setIsBloomDisabled(false);
      // }
      frames = 0;
      prevTime = time;
      
    }

  }

  const handleArrowKeys = (e) => {
    if (e.key == "ArrowLeft" || e.key == "ArrowDown") {
      changeSlide(-1);
    }
    if (e.key == "ArrowRight" || e.key == "ArrowUp") {
      changeSlide(1);
    }
    if (e.key == "Escape") {
      // changeSlide(0, true);
      setNavIndex(-1);
      slideSFX.currentTime = 0.2;
      slideSFX.play();
    }
  };
  const handleSwipe = useSwipeable({
    onSwipedLeft: () => {
      changeSlide(1);
    },
    onSwipedUp: () => {
      changeSlide(1);
    },
    onSwipedRight: () => {
      changeSlide(-1);
    },
    onSwipedDown: () => {
      changeSlide(-1);
    },
    delta: {up: 100, down: 100, left: 50, right: 50},
    swipeDuration: 400
  });

  const checkOrientationSupport = (e) => {
    if (e.alpha != null && !isVREnabled && window.innerWidth < 480) {
      setIsVREnabled(true)
    }
  }
  const handleEnterBtn = () => {
    enterSFX.currentTime = 0.3;
    enterSFX.play();
    setNavIndex(-1);
    setTimeout(() => {
      setEntered(true);
      window.addEventListener("keydown", handleArrowKeys);
    }, 500)

    // Handle iOS 13+ devices.
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then((state) => {
          if (state === 'granted' && window.innerWidth < 480) {
            setIsVREnabled(true);
          }
        })
        .catch(console.error);
    }
  };

  const changeSlide = (n, exitSlides = false) => {
    slideSFX.currentTime = 0.2;
    slideSFX.play();
    setNavIndex((oldI) => {
      let newI = oldI + n;
      if (newI >= keyframes.length) {
        newI = -1;
      }
      if (newI < -1) {
        newI = keyframes.length - 1 ;
      }
      return newI
    });
    if (exitSlides) {
      setShowLink(false);
    }
    setShowLink(false);
    setTimeout(() => {
      setShowLink(true);
    }, 2000);
  };
  const handleResize = () => {
    setIsMobile(window.innerWidth < 480);
  }

  // Handle regular non iOS 13+ devices.
  useEffect(() => {
    window.addEventListener("deviceorientation", checkOrientationSupport)
    return () => {
      window.removeEventListener("deviceorientation", checkOrientationSupport)
    }
  }, [])

  useEffect(() => { 
    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("keydown", handleArrowKeys)
      window.removeEventListener("resize", handleResize)
    }
  })

  const LoadScreen = () => {
    const { progress } = useProgress();
    // console.log(progress);
    return (
      <Html center>
        <div className={styles.loader}>{progress.toFixed(0)}% loaded...</div>
      </Html>
    );
  };

  useEffect(() => {
    const modelPath = isMobile ? "/models/spaceship_phone_comp/model.gltf" : "/models/spaceship_pc_comp/model.gltf";
    useGLTF.preload(modelPath);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleArrowKeys);
      window.removeEventListener("resize", handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);
  
  return (
    <div {...handleSwipe}>
      <Canvas id="three-canvas-container" 
        onCreated={({ gl }) => {
        gl.powerPreference = "high-performance";
  }}>
        <Suspense fallback={<LoadScreen />}>
        {!isMobile && <ScenePC navIndex={navIndex} keyframes={keyframes} isVR={isVR}/> }
        {isMobile && <SceneMobile navIndex={navIndex} keyframes={keyframes} isVR={isVR}/> }
        </Suspense>
        {!isBloomDisabled && !isMobile && (<Effects disableGamma>
        <unrealBloomPass threshold={0} strength={0.25} radius={1} />
      </Effects>)}
        {/* {isMobile && (<Effects disableGamma>
        <unrealBloomPass threshold={0} strength={0.4} radius={1.3} />
      </Effects>)} */}
        {/* <EffectComposer>
        <Bloom
          intensity={0.1} // The bloom intensity.
          kernelSize={KernelSize.VERY_LARGE} // blur kernel size
          luminanceThreshold={0.5} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
          // mipmapBlur={true} // Enables or disables mipmap blur.
          resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
          resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
        />
        </EffectComposer> */}
      </Canvas>

      {!entered && (
        <div
          className={
            styles.enterScreen + " " + (navIndex != -2 ? styles.hide : "")
          }
        >
          <input type="button" value="ENTER" onClick={handleEnterBtn} />
        </div>
      )}

      {
        !isVR &&
        <HomeNavigator
          showLink={showLink}
          keyframes={keyframes}
          navIndex={navIndex}
          changeSlide={changeSlide}
          entered={entered}
        />
      }

      {
        entered && isVREnabled && isMobile &&
        <VR_Button
          entered={entered}
          isVR={isVR}
          setIsVR={setIsVR}
          setNavIndex={setNavIndex}
        />
      }

    </div>
  );
}