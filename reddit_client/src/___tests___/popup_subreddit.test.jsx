import { render, screen, fireEvent } from "@testing-library/react";
import PopupSubreddit from "../componentes/popup_subreddit";

describe("PopupSubreddit", () => {
  it("renderiza o dialog quando aberto", () => {
    render(
      <PopupSubreddit
        aberto={true}
        onConfirmar={() => {}}
        onClose={() => {}}
      />
    );

    expect(screen.getByText("Adicionar Subreddit")).toBeInTheDocument();
    expect(screen.getByLabelText("Subreddit")).toBeInTheDocument();
  });

  it("não renderiza o dialog quando fechado", () => {
    render(
      <PopupSubreddit
        aberto={false}
        onConfirmar={() => {}}
        onClose={() => {}}
      />
    );

    expect(screen.queryByText("Adicionar Subreddit")).not.toBeInTheDocument();
  });

  it("atualiza o valor do input ao digitar", () => {
    render(
      <PopupSubreddit
        aberto={true}
        onConfirmar={() => {}}
        onClose={() => {}}
      />
    );

    const input = screen.getByLabelText("Subreddit");
    fireEvent.change(input, { target: { value: "react" } });

    expect(input.value).toBe("react");
  });

  it("chama onConfirmar com o valor ao clicar Adicionar", () => {
    const onConfirmar = vi.fn();
    render(
      <PopupSubreddit
        aberto={true}
        onConfirmar={onConfirmar}
        onClose={() => {}}
      />
    );

    const input = screen.getByLabelText("Subreddit");
    fireEvent.change(input, { target: { value: "javascript" } });
    fireEvent.click(screen.getByText("Adicionar"));

    expect(onConfirmar).toHaveBeenCalledWith("javascript");
  });

  it("limpa o input após confirmar", () => {
    render(
      <PopupSubreddit
        aberto={true}
        onConfirmar={() => {}}
        onClose={() => {}}
      />
    );

    const input = screen.getByLabelText("Subreddit");
    fireEvent.change(input, { target: { value: "react" } });
    fireEvent.click(screen.getByText("Adicionar"));

    expect(input.value).toBe("");
  });

  it("não chama onConfirmar se o input está vazio", () => {
    const onConfirmar = vi.fn();
    render(
      <PopupSubreddit
        aberto={true}
        onConfirmar={onConfirmar}
        onClose={() => {}}
      />
    );

    fireEvent.click(screen.getByText("Adicionar"));

    expect(onConfirmar).not.toHaveBeenCalled();
  });

  it("não chama onConfirmar se o input tem apenas espaços", () => {
    const onConfirmar = vi.fn();
    render(
      <PopupSubreddit
        aberto={true}
        onConfirmar={onConfirmar}
        onClose={() => {}}
      />
    );

    const input = screen.getByLabelText("Subreddit");
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(screen.getByText("Adicionar"));

    expect(onConfirmar).not.toHaveBeenCalled();
  });

  it("faz trim do valor antes de confirmar", () => {
    const onConfirmar = vi.fn();
    render(
      <PopupSubreddit
        aberto={true}
        onConfirmar={onConfirmar}
        onClose={() => {}}
      />
    );

    const input = screen.getByLabelText("Subreddit");
    fireEvent.change(input, { target: { value: "  react  " } });
    fireEvent.click(screen.getByText("Adicionar"));

    expect(onConfirmar).toHaveBeenCalledWith("react");
  });

  it("chama onConfirmar ao pressionar Enter", () => {
    const onConfirmar = vi.fn();
    render(
      <PopupSubreddit
        aberto={true}
        onConfirmar={onConfirmar}
        onClose={() => {}}
      />
    );

    const input = screen.getByLabelText("Subreddit");
    fireEvent.change(input, { target: { value: "typescript" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onConfirmar).toHaveBeenCalledWith("typescript");
  });

  it("chama onClose ao clicar Cancelar", () => {
    const onClose = vi.fn();
    render(
      <PopupSubreddit aberto={true} onConfirmar={() => {}} onClose={onClose} />
    );

    fireEvent.click(screen.getByText("Cancelar"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("limpa o input ao cancelar", () => {
    render(
      <PopupSubreddit
        aberto={true}
        onConfirmar={() => {}}
        onClose={() => {}}
      />
    );

    const input = screen.getByLabelText("Subreddit");
    fireEvent.change(input, { target: { value: "react" } });
    fireEvent.click(screen.getByText("Cancelar"));

    expect(input.value).toBe("");
  });
});
