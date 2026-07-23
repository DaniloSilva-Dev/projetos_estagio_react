import { renderHook, act } from "@testing-library/react";
import useGerenciadorSubreddit from "../hooks/use_gerenciador_subreddit";

describe("useGerenciadorSubreddit", () => {
  it("inicia com lista vazia e aviso fechado", () => {
    const { result } = renderHook(() => useGerenciadorSubreddit());

    expect(result.current.subredditsAtivos).toEqual([]);
    expect(result.current.aviso).toEqual({ aberto: false, mensagem: "" });
  });

  it("adiciona um subreddit com sucesso", () => {
    const { result } = renderHook(() => useGerenciadorSubreddit());

    act(() => {
      result.current.lidarConfirmar("react");
    });

    expect(result.current.subredditsAtivos).toEqual(["react"]);
  });

  it("adiciona até 3 subreddits", () => {
    const { result } = renderHook(() => useGerenciadorSubreddit());

    act(() => {
      result.current.lidarConfirmar("react");
    });
    act(() => {
      result.current.lidarConfirmar("javascript");
    });
    act(() => {
      result.current.lidarConfirmar("typescript");
    });

    expect(result.current.subredditsAtivos).toEqual([
      "react",
      "javascript",
      "typescript",
    ]);
  });

  it("exibe aviso ao tentar adicionar mais de 3 subreddits", () => {
    const { result } = renderHook(() => useGerenciadorSubreddit());

    act(() => {
      result.current.lidarConfirmar("react");
    });
    act(() => {
      result.current.lidarConfirmar("javascript");
    });
    act(() => {
      result.current.lidarConfirmar("typescript");
    });
    act(() => {
      result.current.lidarConfirmar("nodejs");
    });

    expect(result.current.subredditsAtivos).toHaveLength(3);
    expect(result.current.aviso).toEqual({
      aberto: true,
      mensagem: "Você só pode adicionar até 3 subreddits.",
    });
  });

  it("retorna false ao tentar adicionar mais de 3", () => {
    const { result } = renderHook(() => useGerenciadorSubreddit());

    act(() => {
      result.current.lidarConfirmar("a");
    });
    act(() => {
      result.current.lidarConfirmar("b");
    });
    act(() => {
      result.current.lidarConfirmar("c");
    });

    let retorno;
    act(() => {
      retorno = result.current.lidarConfirmar("d");
    });

    expect(retorno).toBe(false);
  });

  it("exibe aviso ao tentar adicionar subreddit duplicado", () => {
    const { result } = renderHook(() => useGerenciadorSubreddit());

    act(() => {
      result.current.lidarConfirmar("react");
    });
    act(() => {
      result.current.lidarConfirmar("react");
    });

    expect(result.current.subredditsAtivos).toEqual(["react"]);
    expect(result.current.aviso).toEqual({
      aberto: true,
      mensagem: "Este subreddit já foi adicionado.",
    });
  });

  it("remove um subreddit", () => {
    const { result } = renderHook(() => useGerenciadorSubreddit());

    act(() => {
      result.current.lidarConfirmar("react");
    });
    act(() => {
      result.current.lidarConfirmar("javascript");
    });
    act(() => {
      result.current.lidarRemover("react");
    });

    expect(result.current.subredditsAtivos).toEqual(["javascript"]);
  });

  it("fecha o aviso com fecharAviso", () => {
    const { result } = renderHook(() => useGerenciadorSubreddit());

    act(() => {
      result.current.lidarConfirmar("react");
    });
    act(() => {
      result.current.lidarConfirmar("react");
    });

    expect(result.current.aviso.aberto).toBe(true);

    act(() => {
      result.current.fecharAviso();
    });

    expect(result.current.aviso).toEqual({ aberto: false, mensagem: "" });
  });

  it("não altera a lista ao remover subreddit inexistente", () => {
    const { result } = renderHook(() => useGerenciadorSubreddit());

    act(() => {
      result.current.lidarConfirmar("react");
    });
    act(() => {
      result.current.lidarRemover("inexistente");
    });

    expect(result.current.subredditsAtivos).toEqual(["react"]);
  });
});
