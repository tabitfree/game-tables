/**
 * TODO create game type in schema.prisma and pass it when creating new database record
 *
 * @param {} param0
 * @returns
 */
export default function GameType({
  name,
  imageUri,
  typeOfGame,
  id,
  selectedGameId,
  handleSelect,
}) {
  return (
    <div className='game-type'>
      <input
        type='radio'
        name='selected_game'
        value={typeOfGame}
        id={`game-${id}`}
        checked={id === selectedGameId}
        onChange={() => handleSelect(id)}
      />
      <label htmlFor={`game-${id}`}>
        <h1>{name}</h1>
        <img src={imageUri} alt='' />
      </label>
    </div>
  );
}
