import Spinner from "react-bootstrap/Spinner";
const AdminLoader = () => {
  return (
    <div>
      <div className="adminLoad d-flex justify-content-center align-items-center gap-2">
        <h4>Dashboard is Loading...</h4>
        <div className="d-flex justify-content-center align-items-center gap-2">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
        </div>
      </div>
    </div>
  );
};

export default AdminLoader;
