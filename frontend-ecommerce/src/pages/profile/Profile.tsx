import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducerTypes";
import "./profile.css";
import ProfileSide from "../../components/sideNavProfile/ProfileSide";
const Profile = () => {
    const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);


    return (
        <div className="profile-page bg-blue">
<ProfileSide name={user?.name as string} pic={user?.photo as string} />
            <div className="profileLeft center">
                <div className="profileBody">
                    <div className="profileImg center">
                        <img src={user?.photo} alt="" />
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
