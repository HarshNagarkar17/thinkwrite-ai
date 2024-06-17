import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { getLists } from "../redux/list/list";

const StoreInit = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    dispatch(getLists());
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <div>{children}</div>;
};

export default StoreInit;
