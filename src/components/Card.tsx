import React from "react"
import cardBackground from "../assets/cardbg.jpeg"
import { CardProps } from "../types/props/CardProps"
import "./Card.scss"

const Card: React.FC<CardProps> = (props: CardProps) => {
    const { backgroundImage, matchedIdentifier, matched, handleChoice, setCurrent, flipped, uniqueIdentifer, disabled } = props

    const handleClick: (e: React.MouseEvent) => void = (e) => {
        const button = e.target as HTMLButtonElement
        handleChoice(button.getAttribute('matched-identifier'))
        setCurrent(button.getAttribute('unique-identifer'))
    }

    return (
        <div>
            <div className="bg-image-preload" style={{ backgroundImage: "url(" + backgroundImage + ")" }}></div>
            <button
                className={`card ${flipped && 'matched'}`}
                matched-identifier={matchedIdentifier} // used to match, applied to 2 matching cards
                unique-identifer={uniqueIdentifer} // unique 
                style={flipped ? { backgroundImage: "url(" + backgroundImage + ")" } : { backgroundImage: "url(" + cardBackground + ")", backgroundColor: "rgba(255,255,255,0.7)", backgroundBlendMode: "lighten" }}
                onClick={(e) => handleClick(e)}
                disabled={disabled}
            ></button>
        </div>
    )

}

export default Card