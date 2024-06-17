import { ChevronRightIcon, FilePenIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPlateProps {
  title: string;
  _id: string;
}
const BlogPlate = ({ title, _id }: BlogPlateProps) => {
  return (
    <Link
      to={`/list/${_id}`}
      className="bg-[#334155] rounded-lg p-3 flex items-center gap-3 hover:bg-[#475569] transition-colors"
    >
      <div className="bg-[#FCD34D] text-[#1E293B] rounded-full w-8 h-8 flex items-center justify-center">
        <FilePenIcon className="h-4 w-4" />
      </div>
      <div className="flex-1 truncate">{title}</div>
      <ChevronRightIcon className="h-5 w-5 text-gray-400" />
    </Link>
  );
};

export default BlogPlate;
