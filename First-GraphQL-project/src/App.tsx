import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCharacter, setSelectedCharacter] = useState<SelectedCharacter | null>(null);

  useEffect(() => {
    async function fetchCharacters() {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
      const data = await response.json();
      setCharacters(data.results);
    }
    fetchCharacters();
  }, [currentPage]);

  const handleNextPage = (): void => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleCharacterClick = async (characterId: number): Promise<void> => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
      const data = await response.json();
      setSelectedCharacter(data);
    } catch (error) {
      console.error('Error fetching character details:', error);
    }
  };

  return (
    <div className='list-content'>
      <h1>Rick & Morty Characters List</h1>
      <ul className="character-grid">
        {characters.map(character => (
          <li key={character.id} onClick={() => handleCharacterClick(character.id)}>
            <img 
              src={character.image} 
              alt={character.name}
            />
            <p>{character.name}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleNextPage}>Next Pageeeeeee</button>

      {/* Modal for character details */}
      {selectedCharacter && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedCharacter(null)}>&times;</span>
            <h2>{selectedCharacter?.name}</h2>
            <img 
              src={selectedCharacter?.image} 
              alt={selectedCharacter?.name} 
            />
            <p>{selectedCharacter.type}</p>
            <p>{selectedCharacter.status}</p>
            <p>{selectedCharacter.species}</p>
            <p>{selectedCharacter.gender}</p>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;