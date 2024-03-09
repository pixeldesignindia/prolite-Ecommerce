import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducerTypes";
import "./profile.css";
import ProfileSide from "../../components/sideNavProfile/ProfileSide";
import userIcon from '/images/user.svg'
const Profile = () => {
    const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);


    return (
        <div className="profile-page ">
<ProfileSide name={user?.name as string} pic={user?.photo as string} />
            <div className="profileLeft center proprofileCenter" style={{justifyContent:'center'}}>
                <div className="profileBody proprofile">
                    <div className="profileImg center">
                        {user?.photo===''?<img src={userIcon} alt="" />:<img src={user?.photo} alt="" />}
                        
                    </div>
                    <div className="profile-data">
                        <h3 className="text-center">{user?.name}</h3>
                        <div className="pro-data-row"><p>Email : </p> <p className="b">{user?.email}</p> </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
