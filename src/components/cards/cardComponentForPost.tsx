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
      <div className="bg-[#f6f6f6] rounded-lg px-2 py-2 relative mb-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F0F2F4] flex items-center"><img src="/userpicturesalhuoette.svg" alt="user" className="w-5 h-5 mx-auto my-auto" /></div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium leading-5 text-[#1D2530] font-['Noto Sans Devanagari, sans-serif'] align-middle tracking-[0%] py-1">{post.author.name}</span>
            <span className="text-xs text-[#7B899D] font-medium font-['Noto Sans Devanagari, sans-serif'] postsection-author-time-text">{timeAgo(post.createdAt)}</span>
          </div>
          {post.constituency && <span className="text-xs font-medium text-[#7B899D] font-['Noto Sans Devanagari, sans-serif'] px-3 py-2 postsection-constituency-area-text">• {post.constituency.area_name}</span>}
          <div className="absolute -top-4 -right-4 bg-[#D3DADF] rounded-lg border border-[#A5B8C7] flex items-center justify-center px-2 whitespace-nowrap py-1">
            <span className="text-[#176DCF] text-sm font-normal leading-4 font-['Noto_Sans_Devanagari'] block">{post.category.name}</span>
          </div>
          {/* <button className="absolute right-0 flex py-0"><img src='postsectionbutton.svg' className="w-10 h-10" alt="section button" /></button> */}
        </div>
      </div>
    );
  };