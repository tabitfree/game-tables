import { useState } from 'react'
import { initializeGameData } from '../../utils/apiQueries/gameApi'
import { useRouter } from 'next/router'

const DartRules = ({ gameData }) => {
  const [points, setPoints] = useState('301')
  const [ending, setEnding] = useState('single')
  const router = useRouter()

  const handleClick = async () => {
    let isGameInitilized = await initializeGameData(
      gameData.id,
      { points: Number(points), ending },
      gameData.activeGroup.players
    )
    if (isGameInitilized) {
      router.reload()
    }
  }

  const handlePointsChange = (e) => {
    setPoints(e.target.value)
  }

  const handleEndingChange = (e) => {
    setEnding(e.target.value)
  }

  return (
    <div>
      <div>
        <h2>Points</h2>
        <input
          type='radio'
          value='301'
          name='points'
          onChange={handlePointsChange}
          checked={points === '301'}
        />
        <input
          type='radio'
          value='501'
          name='points'
          onChange={handlePointsChange}
          checked={points === '501'}
        />
        <input
          type='radio'
          value='701'
          name='points'
          onChange={handlePointsChange}
          checked={points === '701'}
        />
      </div>
      <div>
        <h2>Ending</h2>
        <input
          type='radio'
          value='single'
          name='ending'
          onChange={handleEndingChange}
          checked={ending === 'single'}
        />
        <input
          type='radio'
          value='double'
          name='ending'
          onChange={handleEndingChange}
          checked={ending === 'double'}
        />
        <input
          type='radio'
          value='triple'
          name='ending'
          onChange={handleEndingChange}
          checked={ending === 'triple'}
        />
      </div>
      <button onClick={handleClick}>Set rules and go!</button>
    </div>
  )
}

export default DartRules
