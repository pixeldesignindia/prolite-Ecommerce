import notFound from '/images/404.png'
import { useNavigate } from 'react-router-dom'
import './not.css'
const NotFound = () => {
  const navigate= useNavigate()
  return (
    <div className='col-center'>
      <img src={notFound} alt="" className='mt-5 notImg' />
      <button onClick={()=>{navigate("/")}} className='mt-5 gotohome'>Go to Home</button>
    </div>
  )
}

export default NotFound
