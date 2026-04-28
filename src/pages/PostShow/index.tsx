import { useParams } from "react-router-dom";
import { fetchPostById, type Post } from "../../api/posts";
import { useEffect, useState } from "react";

const formatDate = (iso: string) => {
  if (!iso) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
};

export const PostShow = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadPost = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await fetchPostById(Number(id));
        if (!ignore) setPost(data.post);
      } catch (e) {
        if (!ignore) {
          const message =
            e instanceof Error ? e.message : "エラーが発生しました";
          setError(message);
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    loadPost();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (isLoading) return <p className="px-4 py-10">読み込み中...</p>;
  if (error) return <p className="px-4 py-10 text-red-600">{error}</p>;
  if (!post)
    return <p className="px-4 py-10 text-gray-800">記事が見つかりません</p>;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-gray-800">
      <article>
        <img src={post.thumbnailUrl} alt={post.title} className="mb-4 w-full" />

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <time className="text-sm font-medium text-gray-500">
            {formatDate(post.createdAt)}
          </time>

          <div className="flex gap-2">
            {post.categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <h1 className="mb-6 font-bold text-black md:text-3xl">
          <div dangerouslySetInnerHTML={{ __html: post.title }}></div>
        </h1>

        <div
          className="leading-relaxed text-gray-600"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
};
