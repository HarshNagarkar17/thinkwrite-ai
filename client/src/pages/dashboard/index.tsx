import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const DashBoard = () => {
  const { lists } = useAppSelector((state) => state.slice);

  return (
    <div>
      <Link to={"/add"}>add</Link>
      DashBoard,{" "}
      {lists.length > 0 &&
        lists.map((list) => (
          <div key={list._id}>
            <Link to={`/list/${list._id}`}>{list.title}</Link> <br />
          </div>
        ))}
    </div>
  );
};

export default DashBoard;
