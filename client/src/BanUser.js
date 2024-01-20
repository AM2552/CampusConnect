import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./helpers/AuthProvider";

function BanUser() {
    const serverUrl = 'http://localhost:5001';
    
    const auth = useAuth();
    const [searchNonBannedUser, setSearchNonBannedUser] = useState("");
    const [searchBannedUser, setSearchBannedUser] = useState("");
    const [nonBannedUserList, setNonBannedUserList] = useState([]);
    const [bannedUserList, setBannedUserList] = useState([]);

    const searchUsers = async (searchQuery, isBanned) => {
        try {
            const response = await axios.get(`${serverUrl}/users/search`, {
                params: {
                    query: searchQuery,
                    bannedStatus: isBanned.toString(),
                },
                headers: { 'auth-token': `Bearer ${auth.token}` },
            });
            if (isBanned) {
                setBannedUserList(response.data);
            } else {
                setNonBannedUserList(response.data);
            }
        } catch (error) {
            console.error("Error searching users", error);
        }
    };

    useEffect(() => {
        if (searchNonBannedUser) {
            searchUsers(searchNonBannedUser, false);
        } else {
            setNonBannedUserList([]);
        }
    }, [searchNonBannedUser, auth.token]);
    
    useEffect(() => {
        if (searchBannedUser) {
            searchUsers(searchBannedUser, true);
        } else {
            setBannedUserList([]);
        }
    }, [searchBannedUser, auth.token]);
    

    const handleBanUser = async () => {
        try {
            await axios.post(`${serverUrl}/users/ban`, 
                { username: searchNonBannedUser },
                { headers: { 'auth-token': `Bearer ${auth.token}` } }
            );
            alert("User banned successfully");
        } catch (error) {
            console.error("Error banning user", error);
        }
    };
    
    const handleUnbanUser = async () => {
        try {
            await axios.post(`${serverUrl}/users/unban`, 
                { username: searchBannedUser },
                { headers: { 'auth-token': `Bearer ${auth.token}` } }
            );
            alert("User unbanned successfully");
        } catch (error) {
            console.error("Error unbanning user", error);
        }
    };


    const renderBanButtons = () => {
        if (auth.authState && auth.modState) {
          return (
              <div className="banUnbanContainer">
                <div className="banUserContainer">
                  <input
                      type="text"
                      className="banUserInput"
                      placeholder="Search non-banned users"
                      value={searchNonBannedUser}
                      onChange={(e) => setSearchNonBannedUser(e.target.value)}
                  />
                  <div className="banUserButtonDiv">
                  <button className="banUserButton" onClick={handleBanUser}>Ban User</button>
                  </div>
                  <div className="dropdownContainer">
                    {nonBannedUserList.map(user => (
                        <div key={user.id} className="dropdownItem" onClick={() => setSearchNonBannedUser(user.username)}>
                            {user.username}
                        </div>
                    ))}
                  </div>
                </div>
  
                <div className="unbanUserContainer">
                  <input
                      type="text"
                      className="unbanUserInput"
                      placeholder="Search banned users"
                      value={searchBannedUser}
                      onChange={(e) => setSearchBannedUser(e.target.value)}
                  />
                  <div className="unbanUserButtonDiv">
                  <button className="unbanUserButton" onClick={handleUnbanUser}>Unban User</button>
                  </div>
                  <div className="dropdownContainer">
                    {bannedUserList.map(user => (
                        <div key={user.id} className="dropdownItem" onClick={() => setSearchBannedUser(user.username)}>
                            {user.username}
                        </div>
                    ))}
                  </div>
                </div>
              </div>
          );
        }
      };
  
    return (
      <>
        {renderBanButtons()}
      </>
    );
  }

  export default BanUser;