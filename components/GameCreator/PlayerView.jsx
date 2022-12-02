export default function PlayerView({ name, id, remove }) {
  return (
    <div className='pv-wrap'>
      <span>{name}</span>
      <span onClick={() => remove(name, id)}>delete</span>
    </div>
  );
}
