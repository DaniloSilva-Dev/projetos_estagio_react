import { render, screen, fireEvent } from "@testing-library/react";
import PopupMenu from "../componentes/popup_menu";

describe("PopupMenu", () => {
  it("renderiza o botão de menu", () => {
    render(<PopupMenu onRemover={() => {}} onAtualizar={() => {}} />);

    const botao = screen.getByRole("button");
    expect(botao).toBeInTheDocument();
  });

  it("menu está fechado inicialmente", () => {
    render(<PopupMenu onRemover={() => {}} onAtualizar={() => {}} />);

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("abre o menu ao clicar no botão", () => {
    render(<PopupMenu onRemover={() => {}} onAtualizar={() => {}} />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByText("Atualizar")).toBeInTheDocument();
    expect(screen.getByText("Remover")).toBeInTheDocument();
  });

  it("chama onRemover e fecha o menu ao clicar em Remover", () => {
    const onRemover = vi.fn();
    render(<PopupMenu onRemover={onRemover} onAtualizar={() => {}} />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Remover"));

    expect(onRemover).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("chama onAtualizar e fecha o menu ao clicar em Atualizar", () => {
    const onAtualizar = vi.fn();
    render(<PopupMenu onRemover={() => {}} onAtualizar={onAtualizar} />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Atualizar"));

    expect(onAtualizar).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("não quebra se onRemover não for fornecido", () => {
    render(<PopupMenu onAtualizar={() => {}} />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Remover"));

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("não quebra se onAtualizar não for fornecido", () => {
    render(<PopupMenu onRemover={() => {}} />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Atualizar"));

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("fecha o menu ao clicar fora (onClose)", () => {
    render(<PopupMenu onRemover={() => {}} onAtualizar={() => {}} />);

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    // Simula fechar pressionando Escape
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
