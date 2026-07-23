import { renderHook, waitFor, act } from "@testing-library/react";
import useSubreddit, { fetchSubreddit } from "../hooks/use_subreddit";

describe("fetchSubreddit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("retorna dados com estrutura correta", async () => {
    const promise = fetchSubreddit("react");
    vi.advanceTimersByTime(1000);
    const data = await promise;

    expect(data).toHaveProperty("kind", "Listing");
    expect(data.data).toHaveProperty("children");
    expect(data.data.children.length).toBeGreaterThan(0);
  });

  it("cada post tem id, title, ups e permalink", async () => {
    const promise = fetchSubreddit("javascript");
    vi.advanceTimersByTime(1000);
    const data = await promise;
    const post = data.data.children[0].data;

    expect(post).toHaveProperty("id");
    expect(post).toHaveProperty("title");
    expect(post).toHaveProperty("ups");
    expect(post).toHaveProperty("permalink");
  });
});

describe("useSubreddit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("inicia com loading true quando subreddit é fornecido", () => {
    const { result } = renderHook(() => useSubreddit("react"));

    expect(result.current.loading).toBe(true);
    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("carrega posts com sucesso", async () => {
    const { result } = renderHook(() => useSubreddit("react"));

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.posts.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  it("cada post mapeado tem id, title, ups e permalink", async () => {
    const { result } = renderHook(() => useSubreddit("javascript"));

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.loading).toBe(false);
    const post = result.current.posts[0];
    expect(post).toHaveProperty("id");
    expect(post).toHaveProperty("title");
    expect(post).toHaveProperty("ups");
    expect(post).toHaveProperty("permalink");
  });

  it("não carrega quando subreddit é vazio", () => {
    const { result } = renderHook(() => useSubreddit(""));

    expect(result.current.loading).toBe(false);
    expect(result.current.posts).toEqual([]);
  });

  it("não carrega quando subreddit é undefined", () => {
    const { result } = renderHook(() => useSubreddit(undefined));

    expect(result.current.loading).toBe(false);
    expect(result.current.posts).toEqual([]);
  });

  it("recarrega os posts ao chamar recarregar", async () => {
    const { result } = renderHook(() => useSubreddit("react"));

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.loading).toBe(false);

    act(() => {
      result.current.recarregar();
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.posts.length).toBeGreaterThan(0);
  });


  it("não atualiza estado após desmontagem do componente", async () => {
    const { result, unmount } = renderHook(() => useSubreddit("react"));

    unmount();

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    // Não deve lançar erro ao desmontar durante carregamento
  });

  it("expõe a função recarregar", () => {
    const { result } = renderHook(() => useSubreddit("react"));

    expect(typeof result.current.recarregar).toBe("function");
  });
});
