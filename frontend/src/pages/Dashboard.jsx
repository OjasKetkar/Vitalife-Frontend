import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import Catalogue from './Catalogue.js'
import Sell from './Sell.js'
import Forums from './Forums'

function Dashboard({type}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    
      {/* <section className='heading'>
      </section> */}

        {/* <h1>Welcome {user && user.name}</h1> */}


        {type === "catalogue" ? <Catalogue Username={user ? user.name : null} /> : null}
        {type === "sell" ? <Sell Username={user ? user.name : null} /> : null}
        {type === "forums" ? <Forums LoggedIn={!!user} /> : null}




    </>
  )
}

export default Dashboard
