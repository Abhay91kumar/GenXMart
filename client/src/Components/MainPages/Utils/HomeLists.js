import { Link } from 'react-router-dom';


const HomeLists = ({ item }) => {
  if (!item) return null;

  return (
    <>
      <div className="home-card-wrapper">
        <Link to={`/detail/${item._id}`} className="home-card-link">
          <img
            src={item.image?.url}
            alt={item.title}
            className="home-card-img"
          />
          <div className="home-card-body">
            <h3>{item.title}</h3>
          </div>
        </Link>
      </div>
    </>
  );
};

export default HomeLists;
