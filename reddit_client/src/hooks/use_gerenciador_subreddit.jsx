import { useState } from "react";
export default function useGerenciadorSubreddit() {
  const [subredditsAtivos, setSubredditsAtivos] = useState([]);
  const [aviso, setAviso] = useState({ aberto: false, mensagem: "" });
  const fecharAviso = () => setAviso({ aberto: false, mensagem: "" });

  const lidarConfirmar = (subreddit) => {
    if (subredditsAtivos.length >= 3) {
      setAviso({
        aberto: true,
        mensagem: "Você só pode adicionar até 3 subreddits.",
      });
      return false;
    }
    if (!subredditsAtivos.includes(subreddit)) {
      setSubredditsAtivos([...subredditsAtivos, subreddit]);
    } else {
      setAviso({ aberto: true, mensagem: "Este subreddit já foi adicionado." });
    }
  };
  const lidarRemover = (subreddit) => {
    setSubredditsAtivos(subredditsAtivos.filter((sub) => sub !== subreddit));
  };
  return { subredditsAtivos, lidarConfirmar, lidarRemover, aviso, fecharAviso };
}
