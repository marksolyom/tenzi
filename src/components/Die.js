export default function Die(props) {
    return (
        <div
            className={`die face${props.value}`}
            style={{ backgroundColor: props.isHeld ? '#59E391' : 'white' }}
            onClick={props.holdDice}
        >
            {props.value > 0 && <span className="dot" />}
            {props.value > 1 && <span className="dot" />}
            {props.value > 2 && <span className="dot" />}
            {props.value > 3 && <span className="dot" />}
            {props.value > 4 && <span className="dot" />}
            {props.value > 5 && <span className="dot" />}
        </div>
    )
}