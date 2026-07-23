import { useState, useEffect, useCallback, useRef } from "react";

export async function fetchSubreddit(subreddit) {
  // const response = await fetch(`/api/reddit/r/${subreddit}.json`, {
  //   headers: {
  //     'Accept': 'application/json',
  //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
  //   }
  // });

  // if (!response.ok) {
  //   throw new Error(`Erro ao buscar subreddit: ${response.statusText}`);
  // }
  // const data = await response.json();
  // return data;

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    kind: "Listing",
    data: {
      children: [
        {
          kind: "t3",
          data: {
            id: (Date.now() - 1).toString(),
            title: `Post ${Math.floor(Math.random() * 100)}`,
            ups: Math.floor(Math.random() * 1000),
            permalink: "/r/test/comments/1/post_1/",
          },
        },
        {
          kind: "t3",
          data: {
            id: Date.now().toString(),
            title: `Post ${Math.floor(Math.random() * 100)}`,
            ups: Math.floor(Math.random() * 1000),
            permalink: "/r/test/comments/2/post_2/",
          },
        },
        {
          kind: "t3",
          data: {
            id: Date.now().toString(),
            title: `Post ${Math.floor(Math.random() * 100)}`,
            ups: Math.floor(Math.random() * 1000),
            permalink: "/r/test/comments/2/post_2/",
          },
        },
        {
          kind: "t3",
          data: {
            id: Date.now().toString(),
            title: `Post ${Math.floor(Math.random() * 100)}`,
            ups: Math.floor(Math.random() * 1000),
            permalink: "/r/test/comments/2/post_2/",
          },
        },
        {
          kind: "t3",
          data: {
            id: Date.now().toString(),
            title: `Post ${Math.floor(Math.random() * 100)}`,
            ups: Math.floor(Math.random() * 1000),
            permalink: "/r/test/comments/2/post_2/",
          },
        },
        {
          kind: "t3",
          data: {
            id: Date.now().toString(),
            title: `Post ${Math.floor(Math.random() * 100)}`,
            ups: Math.floor(Math.random() * 1000),
            permalink: "/r/test/comments/2/post_2/",
          },
        },
      ],
    },
  };
}

export default function useSubreddit(subreddit) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isMontado = useRef(true);

  useEffect(() => {
    isMontado.current = true;
    return () => {
      isMontado.current = false;
    };
  }, []);

  const recarregar = useCallback(() => {
    if (!subreddit) return;
    setLoading(true);
    fetchSubreddit(subreddit)
      .then((data) => {
        const posts = data.data.children.map((child) => child.data);
        if (isMontado.current) setPosts(posts);
      })
      .catch((erro) => {
        if (isMontado.current) setError(erro);
      })
      .finally(() => {
        if (isMontado.current) setLoading(false);
      });
  }, [subreddit]);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  return { posts, loading, error, recarregar };
}
