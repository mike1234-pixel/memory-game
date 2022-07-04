import "./Card.scss"

const Card = (props) => {
    const { backgroundImage, matchedIdentifier, matched, handleChoice, setCurrent, flipped, uniqueIdentifer, disabled } = props

    const handleClick = (e) => {
        handleChoice(e.target.getAttribute('matched-identifier'))
        setCurrent(e.target.getAttribute('unique-identifer'))
    }

    return (
        <div>
            <div className="bg-image-preload" style={{ backgroundImage: "url(" + backgroundImage + ")" }}></div>
            <button
                className={`card ${flipped && 'matched'}`}
                matched-identifier={matchedIdentifier} // used for matching, 2 els will have this
                unique-identifer={uniqueIdentifer} // used to identify the specific card
                style={flipped ? { backgroundImage: "url(" + backgroundImage + ")" } : { background: 'blue' }}
                onClick={(e) => handleClick(e)}
                matched={String(matched)}
                disabled={disabled}
            ></button>
        </div>
    )

}

export default Card