import { NavLink } from 'react-router';

const sampleNotebooks = ['example.ipynb', 'soma.ipynb'];

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
    </>
  );
}

export default Home;
