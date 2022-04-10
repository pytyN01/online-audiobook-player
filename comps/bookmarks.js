import { ArrowUpCircle, BookmarkOff } from "tabler-icons-react";
import { Text, Button, Card } from "@mantine/core";

export default function Bookmarks(props) {
  const { player, bookmarks, setBookmarks, gradient } = props;
  const button = { root: { color: "black" } };
  const card = {
    root: {
      color: "white",
      background: "#282828",
      minWidth: "350px",
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

  function goToBookmark(bookmark) {
    player.current.audio.current.currentTime = bookmark.utime;
  }

  function renderBookmarks(bookmark, index) {
    return (
      <Card styles={card} key={index}>
        <Text align="center" size="xl">
          {`${bookmark.name} Bookmark @ ${bookmark.time}`}
        </Text>

        {/* <Text align="center" size="sm" mb={20}>
          {`Note: ${bookmark.note}`}
        </Text> */}

        <Button
          leftIcon={<ArrowUpCircle size={20} />}
          onClick={() => goToBookmark(bookmark)}
          gradient={gradient}
          variant="gradient"
          styles={button}
          size="xs"
        >
          Go to Bookmark
        </Button>
        <Button
          onClick={() => removeBookmark(index)}
          leftIcon={<BookmarkOff size={20} />}
          gradient={gradient}
          variant="gradient"
          styles={button}
          size="xs"
          ml={10}
        >
          Remove Bookmark
        </Button>
      </Card>
    );
  }

  return (
    <>{bookmarks.map((bookmark, index) => renderBookmarks(bookmark, index))}</>
  );
}
