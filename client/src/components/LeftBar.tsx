import { useAppSelector } from "@/redux/hooks";
import {
  ApertureIcon,
  BookmarkIcon,
  ChevronRightIcon,
  MenuIcon,
  PlusIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CreateDialog } from "./CreateDialog";
import BlogPlate from "./ui/BlogPlate";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const LeftBar = ({ children }: { children: React.ReactNode }) => {
  const { lists, loading, error } = useAppSelector((state) => state.slice);
  const [toggleDialog, setToggleDialog] = useState(false);

  console.log({ error });
  const handleToggleDialog = () => {
    setToggleDialog((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <header className="bg-[#1E293B] px-4 py-3 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2">
            <ApertureIcon className="h-6 w-6 fill-blue-500" />
            <div className="text-lg font-bold text-white">SaaS Blog</div>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MenuIcon className="h-5 w-5 text-white" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-[#1E293B] text-white w-[300px]"
            >
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <ApertureIcon className="h-6 w-6" />
                  <div className="text-lg font-bold">SaaS Blog</div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={handleToggleDialog}
                >
                  <PlusIcon className="h-5 w-5" />
                  <span className="sr-only">Add new</span>
                </Button>
              </div>
              <div className="overflow-auto flex-1 space-y-4 px-4">
                <div className="space-y-2">
                  <div className="text-gray-400 font-medium text-sm">
                    Featured
                  </div>
                  <Link
                    to="#"
                    className="bg-[#334155] rounded-lg p-3 flex items-center gap-3 hover:bg-[#475569] transition-colors"
                  >
                    <div className="bg-white text-[#1E293B] rounded-full w-8 h-8 flex items-center justify-center">
                      <BookmarkIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 truncate">
                      The Future of SaaS: Trends and Predictions
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </Link>
                </div>
                <div className="space-y-2">
                  <div className="text-gray-400 font-medium text-sm">
                    SaaS Insights
                  </div>
                  {loading ? (
                    <div>loading</div>
                  ) : (
                    lists.length > 0 &&
                    lists.map((list) => (
                      <BlogPlate
                        title={list.title}
                        _id={list._id}
                        key={list._id}
                      />
                    ))
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <div className="flex flex-1">
          <div className="bg-[#1E293B] text-white hidden md:flex flex-col gap-4 w-[300px] py-6 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ApertureIcon className="h-6 w-6 opacity-30" />
                <div className="text-lg font-bold">SaaS Blog</div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={handleToggleDialog}
              >
                <PlusIcon className="h-5 w-5" />
                <span className="sr-only">Add new</span>
              </Button>
            </div>
            <div className="overflow-auto flex-1 space-y-4">
              <div className="space-y-2">
                <div className="text-gray-400 font-medium text-sm">
                  Featured
                </div>
                <Link
                  to="#"
                  className="bg-[#334155] rounded-lg p-3 flex items-center gap-3 hover:bg-[#475569] transition-colors"
                >
                  <div className="bg-white text-[#1E293B] rounded-full w-8 h-8 flex items-center justify-center">
                    <BookmarkIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 truncate">
                    The Future of SaaS: Trends and Predictions
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </Link>
              </div>
              <div className="space-y-2">
                <div className="text-gray-400 font-medium text-sm">
                  SaaS Insights
                </div>
                {error && <p>{error}</p>}
                {loading ? (
                  <div>loading</div>
                ) : (
                  lists.length > 0 &&
                  !error &&
                  lists.map((list) => (
                    <BlogPlate
                      title={list.title}
                      _id={list._id}
                      key={list._id}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <div className="max-w-2xl flex-1 mx-auto flex flex-col items-start gap-8 px-4 py-8">
              {children}
            </div>
          </div>
        </div>
      </div>
      <CreateDialog open={toggleDialog} toggleDialog={handleToggleDialog} />
    </>
  );
};

export default LeftBar;
