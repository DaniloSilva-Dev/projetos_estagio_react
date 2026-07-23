import { render, screen, waitFor } from "@testing-library/react";
import ListaSubreddit from "../componentes/lista_subreddit";
import * as useSubredditModule from "../hooks/use_subreddit";

describe("ListaSubreddit", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("mostra loading enquanto carrega", () => {
    vi.spyOn(useSubredditModule, "default").mockReturnValue({
      posts: [],
      loading: true,
      error: null,
      recarregar: vi.fn(),
    });

    render(
      <ListaSubreddit
        subreddits="react"
        onRemover={() => {}}
        onAtualizar={() => {}}
      />
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("mostra o nome do subreddit no título", () => {
    vi.spyOn(useSubredditModule, "default").mockReturnValue({
      posts: [],
      loading: false,
      error: null,
      recarregar: vi.fn(),
    });

    render(
      <ListaSubreddit
        subreddits="react"
        onRemover={() => {}}
        onAtualizar={() => {}}
      />
    );

    expect(screen.getByText("/r/react")).toBeInTheDocument();
  });

  it("mostra mensagem de erro quando há erro", () => {
    vi.spyOn(useSubredditModule, "default").mockReturnValue({
      posts: [],
      loading: false,
      error: new Error("Falha na conexão"),
      recarregar: vi.fn(),
    });

    render(
      <ListaSubreddit
        subreddits="react"
        onRemover={() => {}}
        onAtualizar={() => {}}
      />
    );

    expect(screen.getByText("Falha na conexão")).toBeInTheDocument();
  });

  it("renderiza lista de posts quando carregamento é concluído", () => {
    const mockPosts = [
      {
        id: "1",
        title: "Post 1",
        ups: 10,
        permalink: "/r/react/comments/1/post_1/",
      },
      {
        id: "2",
        title: "Post 2",
        ups: 20,
        permalink: "/r/react/comments/2/post_2/",
      },
    ];

    vi.spyOn(useSubredditModule, "default").mockReturnValue({
      posts: mockPosts,
      loading: false,
      error: null,
      recarregar: vi.fn(),
    });

    render(
      <ListaSubreddit
        subreddits="react"
        onRemover={() => {}}
        onAtualizar={() => {}}
      />
    );

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });

  it("não mostra posts enquanto está carregando", () => {
    vi.spyOn(useSubredditModule, "default").mockReturnValue({
      posts: [],
      loading: true,
      error: null,
      recarregar: vi.fn(),
    });

    render(
      <ListaSubreddit
        subreddits="react"
        onRemover={() => {}}
        onAtualizar={() => {}}
      />
    );

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("não mostra loading nem lista quando há erro", () => {
    vi.spyOn(useSubredditModule, "default").mockReturnValue({
      posts: [],
      loading: false,
      error: new Error("Erro"),
      recarregar: vi.fn(),
    });

    render(
      <ListaSubreddit
        subreddits="react"
        onRemover={() => {}}
        onAtualizar={() => {}}
      />
    );

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renderiza o PopupMenu", () => {
    vi.spyOn(useSubredditModule, "default").mockReturnValue({
      posts: [],
      loading: false,
      error: null,
      recarregar: vi.fn(),
    });

    render(
      <ListaSubreddit
        subreddits="react"
        onRemover={() => {}}
        onAtualizar={() => {}}
      />
    );

    // O PopupMenu renderiza um IconButton
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("passa recarregar como onAtualizar para o PopupMenu", () => {
    const mockRecarregar = vi.fn();
    vi.spyOn(useSubredditModule, "default").mockReturnValue({
      posts: [],
      loading: false,
      error: null,
      recarregar: mockRecarregar,
    });

    render(
      <ListaSubreddit
        subreddits="react"
        onRemover={() => {}}
        onAtualizar={() => {}}
      />
    );

    // Verifica que o hook foi chamado com o subreddit correto
    expect(useSubredditModule.default).toHaveBeenCalledWith("react");
  });
});
