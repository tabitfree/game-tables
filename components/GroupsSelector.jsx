import { useEffect } from 'react'

export default function GroupsSelector({
  userGroups,
  selectedGroup,
  handleSelect,
}) {
  useEffect(() => {
    console.log({ userGroups, selectedGroup })
  }, [])

  return (
    <div className='groups-selector flex'>
      {userGroups.map((group, key) => {
        return (
          <div className='group' key={key}>
            <input
              type='radio'
              value={key}
              id={`radio-${key}`}
              name='selected_group'
              checked={group.id === selectedGroup}
              onChange={() => handleSelect(group.id)}
            />
            <label htmlFor={`radio-${key}`}>
              <div>Name: {group.name}</div>
              <div>Players:</div>
              {group.players != null
                ? group.players.map((player, key) => {
                    return <div key={key}>{player.name}</div>
                  })
                : ''}
            </label>
          </div>
        )
      })}
    </div>
  )
}
