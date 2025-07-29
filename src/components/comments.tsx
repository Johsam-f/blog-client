import { useEffect, useState } from "react";
import Button from "./ui/button";
import { FaUserCircle } from "react-icons/fa";

type Comment = {
    id: string;
    content: string;
    author: {
      name: string;
    };
    createdAt: string;
    updatedAt: string;
    authorId: string;
    postId: string;
    parentId: string | null;
};
  

type CommentProps = {
    API_BASE_URL: string;
    postId: string;
    onNewComment: () => void;
}

const Comments: React.FC<CommentProps> = ({API_BASE_URL, postId, onNewComment}) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [content, setContent] = useState("");

    const fetchComments = async (postId: string) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`, {
                credentials: "include"
            });
            const fetchedComments = await res.json();
            setComments(fetchedComments);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
       fetchComments(postId);
    }, [postId]);

    const handleAddComment = async (postId: string) => {
        if (!content.trim()) return;
        const headers = { "Content-Type": "application/json" };
        const payload = JSON.stringify({ content });

        try {
            await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`, {
                method: 'POST',
                headers,
                body: payload,
                credentials: "include"
            });
            fetchComments(postId)
            onNewComment();
        } catch (error) {
            console.error(error);
        }
        setContent("");
    };

    return(
        <section className="flex ml-4 bg-[#303030] rounded-r-2xl">
            <div className="w-1 rounded-2xl bg-red-800 self-stretch"></div>
            <div className="flex-1">
                <div className="pb-1 rounded-2xl m-1 bg-[#272626] ml-1 flex flex-col w-[98%]">
                    <p className="text-sm text-gray-400 ml-2 mt-2">
                        {content.length} / 200
                    </p>
                    <textarea
                        name="comment"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="w-full p-3 pb-0 rounded-lg text-white resize-none focus:outline-none"
                        placeholder="Add a comment..."
                        rows={3}
                        maxLength={200}
                    />
                    <Button
                        onClick={()=>{handleAddComment(postId)}}
                        variant="send"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                        >
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    </Button>
                </div>
                {comments.map((comment) => (
                    <section key={comment.id} className="mb-4 mx-2 p-3 bg-[#1b1b1b] rounded-lg text-white">
                        <div className="text-sm font-semibold text-gray-300">
                                {<FaUserCircle className="w-5 h-5 text-white/60 mr-1 inline" />} {comment.author.name}
                            </div>
                            <p className="mt-1 text-gray-300">{comment.content}</p>
                            <div className="text-xs text-gray-500 mt-1">
                            {new Date(comment.createdAt).toLocaleString()}
                        </div>
                    </section>
                ))}
            </div>
        </section>
    )
}

export default Comments;

