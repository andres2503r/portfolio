import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import { ILayout } from '@interfaces/shared/components/layout/Layout'

const Layout: React.FC<ILayout> = ({ children }) => {
  const [pointerColor, setPointerColor] = useState('red')

  useEffect(() => {
    const pointer: Element | null = document.querySelector('#pointer')
    const pointerCenter: Element | null = document.querySelector('#pointerCenter')

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.pageX - 37
      const mouseY = e.pageY - 37
      const centerX = e.pageX
      const centerY = e.pageY

      if (pointer) {
        pointer.setAttribute('style', `transform: translate3d(${mouseX}px, ${mouseY}px, 0); transition: transform .05s ease-in-out; border-color: ${pointerColor};`)
      }

      if (pointerCenter) {
        pointerCenter.setAttribute('style', `transform: translate3d(${centerX - 26}px, ${centerY - 26}px, 0); background-color: ${pointerColor}; border-color: ${pointerColor}`)
      }

      const colorR = Math.round((e.pageX / window.innerWidth) * 100 + 100)
      const colorG = Math.round((e.pageY / window.innerHeight) * 100 + 100)
      const colorB = Math.round((colorR + colorG) / 2)
      setPointerColor(`rgb(${colorR}, ${colorG}, ${colorB})`)
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [pointerColor])

  return (
    <div className='flex gap-[21px] p-[25px] h-screen bg-slate-950 m-0'>
      <span id='pointer' className='absolute border-3 divide-solid border-white w-[30px] h-[30px] rounded-[50%] transition-[all .04s ease-in-out]'/>
      <span id='pointerCenter' className='absolute border-2 divide-solid bg-white w-[8px] h-[8px] rounded-[50%] transition-[all .01s ease-in-out]'/>
      <div className='w-full'>
        <Navbar/>
      </div>
      {children}
    </div>
  )
}

export default Layout
