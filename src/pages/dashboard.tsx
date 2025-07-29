import { useEffect, useState } from 'react';
import { authClient } from "@/lib/auth-client";
import { useNavigate } from 'react-router-dom';
import HeaderProfile from '@/components/headerProfile';
import Button from '@/components/ui/button';
import Comments from '@/components/comments';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  _count: {
    likes: number;
    comments?: number; 
  };
  createdAt: string;
}

function Dashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
    const [errorMsg, setErrorMsg] = useState("");  
    const navigate = useNavigate();

    const API_BASE_URL = "http://localhost:3000";

    async function sessionHandler() {
        const { data: session} = await authClient.getSession();
        if (!session?.user) {
        navigate("/login")
        }
    }

    const fetchPosts = async () => {
        try {
        const res = await fetch(`${API_BASE_URL}/api/posts`, {
            credentials: "include"
        });
        const data = await res.json();
        setPosts(data);
        console.log(data)
        setLoading(false);
        } catch (err) {
        console.error("Failed to fetch posts:", err);
        setErrorMsg("Failed to load posts")
        }
    };

    const fetchPostLikes = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/posts/:id/likes`, {
                credentials: "include"
            });
            const likes = await res.json();
            console.log(likes);
        } catch (error) {
            console.error("Failed to fetch likes:", error)
        }
    }

    useEffect(() => {
        sessionHandler();
        fetchPosts();
    }, []);

    const toggleLike = async (postId: string) => {
        setErrorMsg("");
        try {
            const alreadyLiked = likedPosts.has(postId);

            const res = await fetch(`${API_BASE_URL}/api/posts/${postId}/like`, {
                method: alreadyLiked ? 'DELETE' : 'POST',
                credentials: "include"
            });
            if (res.ok) {
                setPosts(prev =>
                    prev.map(post =>
                    post.id === postId
                        ? {
                            ...post,
                            _count: {
                                ...post._count,
                                likes: post._count.likes + (alreadyLiked ? -1 : 1)
                            }
                        }
                        : post
                    )
                );
                const updatedSet = new Set(likedPosts);
                alreadyLiked ? updatedSet.delete(postId) : updatedSet.add(postId);
                setLikedPosts(updatedSet);
            }
        } catch (error) {
            console.error(error)
            setErrorMsg("failed to toggle like")
        } 
    };

    const displayComments = async (postId: string) => {
        setErrorMsg("");
        try {
            const res = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`, {
                credentials: "include"
            });
            const commets = await res.json();
        } catch (error) {
            console.error(error);
            setErrorMsg("failed to load comments");
        }
    }

    if (loading) return <div className="p-8 text-center text-lg">Loading posts...</div>;

    return (
        <div className="min-h-screen text-white px-4 py-6">
        
            {/* Header */}
            <header className="flex items-center justify-between mb-10">
                <div className="w-12 h-12 rounded-full bg-white/10" />
                <h1 className="text-xl sm:text-2xl font-bold text-center flex-1 -ml-12">
                    Find All Blogs
                </h1>
                <HeaderProfile />
            </header>
        
            {/* Feed Heading */}
            <h2 className="text-3xl font-bold mb-6 text-white">Your Feed</h2>

            {/* --- Error Message --- */}
            {errorMsg && (
                <p className="mb-4 p-1 rounded-sm text-center bg-red-800">{errorMsg}</p>
            )}

            {/* spinner */}
            {loading && <span className="animate-spin mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full"></span>}
            {/* Posts */}
            <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                {posts.map( (post:any) => (
                    <div
                        key={post.id}
                        className="bg-[#1a1a1a] p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                    >
                        <div className='flex justify-between'>
                            <h2 className="text-xl font-semibold mb-2 ">{post.title}</h2>
                            <span className='text-sm text-gray-500 mb-2'>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                        {post.content}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex gap-4">
                                <Button
                                onClick={() => toggleLike(post.id)}
                                className={`${
                                    likedPosts.has(post.id)
                                    ? "text-red-500"
                                    : "text-gray-400"
                                } hover:text-red-300`}
                                >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={likedPosts.has(post.id) ? "currentColor" : "none"}
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                                    />
                                </svg>
                                {post._count.likes}
                                </Button>

                                <Button
                                    onClick={() => {displayComments(post.id)}}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.49 0-2.89-.326-4.083-.9L3 20l1.23-3.692C3.451 14.743 3 13.405 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                    {post._count.comments}
                                </Button>
                            </div>
                        </div>
                        <Comments/>
                    </div>
                ))}
            </div>
        </div>
    );  
}

export default Dashboard