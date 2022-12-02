import * as gameApi from '../../utils/apiQueries/gameApi'
import { useState, useEffect } from 'react'
import Rules from '../Rules/Rules'

const GameWrapper = ({ gameData, children }) => {
  const [started, setStarted] = useState(gameData.started)
  const [curRules, setCurRules] = useState(gameData.gameInfo)

  /**
   * When the game has not started yet, this will ensure the game is marked as active in the database.
   */
  const handleStartButtonClick = async () => {
    const startUpdated = await gameApi.updateStart(gameData.id)

    if (!startUpdated) {
      console.log(
        'something bad happened while creating the game',
        startUpdated
      )
      return
    } else {
      setStarted(true)
      setCurRules(gameData.gameInfo)
    }
  }

  if (!started) {
    return (
      <div>
        <h2>This game did not start yet.</h2>
        <button onClick={handleStartButtonClick}>Start the game!</button>
      </div>
    )
  }

  if (started && !curRules) {
    return (
      <div>
        <h2>Rules not set</h2>
        <Rules gameData={gameData} />
      </div>
    )
  }

  return children

  //   return !started ? (
  //     <div>
  //       <h2>This game did not start yet.</h2>
  //       <button onClick={handleStartButtonClick}>Start the game!</button>
  //     </div>
  //   ) : started && !curRules ? (
  //     <div>
  //       <h2>Rules not set</h2>
  //       <Rules gameData={gameData} stateRules={{ curRules, setCurRules }} />
  //     </div>
  //   ) : (
  //     children
  //   )
  // }
}

export default GameWrapper
