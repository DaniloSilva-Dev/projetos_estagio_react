import MoreVertIcon from "@mui/icons-material/MoreVert";
import List from "@mui/material/List";
import useSubreddit from "../hooks/use_subreddit";
import ItemSubreddit from "./item_subreddit";
import PopupMenu from "./popup_menu";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";

export default function ListaSubreddit({ subreddits, onRemover, onAtualizar }) {
  const { posts, loading, error, recarregar } = useSubreddit(subreddits);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mx: 2,
        width: 300,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">/r/{subreddits}</Typography>
        <PopupMenu onRemover={onRemover} onAtualizar={recarregar} />
      </Box>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Typography color="error">{error.message}</Typography>}

      {!loading && !error && (
        <List>
          {posts.map((post) => (
            <ItemSubreddit key={post.id} subreddit={post} />
          ))}
        </List>
      )}
    </Box>
  );
}
