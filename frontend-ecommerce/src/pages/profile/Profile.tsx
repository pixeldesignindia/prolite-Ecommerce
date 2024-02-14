import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducerTypes";
import "./profile.css";

const Profile = () => {
    const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString(); 
    };

    return (
        <div className="profile-page bg-blue">

            <div className="profileLeft center">
                <div className="profileBody">
                    <div className="profileImg center">
                        <img src={user?.photo} alt="" />
                    </div>
                    <div className="profile-data">
                        <h3 className="text-center">{user?.name}</h3>
                        <div className="pro-data-row"><p>Email : </p> <p className="b">{user?.email}</p> </div>
                        <div className="pro-data-row"><p>Gender : </p> <p className="b">{user?.gender}</p> </div>
                        <div className="pro-data-row"><p>Date of Birth : </p> <p className="b">{user ? formatDate(user.dob) : ""}</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
