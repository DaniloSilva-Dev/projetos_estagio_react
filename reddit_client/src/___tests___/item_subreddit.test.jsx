import { render, screen } from "@testing-library/react";
import ItemSubreddit from "../componentes/item_subreddit";

describe("ItemSubreddit", () => {
  const mockPost = {
    id: "123",
    title: "Post de Teste",
    ups: 42,
    permalink: "/r/react/comments/abc/post_de_teste/",
  };

  it("renderiza o título do post", () => {
    render(<ItemSubreddit subreddit={mockPost} />);

    expect(screen.getByText("Post de Teste")).toBeInTheDocument();
  });

  it("renderiza a quantidade de upvotes", () => {
    render(<ItemSubreddit subreddit={mockPost} />);

    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renderiza o link correto para o reddit", () => {
    render(<ItemSubreddit subreddit={mockPost} />);

    const link = screen.getByRole("link", { name: "Post de Teste" });
    expect(link).toHaveAttribute(
      "href",
      "https://www.reddit.com/r/react/comments/abc/post_de_teste/"
    );
  });

  it("link abre em nova aba", () => {
    render(<ItemSubreddit subreddit={mockPost} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renderiza o ícone de upvote", () => {
    render(<ItemSubreddit subreddit={mockPost} />);

    // O ícone KeyboardArrowUp é renderizado como SVG
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renderiza com 0 upvotes", () => {
    const postSemVotos = { ...mockPost, ups: 0 };
    render(<ItemSubreddit subreddit={postSemVotos} />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renderiza com upvotes altos", () => {
    const postPopular = { ...mockPost, ups: 99999 };
    render(<ItemSubreddit subreddit={postPopular} />);

    expect(screen.getByText("99999")).toBeInTheDocument();
  });
});
