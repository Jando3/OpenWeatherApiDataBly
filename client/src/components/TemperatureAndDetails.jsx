import React from 'react'
import { BiUpArrow, BiDownArrow } from 'react-icons/bi'
import { WiRain, WiSunset, WiSunrise, WiWindy, WiThermometer } from 'react-icons/wi'



const TemperatureAndDetails = () => {
    return (
        <div>
            <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
                <p>Detail</p>
            </div>
            <div className='flex flex-row items-center justify-between text-white py-3'>
                <p>image goes here</p>
                <p className='text-5xl'>34°</p>
                <div className='flex flex-col space-y-2 items-center justify-center'>
                    <div className='flex font-light text-sm items-center justify-center'>
                        <WiThermometer size={18} className='mr-1 ' />
                        Real feel:
                        <span className='font-medium ml-1'>34°</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TemperatureAndDetails