import { NavLink } from 'react-router';

const sampleNotebooks = ['example.ipynb', 'soma.ipynb'];
const sampleTerminals = ['1', '2'];

function Home() {
  return (
    <>
      <div className="notebook-list">
        <div>List of notebooks</div>
        {sampleNotebooks.map(nb => {
          return (
            <NavLink key={nb} to={`notebooks/${nb}`}>
              {nb}
            </NavLink>
          );
        })}
      </div>
      <div className="notebook-list">
        <div>List of terminals</div>
        {sampleTerminals.map(terminal => {
          return (
            <NavLink key={terminal} to={`terminals/${terminal}`}>
              {terminal}
            </NavLink>
          );
        })}
      </div>
    </>
  );
}

export default Home;
