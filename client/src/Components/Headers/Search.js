import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
// import './search.css'; // Optional: for styling

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const state = useContext(GlobalState);
    const [products] = state?.productAPI?.products || [[]];
    const [mobiles] = state?.mobileAPI?.mobiles || [[]];
    const [fashions] = state?.fashionAPI?.fashions || [[]];

    const allItems = [...products, ...mobiles, ...fashions];

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim()) {
            const filtered = allItems.filter(item =>
                item.title.toLowerCase().includes(query)
            );
            setSearchResults(filtered.slice(0, 5));
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div className="">
            <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearch}
            />
            {searchQuery && (
                <ul className="search-results">
                    {searchResults.length ? (
                        searchResults.map(item => (
                            <li key={item._id}>
                                <Link to={`/detail/${item._id}`} onClick={() => setSearchQuery('')}>
                                    <img className="search-result-thumb" src={item.image.url} alt={item.title} />
                                    {item.title}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className="no-result">No results found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Search;
