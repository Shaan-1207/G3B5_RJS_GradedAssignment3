import { faStar, faStarHalfAlt} from  '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar} from  '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
    rating: number
}

const Rating = ( { rating } : Props ) => {
    const numFullStars = Math.floor( rating ); //3.7 ->3
    const numHalfStars = rating - Math.floor( rating ) >= 0.5 ? 1 : 0; //0.7 >= 0.5 -> 1
    const numEmptyStars = 10 - ( numFullStars + numHalfStars ) //5- ( 3 + 1 ) -> 1
    return ( 
        <>
            {
                Array.from( { length: numFullStars } ).map(
                    i => <FontAwesomeIcon icon = {faStar} style={{color: "#D4AF37"}}  />
                )
            }
            {
                numHalfStars ? <FontAwesomeIcon icon={faStarHalfAlt} style={{color: "#D4AF37"}} /> : null
            }
            {
                Array.from( { length: numEmptyStars } ).map(
                i => <FontAwesomeIcon icon = {emptyStar} style={{color: "#D4AF37"}}  />
                )
            }
        </>
     );
}
 
export default Rating;