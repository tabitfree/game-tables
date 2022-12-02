import axios from 'axios'

/**
 *
 * @param {number} playerId id of player
 * @param {number} points current points of the player
 * @returns true if updated false if error
 * @see /api/player/updatePlayerPoints.js
 */
export const updatePlayerPoints = async (playerId, points) => {
  try {
    const response = await axios.post('/api/player/updatePlayerPoints', {
      data: {
        playerId,
        points,
      },
    })

    if (response.data.message === 'updated') {
      console.log('player updated')
      return true
    }
  } catch (err) {
    console.log(err)
    return false
  }

  return false
}
