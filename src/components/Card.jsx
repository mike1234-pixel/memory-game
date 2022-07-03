import { connect } from "react-redux"
import "./Card.scss"

const Card = (props) => {
    const { backgroundImage, id, matched, handleChoice, handleUnique, flipped, unique } = props

    const handleClick = (e) => {

        handleChoice(e.target.id)
        handleUnique(e.target.getAttribute('unique'))

    }

    return (
        <button
            className={`card ${flipped && 'matched'}`}
            id={id} // used for matching, 2 els will have this
            style={flipped ? { backgroundImage: "url(" + backgroundImage + ")" } : { background: 'blue' }}
            onClick={(e) => handleClick(e)}
            matched={String(matched)}
            unique={unique} // used to identify the specific card
        >

        </button>
    )

}

const mapStateToProps = (state) => ({
    choiceOne: state.turnsState.choiceOne
});


export default connect(mapStateToProps, null)(Card);














// const Card = ({ backgroundImage, id, handleChoice, flipped, turns }) => {

//     const [reveal, setReveal] = useState(false)

//     function handleClick(e) {
//         handleChoice(e.target.id)



//         console.log(reveal)
//     }

//     return (
//         <button
//             className={`card`}
//             id={id}
//             style={flipped || reveal ? { backgroundImage: "url(" + backgroundImage + ")" } : { backgroundImage: 'linear-gradient(90deg, rgba(46,255,251,1) 0%, rgba(37,62,255,1) 70%, rgba(120,0,236,1) 100%)' }}
//             onClick={handleClick}

//         >
//             card
//         </button>

//     )
// }

// const mapStateToProps = (state) => ({
//     turns: state.turnsState.turns,
// });

// export default connect(mapStateToProps, null)(Card);

// if turn is an odd number, set reveal to true