import React, {useState, useEffect} from 'react'

const Timer = (props) => {

	const {dateEnd} = props

	const calculateTimeLeft = () => {

		const difference = +Date.parse(dateEnd) - +Date.now();
		let timeLeft = {};

		if (difference > 0) {
    	timeLeft = {
	      minutes: Math.floor((difference / 1000 / 60) % 60),
	      seconds: Math.floor((difference / 1000) % 60)
    	};
  	}
  	return timeLeft
	}

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	

	useEffect(() => {
	  const timer = setTimeout(() => {
	    setTimeLeft(calculateTimeLeft());
	  }, 1000)

	  return () => clearTimeout(timer);
	});

	const timerComponents = [];

	Object.keys(timeLeft).forEach((interval, i) => {
  if (!timeLeft[interval]) {
    return;
  }

  timerComponents.push(
    <span key={i}>
      <b>{timeLeft[interval]}</b> {interval}{" "}
    </span>
  );
});

// useEffect(() => {
// 	if (!timerComponents.length)
// 		setBidFinished(true)
// })

	return (
		<div>
			{timerComponents.length ? timerComponents : 
			<div>
				<span className='success-transfer'>Трансфер завершен!</span> 
			</div>
			}
		</div>
	)
}

export default Timer
