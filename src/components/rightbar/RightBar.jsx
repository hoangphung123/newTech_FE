import "./rightbar.scss"
import ProfileImg from "../../assets/profile/boyChild.jpg"
const RightBar = () => {
  const userDataArray = [
    {
      description: "Có ai thích chó ko",
      imageURL: "https://i.pinimg.com/564x/3b/1a/6f/3b1a6f3340cc082e698456137522057a.jpg",
    },
    {
      description: "Dư một chậu cây cảnh",
      imageURL: "https://i.pinimg.com/564x/db/30/72/db3072aea296b6a96773e09a79880c54.jpg",
    },
    // Add more user data as needed
  ];
  const FriendsDataArray = [
    {
      userid: 135,
      username: "hoanghuy",
      imageURL: "https://i.pinimg.com/564x/3b/1a/6f/3b1a6f3340cc082e698456137522057a.jpg",
    },
    {
      userid: 134,
      username: "DinhThinh",
      imageURL: "https://i.pinimg.com/564x/db/30/72/db3072aea296b6a96773e09a79880c54.jpg",
    },
    {
      userid: 136,
      username: "DucHuy",
      imageURL: "https://i.pinimg.com/564x/db/30/72/db3072aea296b6a96773e09a79880c54.jpg",
    },
    // Add more user data as needed
  ];
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
        <span>Registration for your posts</span>
        {userDataArray.map((userData, index) => (
           <div className="user" key={index}>
           {/* User */}
             <div className="userInfo">
               {/* Use the imageURL from user data */}
               <img src={userData.imageURL} alt="" />
               <span>{userData.description}</span>
             </div>
             <div className="buttons">
               <button>Detail</button>
           </div>
         </div>
        ))}
        </div>
        <div className="item">
              <span>Your registrations for oder post</span>
              {/* First User */}
              <div className="user">
                    <div className="userInfo">
                          <img src={ProfileImg} alt="" />
                          <p>
                          <span>Minh Nhat </span> changed their cover picture
                          </p>
                    </div>
                    <span>1 min ago</span>
                </div>
                {/* Second User */}
                <div className="user">
                    <div className="userInfo">
                          <img src={ProfileImg} alt="" />
                          <p>
                          <span>Minh Nhat </span> changed their cover picture
                          </p>
                    </div>
                    <span>1 min ago</span>
                </div>
                {/* Third User */}
                <div className="user">
                    <div className="userInfo">
                          <img src={ProfileImg} alt="" />
                          <p>
                          <span>Minh Nhat </span> changed their cover picture
                          </p>
                    </div>
                    <span>1 min ago</span>
                </div>
        </div>
        {/* Third Item */}
        <div className="item">
          <span>Online Friends</span>
          {/* Replace the hard-coded user data with FriendsDataArray */}
          {FriendsDataArray.map((friendData, index) => (
            <div className="user" key={index}>
              <div className="userInfo">
                <img src={friendData.imageURL} alt="" />
                <div className="online" />
                <span>{friendData.username}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RightBar