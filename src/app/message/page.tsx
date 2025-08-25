'use client'
import { CardComponentForPost } from "@/components/cards/cardComponentForPost";
import CommunityRuleSection from "@/components/CommunityRuleSection";
import { LoadingSpinner } from "@/components/Loadingspinner";
import Footer from "@/components/Footer";
import { ConstituencyListType } from "@/types/constituency";
import { CommentType, PostsResponse, PostType } from "@/types/post";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Select from 'react-select';
import { components } from 'react-select';
// Helper function to format date
const timeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " वर्ष पहले";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " महीने पहले";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " दिन पहले";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " घंटे पहले";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " मिनट पहले";
  }
  return "अभी";
};


export default function MessagePage() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [errorPosts, setErrorPosts] = useState<string | null>(null);
  const [constituencyAreaList, setConstituencyAreaList] = useState<ConstituencyListType[]>([]);
  const [selectedConstituency, setSelectedConstituency] = useState<{ value: string; label: string } | null>(null);
  const [loadingConstituencies, setLoadingConstituencies] = useState(true);
  const [errorConstituencies, setErrorConstituencies] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  const [commentInputs, setCommentInputs] = useState<Map<string, string>>(new Map());
  const [loadingCommentInput, setLoadingCommentInput] = useState<Map<string, boolean>>(new Map());
  const [errorCommentInput, setErrorCommentInput] = useState<Map<string, string>>(new Map());
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [seemorePostsLoading, setSeemorePostsLoading] = useState(false);
  const pagelimit = 5;
  // Fetch constituencies for the filter dropdown
  useEffect(() => {
    const fetchConstituencyAreaList = async () => {
      setLoadingConstituencies(true);
      try {
        const response = await fetch(`${backendUrl}/api/constituencies`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ConstituencyListType[] = await response.json();
        setConstituencyAreaList(data);
      } catch (err: any) {
        setErrorConstituencies(`निर्वाचन क्षेत्रों को लोड करने में विफल: ${err.message}`);
      } finally {
        setLoadingConstituencies(false);
      }
    };
    fetchConstituencyAreaList();
  }, [backendUrl]);

  const handleCommentInputChange = (postId: string, event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const value = event.target.value;
    console.log("postId", postId, 'value ', event.target.value);
    setCommentInputs(prev => {
      const newState = new Map(prev);
      newState.set(postId, value);
      return newState;
    });
  };
  // Fetch posts based on selected constituency or all posts
  const fetchPosts = useCallback(async (page: number, limit: number) => {
    if (page === 1) { setLoadingPosts(true); }
    setErrorPosts(null);

    let url = `${backendUrl}/api/posts?page=${page}&limit=${limit}&sortBy=createdAt&sortOrder=desc`;
    if (selectedConstituency) {
      url = `${backendUrl}/api/posts/constituency/${selectedConstituency.value}?page=${page}&limit=${limit}&sortBy=createdAt&sortOrder=desc`;
    }
    if (page !== 1) {
      setSeemorePostsLoading(true);
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: PostsResponse = await response.json();
      if (page === 1) {
        setPosts(result.data.posts);
      } else {
        setPosts(prev => [...prev, ...result.data.posts]);
      }
      setCurrentPage(result.data.pagination.currentPage);
      setHasNextPage(result.data.pagination.hasNextPage);
    } catch (err: any) {
      console.error('Failed to fetch posts:', err);
      setErrorPosts(`चर्चाओं को लोड करने में विफल: ${err.message}`);
    } finally {
      if (page === 1) { setLoadingPosts(false); }
      if (page !== 1) { setSeemorePostsLoading(false); }
    }
  }, [selectedConstituency, backendUrl]);
  useEffect(() => {

    fetchPosts(currentPage, pagelimit);
  }, [selectedConstituency, backendUrl]); // Re-fetch when selectedConstituency changes


  const handleConstituencyFilterChange = (option: { value: string; label: string } | null) => {
    setSelectedConstituency(option);
  };
  const handleCommentSubmit = async (postId: string) => {
    const commentText = commentInputs.get(postId)?.trim();
    if (!commentText) return; // Don't submit empty comments

    console.log(`Submitting comment "${commentText}" for post ${postId}`);
    // Implement API call to submit comment here
    try {
      setLoadingCommentInput(prev => {
        const newState = new Map(prev);
        newState.set(postId, true);
        return newState;
      });
      const response = await fetch(`${backendUrl}/api/comments/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: "68a733a6ea0064119890ac1d",
          content: commentText,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the API response
      const responseData = await response.json();
      console.log("responseData", responseData);
      const newComment: CommentType = {
        _id: responseData.comment._id,
        user: responseData.comment.user,
        post: postId,
        __v: responseData.comment.__v,
        constituency: responseData.comment.constituency,
        parentComment: responseData.comment.parentComment,
        replies: responseData.comment.replies,
        like: responseData.comment.like,
        dislike: responseData.comment.dislike,
        replyCount: responseData.comment.replyCount,
        updatedAt: responseData.comment.updatedAt,
        content: responseData.comment.content,
        createdAt: responseData.comment.createdAt,
      };

      // Update the posts state to include the new comment
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? {
              ...post,
              comments: [...post.comments, newComment], // Append the new comment
              commentCount: post.commentCount + 1, // Increment comment count
            }
            : post
        )
      );
    }

    catch (err: any) {
      setErrorCommentInput(prev => {
        const newState = new Map(prev);
        newState.set(postId, 'टिप्पणी जोड़ने में विफल: ' + err.message);
        return newState;
      });
    }
    finally {
      setCommentInputs(prev => {
        const newState = new Map(prev);
        newState.set(postId, '');
        return newState;
      });
      setLoadingCommentInput(prev => {
        const newState = new Map(prev);
        newState.set(postId, false);
        return newState;
      });
    }
    // Clear the input field after submission
    // setCommentInputs(prev => {
    //   const newState = new Map(prev);
    //   newState.set(postId, '');
    //   return newState;
    // });
    // You might want to refetch posts or update the `posts` state to show the new comment
  };
  if (loadingConstituencies || loadingPosts) {
    return (
      <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#273F4F] mx-auto mb-4"></div>
          <p className="text-gray-600">लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  if (errorConstituencies || errorPosts) {
    return (
      <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center p-4">
        <div className="bg-[#f6f6f6] rounded-lg shadow-sm border border-gray-200 p-8 text-center max-w-md mx-4">
          <h2 className="text-xl font-semibold text-red-600 mb-2">त्रुटि</h2>
          <p className="text-gray-600 mb-4">{errorConstituencies || errorPosts}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#273F4F] text-white px-6 py-2 rounded-lg hover:bg-[#1e2f3a] transition-colors"
          >
            दोबारा कोशिश करें
          </button>
        </div>
      </div>
    );
  }

  const CustomControl = ({ children, ...props }: any) => {
    return (
      <components.Control {...props}>
        <img src="/arealocation.svg" alt="Location" className="w-5 h-5 ml-4" /> {/* Increased left margin */}
        {children}
      </components.Control>
    );
  };

  return (
    <div className="min-h-screen bg-[#c1cbd1] flex flex-col">
      <div className="flex-grow pb-20 mb-2.5"> {/* pb-20 for fixed nav bar */}
        <main className="px-4 py-2.5">
        <div className="space-y-2.5">
          {/* Charcha Manch Banner */}
          <div className="bg-[#273F4F] rounded-lg shadow-sm text-center mb-2.5 relative overflow-hidden">
            {/* Left side image */}
            <img 
              src="/flyer-charcha-mach-your-area/charcha-manch-flyer-left.PNG" 
              alt="Charcha Manch Left Flyer" 
              className="absolute -left-5 -top-12 h-[180%] w-auto object-contain opacity-100"
            />
            
            {/* Right side image */}
            <img 
              src="/flyer-charcha-mach-your-area/charcha-manch-flyer-right.PNG" 
              alt="Charcha Manch Right Flyer" 
              className="absolute -right-5 -top-12 h-[180%] w-auto object-contain opacity-100"
            />
            
            {/* Content - with higher z-index to appear above images */}
            <div className="relative z-10">
              <p 
                className="text-4xl tracking-[0%] text-center flex items-center justify-center gap-2 text-[#ffffff] pt-8"
                style={{
                  fontFamily: 'Noto Sans Devanagari, sans-serif',
                  fontWeight: 800,
                  lineHeight: '1.42',
                }}
              >
                <span>चर्चा</span><span 
                  className="text-[#DC3C22] inline-flex"
                  style={{
                    fontFamily: 'Noto Sans Devanagari, sans-serif',
                    fontWeight: 800,
                  }}
                >मंच</span>
              </p>
              <p 
                className="pt-0 text-base mb-6"
                style={{
                  fontFamily: 'Noto Sans Devanagari, sans-serif',
                  fontWeight: 600,
                  lineHeight: '1.425', // 22.75px/14px = 1.425
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  color: '#a4abb6ff'
                }}
              >संवाद और सामुदायिक सहयोग का मंच</p>
            </div>
          </div>

          {/* Constituency Filter */}
          <div className="mb-2.5">
            <label htmlFor="constituency-filter " className="sr-only postsection-dropdown-text"
               >सभी निर्वाचन क्षेत्</label>

            <div className="relative">
              {/* <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
              </span> */}
              <Select
                id="constituency-filter"
                options={constituencyAreaList.map(c => ({ value: c._id, label: c.area_name }))}
                value={selectedConstituency}
                onChange={handleConstituencyFilterChange}
                placeholder="सभी निर्वाचन क्षेत्र"
                isClearable={true}
                components={{ Control: CustomControl }} // Use the CustomControl component here
                styles={{
                  control: (provided) => ({
                    ...provided,
                    paddingLeft: '0', // Reset padding as we're handling it in CustomControl
                    borderRadius: '0.5rem',
                    borderColor: '#e5e7eb',
                    boxShadow: 'none',
                    backgroundColor: '#f6f6f6',
                    '&:hover': {
                      borderColor: '#d1d5db',
                    },
                    display: 'flex', // Ensure flex layout for children (icon, value/placeholder)
                    alignItems: 'center', // Vertically center content
                    minHeight: '2.5rem', // Consistent height
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: '#1D2530', // Styled placeholder text color
                    paddingLeft: '0.75rem', // Space between icon and text
                    lineHeight: '3',
                    fontWeight: 500,
                    fontSize: '1 rem', // 16px
                    fontFamily: 'Noto Sans Devanagari, sans-serif'
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: '#1D2530',
                    paddingLeft: '0.75rem', // Space between icon and selected value
                    lineHeight: '3',
                    fontWeight: 550,
                    fontSize: '1 rem', // 16px
                    fontFamily: 'Noto Sans Devanagari, sans-serif'
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? '#273F4F' : state.isFocused ? '#f3f4f6' : 'white',
                    color: state.isSelected ? 'white' : '#1f2937'
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    padding: '0', // Reset default padding if necessary to control spacing with icon
                  }),
                }}
                instanceId="message-page-constituency-select"
              />
            </div>
          </div>

          {/* Search Bar */}
          {/* <div className="mb-6 relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0017 10c0-3.59-2.91-6.5-6.5-6.5S4 6.41 4 10s2.91 6.5 6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
            </span>
            <input
              type="text"
              placeholder="चर्चा, मुद्दे, उम्मीदवार खोजें..."
              className="w-full pl-8 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#273F4F]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}

          {/* Posts List */}
          <div className={`space-y-2.5 ${!hasNextPage ? 'mb-10' : 'mb-2.5'}`}>
            {posts.length === 0 ? (
              <div className="text-center text-gray-600 py-8">कोई चर्चा नहीं मिली।</div>
            ) : (
              posts.map(post => (
                <div key={post._id} className="bg-[#f6f6f6] rounded-lg shadow-sm p-4">
                  {/* Post Header */}
                  <CardComponentForPost post={post as PostType} />

                  {/* Post Content */}
                  {/* <h3 className="text-lg font-bold text-[#273F4F] mb-2">{post.title}</h3> */}
                  {/* <p className="text-sm text-gray-700 mb-3">{post.description}</p> */}
                  {post.content && <p 
                    className="mb-3 px-2 postsection-post-content-text"
                    style={{
                      fontFamily: 'Noto Sans Devanagari, sans-serif',
                      fontWeight: 400,
                      fontSize: '1rem',
                      lineHeight: '1.625rem',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                      color: '#1D2530',
                      textAlign: 'justify'
                    }}
                  >{post.content}</p>}
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-0 mb-3">
                      {post.tags.map((tag, index) => (
                        <span key={index} className=" px-2 py-1 rounded-full postsection-tag-text">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Interaction Buttons */}
                  <div className="flex items-center justify-between text-gray-600 text-sm px-2 pt-3">
                    <div className="flex items-center space-x-4 gap-2">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                        <span>{post.like.length}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <img src='./dislikesvg.svg' className="w-4 h-4"></img>
                        <span>{post.dislike.length}</span> {/* Assuming a dislike count */}
                      </div>
                      {/* <div className="flex items-center space-x-1">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /></svg>
                        <span>{post.commentCount}</span>
                      </div> */}
                    </div>
                    {/* <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-[#273F4F]">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.52.47 1.2.77 1.96.77 2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4c0 .24.04.47.09.7L7.1 11.23c-.52-.47-1.2-.77-1.96-.77-2.21 0-4 1.79-4 4s1.79 4 4 4c.76 0 1.44-.3 1.96-.77l7.05 4.11c-.05.23-.09.46-.09.7 0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4z" /></svg>
                        <span>साझा</span>
                      </button>
                    </div> */}
                  </div>

                  {/* Comment Section */}
                  <div className="pt-4 space-y-3">
                    {/* Write a comment */}
                    <div className="flex flex-col items-center w-full px-2 gap-2">
                      <textarea // This is your input area
                        placeholder="अपनी टिप्पणी लिखें..."
                        className={`flex-1 p-2 border rounded-md w-full h-[120px] text-sm focus:outline-none focus:ring-1 focus:ring-[#273F4F] bg-[#F8FAFB] ${errorCommentInput.get(post._id) ? 'border-red-500 shake-effect' : 'border-gray-200'}`}
                        value={commentInputs.get(post._id)}
                        onChange={(e) => handleCommentInputChange(post._id, e)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                            handleCommentSubmit(post._id);
                            e.currentTarget.value = ''; // Clear input
                          }
                        }}
                      />
                      <div className="w-full flex justify-items-start mt-1">
                        <button
                          className="bg-[#273F4F] text-white px-4 py-2 rounded-md w-fit flex items-center gap-2 item-center hover:bg-[#1e2f3a] transition-colors disabled:opacity-50"
                          onClick={() => handleCommentSubmit(post._id)} // Simplified for example
                        >
                          {loadingCommentInput.get(post._id) && <LoadingSpinner />}
                          <span className="postsection-comment-button">{'टिप्पणी करें'}</span>
                        </button>
                      </div>

                    </div>

                    {/* Existing Comments */}
                    {post.comments && post.comments.length > 0 && (
                      <div className="space-y-2">
                        {
                          post.comments
                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort 
                            .slice(0, 1).map(comment => ( // Show first comment
                              <div key={comment._id} className=" rounded-md p-3">
                                <div className="flex items-center space-x-2 mb-1">
                                  <div className="w-8 h-8 rounded-full bg-[#F0F2F4] flex items-center"><img src="/userpicturesalhuoette.svg" alt="user" className="w-4 h-4 mx-auto my-auto" /></div>
                                  <p className="postsection-comment-author-name-text font-['Noto Sans Devanagari, sans-serif']">{comment.user.name}</p>
                                  {/* <span>{comment.user.area_name}</span> */}
                                  <span className="postsection-constituency-area-text">• बेगूसराय</span>
                                  <span className="postsection-constituency-area-text">• {timeAgo(comment.createdAt)}</span>
                                </div>
                                <p 
                                  className="postsection-comment-content-text mb-1"
                                  style={{
                                    overflowWrap: 'break-word',
                                    wordWrap: 'break-word',
                                    whiteSpace: 'pre-wrap',
                                    maxWidth: '100%',
                                    textAlign: 'justify',
                                    fontFamily: 'Noto Sans Devanagari, sans-serif',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.625rem'
                                  }}
                                >{comment.content}</p>
                                <div className="flex items-center space-x-4 gap-2">
                                  <div className="flex items-center space-x-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                    <span>{post.like.length}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <img src='./dislikesvg.svg' className="w-4 h-4"></img>
                                    <span>{post.dislike.length}</span> {/* Assuming a dislike count */}
                                  </div>
                                  <span className="postsection-comment-reply-button">टिप्पणी दें</span>
                                </div>
                              </div>
                            ))}

                        {post.comments.length > 1 && (
                          <button className="postsection-comment-more-comments-button w-full mx-auto" onClick={() => router.push(`/message/messageId=${post._id}`)}>
                            और टिप्पणियां देखें ({post.comments.length - 1})
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          {hasNextPage && (
            <div className="flex justify-center mb-2.5">
              <button
                className="bg-[#7B8B95] px-4 rounded-md py-2 postsection-comment-more-posts-button"
                onClick={() => fetchPosts(currentPage + 1, pagelimit)}
              >
                {seemorePostsLoading ? <LoadingSpinner /> : 'और पोस्ट देखे'}
              </button>
            </div>
          )}
          <CommunityRuleSection />
        </div>
      </main>

      {/* Fixed "नई चर्चा" button */}
      <button onClick={() => router.push('/newPost')} className="bg-[#273F4F] text-white px-5 py-3 rounded-3xl flex items-center justify-center z-10 shadow-lg fixed bottom-18 right-1 gap-2 text-lg font-medium hover:bg-[#1e2f3a] transition-colors">
        <span className="text-xl font-bold">+</span> <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>नई चर्चा</span>
      </button>
      </div>
      <Footer />
    </div>
  )
}

// Global CSS for custom font if needed
// You might need to add this to your globals.css or import it
// .charcha-manch-heading-text {
//   font-family: 'Noto Sans Devanagari', sans-serif;
// }
