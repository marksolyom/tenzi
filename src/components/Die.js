export default function Die(props) {
    return (
        <div className="die" style={{backgroundColor: props.isHeld ? '#59E391' : 'white'}}>
            {props.value}
        </div>
    )
}