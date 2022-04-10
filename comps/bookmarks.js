import { ArrowUpCircle, BookmarkOff } from "tabler-icons-react";
import { Text, Button, Card } from "@mantine/core";

export default function Bookmarks({
  player,
  bookmarks,
  setBookmarks,
  gradient,
}) {
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
      <Card
        styles={{
          root: {
            color: "white",
            background: "#282828",
            minWidth: "350px",
          },
        }}
        key={index}
      >
        <Text align="center" size="xl">
          {`${bookmark.name} Bookmark @ ${bookmark.time}`}
        </Text>

        {/* <Text align="center" size="sm" mb={20}>
          {`Note: ${bookmark.note}`}
        </Text> */}

        <Button
          leftIcon={<ArrowUpCircle size={20} />}
          styles={{ root: { color: "black" } }}
          variant="gradient"
          gradient={gradient}
          onClick={() => goToBookmark(bookmark)}
          size="xs"
        >
          Go to Bookmark
        </Button>
        <Button
          leftIcon={<BookmarkOff size={20} />}
          styles={{ root: { color: "black" } }}
          variant="gradient"
          gradient={gradient}
          ml={10}
          onClick={() => removeBookmark(index)}
          size="xs"
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
