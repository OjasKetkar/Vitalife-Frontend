import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import Catalogue from './Catalogue.js'
import Sell from './Sell.js'

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
        <h1>Welcome {user && user.name}</h1>
      </section> */}

      {type == "catalogue" ? <Catalogue/> : null}
      {type == "sell" ? <Sell/> : null}



    </>
  )
}

export default Dashboard
