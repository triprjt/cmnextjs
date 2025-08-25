'use client'

import { notFound } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { timeAgo } from '@/utils/timeutil'
import { useParams } from 'next/navigation'
import { PostDetailsResponse, PostsResponse, PostType } from '@/types/post'
import { CardComponentForPost } from '@/components/cards/cardComponentForPost'
import { CommentReplyType, CommentType, ReplyDetailsResponse } from '@/types/post'
import { LoadingSpinner } from '@/components/Loadingspinner'
import axios from 'axios'

/* ---------- component ---------- */
export default function PostDetailPage() {
    const params = useParams();
    const router = useRouter();
    console.log('params ', params)
    const postId = params.messageID as string;
    console.log()
    const [postDetails, setPostDetails] = useState<PostType | null>(null);
    // const [postId,setPostId] = useState<string>('')

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const [commentInputs, setCommentInputs] = useState<string>('');
    const [replyInputs, setReplyInputs] = useState<Map<string, string>>(new Map());
    const [loadingCommentButton, setLoadingCommentButton] = useState(false);
    useEffect(() => {
        const fetchPostDetails = async () => {
            // setPostId(params.messageID as string);
            const decodedPostId = decodeURIComponent(postId);  // Decodes 'messageId%3D68aacbb57e381985ec9c607e' to 'messageId=68aacbb57e381985ec9c607e'
            const actualPostId = decodedPostId.split('=')[1] || decodedPostId;  // Extracts '68aacbb57e381985ec9c607e' from 'messageId=68aacbb57e381985ec9c607e'
            setLoading(true);
            setError(null);
            let url = `/api/posts/${actualPostId}`;
            console.log('url ', url)
            try {
                const response = await axios.get(`/api/posts/${actualPostId}`);
                const result: PostDetailsResponse = response.data;
                setPostDetails(result.post);
            } catch (err: any) {
                console.error('Failed to fetch posts:', err);
                setError(`चर्चाओं को लोड करने में विफल: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchPostDetails();
    }, []); // Re-fetch when selectedConstituency changes

    const renderReplies = (replies: string[], commentId: string) => {
        const fetchReplyDetails = async (replyId: string) => {
            try {
                const url = `/api/comments/${replyId}`;
                const response = await axios.get(url);
                const result: ReplyDetailsResponse = response.data;
                setReplyInputs(prev => prev.set(commentId, result.comment.content));
                return result;
            }
            catch (err: any) {
                console.error('Failed to fetch replies:', err); 
                setError(`टिप्पणियों को लोड करने में विफल: ${err?.message}`);
            }
        };

        return replies.map((reply: string) => (
            <div key={reply} className=" rounded-md p-3">
                <p className="postsection-comment-content-text">{reply}</p>
            </div>
        ));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#273F4F] mx-auto mb-4"></div>
                    <p className="text-gray-600">लोड हो रहा है...</p>
                </div>
            </div>
        )
    }
    if (error) {
        return (
            <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center p-4">
                <div className="bg-[#f6f6f6] rounded-lg shadow-sm border border-gray-200 p-8 text-center max-w-md mx-4">
                    <h2 className="text-xl font-semibold text-red-600 mb-2">त्रुटि</h2>
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

    const handleCommentSubmit = async (postId: string) => {
        const commentText = commentInputs.trim();
        if (!commentText) return; // Don't submit empty comments

        console.log(`Submitting comment "${commentText}" for post ${postId}`);
        // Implement API call to submit comment here
        try {
            setLoadingCommentButton(true);
            const response = await axios.post(`/api/comments/${postId}`, {
                user: "68a733a6ea0064119890ac1d",
                content: commentText,
            });
            // Parse the API response
            const responseData = response.data;
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
            setPostDetails((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    comments: [newComment, ...(prev.comments || [])], // Add new comment at the beginning
                    commentCount: (prev.commentCount || 0) + 1,
                };
            });

        }

        catch (err: any) {
            setError(err.message);
        }
        finally {
            setCommentInputs('');
            setLoadingCommentButton(false);
        }
    };

    const handleCommentInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        setCommentInputs(event.target.value);
    };
    return (
        <div className="min-h-screen bg-[#939cab] pb-20 mb-3"> {/* pb-20 for fixed nav bar */}
            <main className="p-4">
                {/* Charcha Manch Banner */}
                <div className="bg-[#f6f6f6] rounded-lg shadow-sm p-2 text-center mb-4">
                    <p className="text-3xl font-bold text-[#273F4F] postsection-heading-text pt-2">चर्चा <span className="text-[#CA3C26]">मंच</span></p>
                    <p className=" postsection-subheading-text pt-2">संवाद और सामुदायिक सहयोग का मंच</p>
                </div>

                {/* Posts List */}
                <div className={`space-y-4 'mb-4'}`}>
                    {postDetails === null ? (
                        <div className="text-center text-gray-600 py-8">कोई चर्चा नहीं मिली।</div>
                    ) : (

                        <div key={postDetails._id} className="bg-[#f6f6f6] rounded-lg shadow-sm p-4">
                            {/* Post Header */}
                            <CardComponentForPost post={postDetails as PostType} />

                            {/* Post Content */}
                            {/* <h3 className="text-lg font-bold text-[#273F4F] mb-2">{post.title}</h3> */}
                            {/* <p className="text-sm text-gray-700 mb-3">{post.description}</p> */}
                            {postDetails.content && <p
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
                            >{postDetails.content}</p>}
                            {/* Tags */}
                            {postDetails.tags && postDetails.tags.length > 0 && (
                                <div className="flex flex-wrap gap-0 mb-3">
                                    {postDetails.tags.map((tag, index) => (
                                        <span key={index} className="px-2 py-1 rounded-full postsection-tag-text">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Interaction Buttons */}
                            <div className="flex items-center justify-between text-gray-600 text-sm pt-3 px-2">
                                <div className="flex items-center space-x-4 gap-2">
                                    <div className="flex items-center space-x-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                        <span>{postDetails.like.length}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <img src='.././dislikesvg.svg' className="w-4 h-4"></img>
                                        <span>{postDetails.dislike.length}</span> {/* Assuming a dislike count */}
                                    </div>
                                    {/* <div className="flex items-center space-x-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /></svg>
                    <span>{post.commentCount}</span>
                    </div> */}
                                </div>
                                <div className="flex items-center space-x-2">
                                    {/* <button className="flex items-center space-x-1 text-gray-600 hover:text-[#273F4F]">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.52.47 1.2.77 1.96.77 2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4c0 .24.04.47.09.7L7.1 11.23c-.52-.47-1.2-.77-1.96-.77-2.21 0-4 1.79-4 4s1.79 4 4 4c.76 0 1.44-.3 1.96-.77l7.05 4.11c-.05.23-.09.46-.09.7 0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4z" /></svg>
                                        <span>साझा</span>
                                    </button> */}
                                </div>
                            </div>

                            {/* Comment Section */}
                            <div className="pt-4 space-y-3">
                                {/* Write a comment */}
                                <div className="flex flex-col items-center w-full px-2 gap-2">
                                    <textarea
                                        placeholder="अपनी टिप्पणी लिखें..."
                                        className={`flex-1 p-2 border rounded-md w-full h-[120px] text-sm focus:outline-none focus:ring-1 focus:ring-[#273F4F] bg-[#F8FAFB] ${error ? 'border-red-500 shake-effect' : 'border-gray-200'}`}
                                        value={commentInputs}
                                        onChange={(e) => handleCommentInputChange(e)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                                                handleCommentSubmit(postDetails._id);
                                                e.currentTarget.value = ''; // Clear input
                                            }
                                        }}
                                    />
                                    <div className="w-full flex justify-items-start mt-1">
                                        <button
                                            className="bg-[#273F4F] text-white px-4 py-2 rounded-md w-fit flex items-center gap-2 item-center hover:bg-[#1e2f3a] transition-colors disabled:opacity-50"
                                            onClick={() => handleCommentSubmit(postDetails._id)}
                                        >
                                            {loadingCommentButton && <LoadingSpinner />}
                                            <span className="postsection-comment-button">{'टिप्पणी करें'}</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Existing Comments */}
                                {postDetails.comments && postDetails.comments.length > 0 && (
                                    <div className="space-y-2">
                                        {
                                            postDetails.comments
                                                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort 
                                                .map(comment => ( // Show first comment
                                                    <div key={comment._id} className=" rounded-md p-3">
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <div className="w-8 h-8 rounded-full bg-[#F0F2F4] flex items-center"><img src="/userpicturesalhuoette.svg" alt="user" className="w-4 h-4 mx-auto my-auto" /></div>
                                                            <p className="postsection-comment-author-name-text">{comment.user.name}</p>
                                                            {/* <span>{comment.user.area_name}</span> */}
                                                            <span className="postsection-constituency-area-text">• नई दिल्ली</span>
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
                                                                fontSize: '1rem',
                                                                lineHeight: '1.625rem'
                                                            }}
                                                        >{comment.content}</p>
                                                        <div className="flex items-center space-x-4 gap-2">
                                                            <div className="flex items-center space-x-1">
                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                                                <span>{postDetails.like.length}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <img src='.././dislikesvg.svg' className="w-4 h-4"></img>
                                                                <span>{postDetails.dislike.length}</span> {/* Assuming a dislike count */}
                                                            </div>
                                                            <span className="postsection-comment-reply-button">टिप्पणी दें</span>
                                                        </div>
                                                    </div>
                                                ))}

                                        {/* {postDetails.comments.length > 1 && (
                                            <button className="postsection-comment-more-comments-button w-full mx-auto" onClick={() => router.push(`/message/messageId=${postDetails._id}`)}>
                                                और टिप्पणियां देखें ({postDetails.comments.length - 1})
                                            </button>
                                        )} */}
                                    </div>
                                )}
                            </div>

                        </div>

                    )}
                </div>
                {/* {hasNextPage && (
          <div className="flex justify-center mb-6">
            <button
              className="bg-[#7B8B95] px-4 rounded-md py-2 postsection-comment-more-posts-button"
              onClick={() => fetchPosts(currentPage + 1, pagelimit)}
            >
              {seemorePostsLoading ? <LoadingSpinner /> : 'और पोस्ट देखे'}
            </button>
          </div>
        )}
         */}
            </main>

        </div>
    );
}