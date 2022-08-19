export default function Timer(props) {
    return (
        <div className="counter">
            <p>{props.counter}</p>
            <p>Record Win: {props.record} Roll{
            props.record > 1 ? "s" : ""}</p>
        </div>
    )
}