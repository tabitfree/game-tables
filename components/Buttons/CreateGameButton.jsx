import axios from 'axios'
import { useRouter } from 'next/router'

export default function CreateGameButton({ gameAuthorId, gameType, groupId }) {
  const router = useRouter()

  const requestCreateGame = async () => {
    console.log('clicked')
    const response = await axios.post('/api/create-game', {
      authorId: gameAuthorId,
      groupId,
      gameType,
    })

    if (response.data.message !== 'added') {
      console.log('response', response)
      return false
    }

    return true
  }

  const handleClick = async () => {
    const gameCreated = await requestCreateGame()

    if (gameCreated) {
      router.push('/')
    }
  }

  return (
    <div className='btn-wrap' onClick={handleClick}>
      <div className='btn'>Create The Game</div>
    </div>
  )
}
