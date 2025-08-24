import { PostType } from "@/types/post";
import { timeAgo } from "@/utils/timeutil";

export const CardComponentForPost = ({ post }: { post: PostType }) => {
    if (!post) {
        return (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <p className="text-gray-500">पोस्ट नहीं मिली</p>
          </div>
        )
      }
    return (
      <div className="bg-white rounded-lg flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-10 h-10 rounded-full bg-[#F0F2F4] flex items-center"><img src="/userpicturesalhuoette.svg" alt="user" className="w-5 h-5 mx-auto my-auto" /></div>
          <div className="flex flex-col items-start">
            <span className=" postsection-author-name-text ">{post.author.name}</span>
            <span className="text-xs text-gray-500 postsection-author-time-text">{timeAgo(post.createdAt)}</span>
          </div>
          {post.constituency && <span className="postsection-constituency-area-text">• {post.constituency.area_name}</span>}
          <div className="bg-[#176DCF0D] rounded-[4px] border-l-4 postsection-category-text border-[#273F4F] h-fit px-1 ">
            <span className="my-auto">{post.category.name}</span>
          </div>
        </div>
        <button className="flex"><img src='postsectionbutton.svg'></img></button>

      </div>
    );
  };