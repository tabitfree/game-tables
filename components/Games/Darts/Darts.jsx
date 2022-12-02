import { useState, useEffect } from 'react'
import * as gameApi from '../../../utils/apiQueries/gameApi'
import dartsRules from '../../../utils/gameRules/dartsRules'
import Dartboard from '../../Dartboard/Dartboard'
import DartIcon from './DartIcon'
import styled from 'styled-components'

export default function Darts({ gameData }) {
  const [curPlayers, setCurPlayers] = useState(gameData.activeGroup.players)
  const [playerOnTurnIdx, setPlayerOnTurnIdx] = useState(0)
  const [history, setHistory] = useState([])
  // current throw of current player
  const [curThrow, setCurThrow] = useState(1)
  const [throwOne, setThrowOne] = useState(0)
  const [throwTwo, setThrowTwo] = useState(0)
  const [throwThree, setThrowThree] = useState(0)

  useEffect(() => {
    //detect which player is on turn
    /* TODO */
    if (gameData.playerOnTurnId) {
      let curPlayerIdx = curPlayers.find((player, idx) => {
        player.id == gameData.playerOnTurnId
        return idx
      })
      setPlayerOnTurnIdx(curPlayerIdx)
    }

    if (gameData.gameHistory.onTurn) {
      let curPlayerIdx = curPlayers.filter(
        (player) => player.id === gameData.gameHistory.playerOnTurn
      )[0]
      setPlayerOnTurnIdx(curPlayerIdx)
    }

    //set history of game
    const curHistory = gameData.gameHistory.data
    setHistory(curHistory ? curHistory : [])
  }, [])

  useEffect(() => {}, [gameData])

  /**
   * Choose the rules of darts.
   * All information selected during this procedure will go to gameInfo in database.
   *
   *
   * GameTypes = 701, 501, 301
   * Endings = single, double, triple
   */
  const createPlayers = () => {}

  /**
   *
   * @param {number} playerThrow How many points player threw in his round
   */
  const recordPlayerThrow = (playerThrow) => {
    let newHistory = history
    let curPlayer = curPlayers[playerOnTurnIdx]
    newHistory[newHistory.length - 1][curPlayer.id] -= playerThrow
    setHistory(newHistory)
  }

  const resetStates = () => {
    setThrowOne(0)
    setThrowTwo(0)
    setThrowThree(0)
    setCurThrow(1)
  }

  const nextPlayer = (e) => {
    e.preventDefault()

    let curPlayer = playerOnTurnIdx

    if (throwOne == null || throwTwo == null || throwThree == null) {
      alert('undefined throw! cant continue')
      return
    }

    let throwSum =
      parseInt(throwOne) + parseInt(throwTwo) + parseInt(throwThree)

    recordPlayerThrow(throwSum)

    curPlayer++

    /* end of round */
    if (curPlayer >= curPlayers.length) {
      console.log('new round!!!!')

      let newHistory = [...history]
      /* deep copy last element */
      newHistory.push({ ...newHistory[newHistory.length - 1] })
      setHistory(newHistory)
      /* save the game state to database */

      curPlayer = 0
    }

    resetStates()
    setPlayerOnTurnIdx(curPlayer)
  }

  const saveGame = async () => {
    const isSaved = await gameApi.saveGame(gameData.id, history, playerOnTurnId)

    if (isSaved) console.log('game is saved!')
  }

  /**
   *
   * @param {number} value value that user threw
   */
  const recordDartboardThrow = (value) => {
    switch (curThrow) {
      case 1:
        setThrowOne(value)
        setCurThrow(2)
        break
      case 2:
        setThrowTwo(value)
        setCurThrow(3)
        break
      case 3:
        setThrowThree(value)
        setCurThrow(1)
        break
    }
  }

  return (
    <Container>
      <h1>Darts</h1>
      <h2>Player on turn name: {curPlayers[playerOnTurnIdx].name}</h2>
      <button onClick={nextPlayer}>NEXT PLAYER</button>
      <button onClick={saveGame}>SAVE GAME</button>
      {curPlayers && (
        <table>
          <thead>
            <tr>
              {curPlayers.map((player, key) => {
                let headClass = key === playerOnTurnIdx ? 'highlighted' : ''
                return (
                  <th key={key} className={headClass}>
                    {player.name}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              {curPlayers.map((player, key) => {
                let dataClass = key === playerOnTurnIdx ? 'highlighted' : ''
                return (
                  <td key={key} className={dataClass}>
                    {history[history.length - 1]?.[player.id]}
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      )}
      <div>
        <input
          type='number'
          placeholder='throwone'
          value={throwOne}
          onChange={(e) => {
            setCurThrow(1)
            setThrowOne(e.target.value)
          }}
          min={0}
          max={100}
        />
        <input
          type='number'
          placeholder='throwtwo'
          value={throwTwo}
          onChange={(e) => {
            setCurThrow(2)
            setThrowTwo(e.target.value)
          }}
          min={0}
          max={100}
        />
        <input
          type='number'
          placeholder='throwthree'
          value={throwThree}
          onChange={(e) => {
            setCurThrow(3)
            setThrowThree(e.target.value)
          }}
          min={0}
          max={100}
        />
        <button onClick={resetStates}>RESET STATES</button>
        <div>
          <div>curThrow: {curThrow}</div>
          <span>One: {throwOne}</span>
          <span>Two: {throwTwo}</span>
          <span>Three: {throwThree}</span>
        </div>
      </div>
      <div>
        <DartIcon
          setCurThrow={() => setCurThrow(1)}
          active={
            curThrow == 1 && throwOne
              ? 'active selected'
              : curThrow == 1 || throwOne
              ? 'active'
              : ''
          }
        />
        <DartIcon
          setCurThrow={() => setCurThrow(2)}
          active={
            curThrow == 2 && throwTwo
              ? 'active selected '
              : curThrow == 2 || throwTwo
              ? 'active'
              : ''
          }
        />
        <DartIcon
          setCurThrow={() => setCurThrow(3)}
          active={
            curThrow == 3 && throwThree
              ? 'active selected'
              : curThrow == 3 || throwThree
              ? 'active'
              : ''
          }
        />
      </div>
      <Dartboard recordDartboardThrow={recordDartboardThrow} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`
