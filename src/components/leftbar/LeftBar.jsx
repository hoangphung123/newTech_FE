import "./leftbar.scss"
import Friends from "../../assets/1.png";
import Gallery from "../../assets/8.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
const LeftBar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="leftBar">
      <div className="container">
         {/* First Group Items */}
        <div className="menu">
          <div className="user">
            <img src={currentUser.profileImg} alt="" />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
              <img src={Gallery} alt="" />
              <span>Gallery</span>
          </div>
        </div>
        <hr/>
      </div>
    </div>
  )
}

export default LeftBar