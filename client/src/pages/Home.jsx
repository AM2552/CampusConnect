import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfThreads, setListOfThreads] = useState([]);
  const [sortDateAscending, setSortDateAscending] = useState(true);
  const [sortTitleAscending, setSortTitleAscending] = useState(true);
  const [filteredThreads, setFilteredThreads] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("https://campus-connect.xyz:5001/").then((response) => {
      // Sort threads by date descending (newest first) before setting them
      const sortedByDate = response.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setListOfThreads(sortedByDate);
      setFilteredThreads(sortedByDate);
    });
  }, []);

  useEffect(() => {
    let filtered = listOfThreads;
    if (searchUser.trim() !== '') {
      filtered = filtered.filter(thread => 
        thread.username.toLowerCase().includes(searchUser.toLowerCase())
      );
    }
    if (searchKeyword.trim() !== '') {
      filtered = filtered.filter(thread => 
        thread.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        thread.threadText.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    setFilteredThreads(filtered);
  }, [searchUser, searchKeyword, listOfThreads]);

  const handleSearchChange = (e) => {
    setSearchUser(e.target.value);
  };

  const handleKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const sortByDate = () => {
    const sortedThreads = [...filteredThreads].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortDateAscending ? dateA - dateB : dateB - dateA;
    });
    setFilteredThreads(sortedThreads);
    setSortDateAscending(!sortDateAscending);
  };

  const sortByTitle = () => {
    const sortedThreads = [...filteredThreads].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return sortTitleAscending ? -1 : 1;
      if (titleA > titleB) return sortTitleAscending ? 1 : -1;
      return 0;
    });
    setFilteredThreads(sortedThreads);
    setSortTitleAscending(!sortTitleAscending); 
  };

  return (

    //ADD CLASSNAME
    <div>
      <div className="filterDiv">
        <div className="filterDiv1">
      <button className="dateFilter" onClick={sortByDate}>{sortDateAscending ? "Newest First" : "Oldest First"}</button>
      </div>
      <div className="filterDiv2">
      <button className="dateFilter" onClick={sortByTitle}>{sortTitleAscending ? "Z-A" : "A-Z"}</button>
      </div>
      <div className="searchByUser filterDiv2">
      <input 
        className="searchBy"
        type="text" 
        placeholder="Search by user..." 
        value={searchUser} 
        onChange={handleSearchChange}
      />
      </div>
      <div className="searchByKey filterDiv2">
      <input 
          className="searchBy"
          type="text" 
          placeholder="Search by keyword..." 
          value={searchKeyword} 
          onChange={handleKeywordChange}
        />
        </div>
        </div>
      {filteredThreads.map((value, key) => {
        return (
          <div
            key={key}
            className="thread"
            onClick={() => {
              navigate(`/thread/${value.id}`);
            }}
          >
            <div className="title">{value.title} </div>
            <div className="body">{value.threadText} </div>
            <div className="footer">{value.username} </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
