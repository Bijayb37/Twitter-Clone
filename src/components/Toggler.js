import {useState} from 'react'

function Toggler(condition=false) {
	const [boolie, setBoolie] = useState(condition)
	const toggle = () => {
		setBoolie(!boolie)
	}
	return [boolie, toggle]
}

export default Toggler