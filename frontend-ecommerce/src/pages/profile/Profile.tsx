import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducerTypes";
import "./profile.css";

const Profile = () => {
    const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);

    // Function to convert ISO 8601 date to a readable format
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString(); // Adjust as needed for time or other format
    };

    return (
        <div className="profile-page bg-blue">
            <div className="profileLeft center">
                <div className="profileBody">
                    <div className="profileImg">
                        <img src={user?.photo} alt="" />
                    </div>
                    <div className="profile-data">
                        <h3>{user?.name}</h3>
                        <div className="pro-data-row"><p>Email : </p> <p>{user?.email}</p> </div>
                        <div><p>Gender : </p> <p>{user?.gender}</p> </div>
                        <div><p>Date of Birth : </p> <p>{user ? formatDate(user.dob) : ""}</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
