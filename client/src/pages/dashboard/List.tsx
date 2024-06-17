import listApis from "@/apis/list/list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRouter } from "../../hooks/use-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateSelectedList } from "../../redux/list/list";

const List = () => {
  const { listId } = useParams();
  const { lists, selectedList, loading } = useAppSelector(
    (state) => state.slice
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!loading && lists.length > 0) {
      const list = lists.find((l) => l._id === listId);
      if (!list) {
        router.push("/");
      } else {
        dispatch(updateSelectedList(list));
      }
    }
  }, [loading, lists, listId, dispatch, router]);

  useEffect(() => {
    if (!selectedList) return;

    const fetch = async () => {
      const response = await listApis.getContent(selectedList._id);
      const content = response.content.body || "";
      setContent(content);
    };

    try {
      fetch();
    } catch (error) {
      console.log("error while fething content", { error });
    }
  }, [selectedList]);

  if (loading || !selectedList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-start gap-4">
      <Avatar className="border w-6 h-6">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>YO</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        {/* <div className="font-bold">
      The Future of SaaS: Trends and Predictions
    </div> */}
        <div className="prose prose-stone">
          {/* <p>
            The SaaS (Software as a Service) industry has been rapidly evolving,
            and the future holds exciting developments that will shape the way
            businesses operate. In this blog post, we'll explore the emerging
            trends and predictions that will define the future of SaaS.
          </p>
          <h2>
            Increased Adoption of Artificial Intelligence and Machine Learning
          </h2>
          <p>
            One of the most significant trends in the SaaS industry is the
            integration of Artificial Intelligence (AI) and Machine Learning
            (ML) technologies. SaaS providers are leveraging these advancements
            to enhance their products, automate processes, and provide more
            personalized experiences for their customers.
          </p>
          <h2>Emphasis on Seamless User Experience</h2>
          <p>
            As the SaaS market becomes more competitive, the focus on delivering
            a seamless and intuitive user experience (UX) will be crucial. SaaS
            companies will invest heavily in user research, design, and
            continuous improvement to ensure their products are easy to use and
            meet the evolving needs of their customers.
          </p>
          <h2>Rise of Vertical-Specific SaaS Solutions</h2>
          <p>
            While the SaaS industry has traditionally offered horizontal
            solutions that cater to a wide range of businesses, the future will
            see a rise in vertical-specific SaaS offerings. These specialized
            solutions will be tailored to the unique needs and requirements of
            specific industries, providing more targeted and efficient tools for
            businesses.
          </p>
          <h2>Increased Emphasis on Data Security and Compliance</h2>
          <p>
            As businesses entrust more of their data and operations to SaaS
            providers, the importance of data security and compliance will
            continue to grow. SaaS companies will need to invest in robust
            security measures, adhere to industry regulations, and demonstrate
            their commitment to protecting customer data.
          </p>
          <h2>Subscription-Based Pricing Models and Flexible Offerings</h2>
          <p>
            The SaaS industry has already embraced the subscription-based
            pricing model, and this trend is expected to continue. SaaS
            providers will also offer more flexible and customizable pricing
            options, allowing customers to scale their usage and pay only for
            the features they need.
          </p>
          <p>
            In conclusion, the future of SaaS is filled with exciting
            advancements and transformations. By embracing these trends and
            predictions, SaaS companies can stay ahead of the curve, deliver
            exceptional value to their customers, and thrive in the
            ever-evolving digital landscape.
          </p> */}
          {content.length > 0 ? (
            <p>{content}</p>
          ) : (
            <p className="opacity-50">content required</p>
          )}
        </div>
        {/* <div className="flex items-center gap-2 py-2">
      <Button
        variant="ghost"
        size="icon"
        className="w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900"
      >
        <ClipboardIcon className="w-4 h-4" />
        <span className="sr-only">Copy</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900"
      >
        <ThumbsUpIcon className="w-4 h-4" />
        <span className="sr-only">Upvote</span>
      </Button>
      <Button variant="ghost" size="icon" className="w-4 h-4 hover:" />
    </div> */}
      </div>
    </div>
  );
};

export default List;
