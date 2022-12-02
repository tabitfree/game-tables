import axios from 'axios'

export const updateStart = async (id) => {
  try {
    const response = await axios.post('/api/game/updateStart', {
      data: {
        started: true,
        gameId: id,
      },
    })
    console.log(response)
    if (response.data.message === 'updated') {
      return true
    }
  } catch (err) {
    console.log(err)
    return false
  }

  console.log('something bad happened')
  return false
}

/**
 * Called only if rules of the game are not set yet.
 * Make request to create rules of the game.
 * @see /api/game/initialize.js
 */
export const initializeGameData = async (id, rules, players) => {
  try {
    const response = await axios.post('/api/game/initialize', {
      data: {
        gameId: id,
        gameInfo: rules,
        gameHistory: {
          data: [
            players.reduce((acc, curPlayer) => {
              acc[curPlayer.id] = rules.points
              return acc
            }, {}),
          ],
        },
      },
    })
    console.log(response)

    if (response.data.message === 'rulesset') {
      return true
    }
  } catch (err) {
    console.log(err)
    return false
  }

  return false
}

/**
 * Save the current game state
 * @param {number} id id of the game
 * @param {number[][]} history history of the game
 * @returns true if game saved, false if error occured
 */
export const saveGame = async (id, history) => {
  try {
    const response = await axios.post('/api/game/save', {
      data: {
        gameId: id,
        gameHistory: { data: history },
      },
    })

    if (response.data.message === 'saved') {
      return true
    }
  } catch (err) {
    console.log(err)
    return false
  }
}
