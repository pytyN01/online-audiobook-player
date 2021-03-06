import { Text, Card, Grid, ActionIcon, Group, Input } from "@mantine/core";
import { ArrowUpCircle, BookmarkOff, Notebook } from "tabler-icons-react";

export default function Bookmarks(props) {
  const { player, bookmarks, setBookmarks } = props;

  const styles = {
    button: { root: { color: "#282828", background: "#868686" } },
    card: {
      root: {
        color: "white",
        background: "#282828",
        minWidth: "350px",
        paddingTop: "0 !important",
      },
    },
  };

  function removeBookmark(index) {
    var filteredBookmarks = [...bookmarks];

    if (index !== -1) {
      filteredBookmarks.splice(index, 1);

      if (filteredBookmarks.length === 0) {
        setBookmarks(null);
      } else {
        setBookmarks(filteredBookmarks);
      }

      localStorage.setItem("bookmarks", JSON.stringify(filteredBookmarks));
    }
  }

  const updateBookmark = (index, e) => {
    const newBookmarks = [...bookmarks];
    newBookmarks[index].note = e.target.value;
    setBookmarks(newBookmarks);

    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
  };

  function goToBookmark(bookmark) {
    player.current.audio.current.currentTime = bookmark.utime;
  }

  function renderBookmarks(bookmark, index) {
    return (
      <Grid key={index} mb={20}>
        <Card styles={styles.card}>
          <Group>
            <Text weight={700} size="xl">
              {bookmark.time.replace(/^0(?:0:0?)?/, "")}
            </Text>

            <ActionIcon
              onClick={() => goToBookmark(bookmark)}
              styles={styles.button}
              color=""
              variant="filled"
              radius="lg"
              size="lg"
            >
              <ArrowUpCircle size={20} />
            </ActionIcon>

            <ActionIcon
              onClick={() => removeBookmark(index)}
              styles={styles.button}
              variant="filled"
              radius="lg"
              size="lg"
            >
              <BookmarkOff size={20} />
            </ActionIcon>
          </Group>

          <Input
            onChange={(e) => updateBookmark(index, e)}
            onKeyUp={(e) => {
              if (e.keyCode === 13) e.target.blur();
            }}
            icon={<Notebook color="#868686" size={26} />}
            value={bookmark.note}
            mt={10}
          />
        </Card>
      </Grid>
    );
  }

  return (
    <>{bookmarks.map((bookmark, index) => renderBookmarks(bookmark, index))}</>
  );
}
