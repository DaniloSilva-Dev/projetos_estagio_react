import { Box, Link, ListItem } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Typography from "@mui/material/Typography";

export default function ItemSubreddit({ subreddit }) {
  const url = `https://www.reddit.com${subreddit.permalink}`;

  return (
    <ListItem
      sx={{
        display: "flex",
        alignItems: "center",
        px: 0,
        py: 1,
        borderBottom: "1px solid #e0e0e0",
        "&:last-child": {
          borderBottom: "none",
          mb: 0,
          pb: 0,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 50,
          mr: 2,
        }}
      >
        <KeyboardArrowUpIcon fontSize="medium" />
        <Typography variant="body2" fontWeight="bold">
          {subreddit.ups}
        </Typography>
      </Box>

      <Typography variant="body1">
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          {subreddit.title}
        </Link>
      </Typography>
    </ListItem>
  );
}
