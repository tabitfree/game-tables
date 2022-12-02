import GameType from './GamesSelector/gameType';

export default function GamesSelector({
  gameTypes,
  handleSelect,
  selectedGameId,
}) {
  return (
    <div className='games-selector flex'>
      {gameTypes.map((gameType) => {
        return (
          <GameType
            name={gameType.name}
            imageUri={gameType.imageUri}
            typeOfGame={gameType.typeOfGame}
            id={gameType.id}
            key={gameType.id}
            selectedGameId={selectedGameId}
            handleSelect={handleSelect}
          />
        );
      })}
    </div>
  );
}
