import axios from 'axios';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import useRouterRefresh from '../../helpers/refreshData';

export default function CreateGroupButton({
  players,
  groupName,
  resetCreatorStates,
}) {
  const { data: session } = useSession();
  const [isDisabled, setDisabled] = useState(false);
  const refreshPage = useRouterRefresh();

  const getNames = () => {
    let names = [];
    for (let i = 0; i < players.length; i++) {
      names.push(players[i].name);
    }
    return names;
  };

  const validateGroupParams = () => {
    if (players.length < 2 && groupName.length === 0) {
      return false;
    }
    return true;
  };

  const createGroup = async () => {
    let names = getNames();
    console.log('names', names);
    let response = await axios.post('/api/add-group', {
      authorId: session.user.id,
      players: names,
      name: groupName,
    });

    if (response.data.message !== 'added') {
      console.log('response', response);
      return false;
    }

    return true;
  };

  const handleClick = () => {
    setDisabled(true);
    let valid = validateGroupParams();
    if (!valid) {
      console.log('not valid');
      setDisabled(false);
      return;
    }

    const groupCreated = createGroup();

    if (!groupCreated) {
      console.log('group did not create');
      return;
    } else {
      refreshPage(); //view the newly created group
      resetCreatorStates();
      setDisabled(false);
    }
  };

  return (
    <div className='btn-wrap'>
      <button disabled={isDisabled} className='btn' onClick={handleClick}>
        Create Group
      </button>
    </div>
  );
}
