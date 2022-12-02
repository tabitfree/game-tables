import { useEffect } from 'react'
import DartRules from './DartRules'

const Rules = ({ gameData, stateRules }) => {
  const type = gameData.type

  useEffect(() => {}, [gameData])

  if (type.toLowerCase() == 'darts') {
    return <DartRules stateRules={stateRules} gameData={gameData} />
  }
}

export default Rules
