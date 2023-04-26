import React from 'react';
import CarLogo from './SVG/Car.svg';

export default function CarIcon(tempProps?: {color?: string, style?:{height?: string}}) {
    const props = {
        color: "black",
        ...tempProps
    };

    return (
        <img src={CarLogo} style={{width:"100%"}}/>
    )
}