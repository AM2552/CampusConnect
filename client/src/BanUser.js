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
                headers: { Authorization: `Bearer ${auth.token}` },
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
                { headers: { Authorization: `Bearer ${auth.token}` } }
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
                { headers: { Authorization: `Bearer ${auth.token}` } }
            );
            alert("User unbanned successfully");
        } catch (error) {
            console.error("Error unbanning user", error);
        }
    };


    const renderBanButtons = () => {
      if (auth.authState && auth.modState) {
        
        return (
            <div>
            
            <input
                type="text"
                placeholder="Search non-banned users"
                value={searchNonBannedUser}
                onChange={(e) => setSearchNonBannedUser(e.target.value)}
            />
            <button onClick={handleBanUser}>Ban User</button>
                {nonBannedUserList.map(user => (
                    <div key={user.id} onClick={() => setSearchNonBannedUser(user.username)}>
                        {user.username}
                    </div>
                ))}

            
            <input
                type="text"
                placeholder="Search banned users"
                value={searchBannedUser}
                onChange={(e) => setSearchBannedUser(e.target.value)}
            />
            <button onClick={handleUnbanUser}>Unban User</button>
                {bannedUserList.map(user => (
                    <div key={user.id} onClick={() => setSearchBannedUser(user.username)}>
                        {user.username}
                    </div>
                ))}
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