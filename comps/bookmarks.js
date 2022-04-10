import { useRef, useState, useEffect } from "react";
import { Text, Button, Card } from "@mantine/core";

export default function Home() {
  const [audio] = useState(null);
  const [bookmarks, setBookmarks] = useState(null);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || null);

    if (bookmarks) {
      if (audio) {
        const found = bookmarks.some((el) => el.name === audio.name);
        console.log("found: ", found);
      }
      console.log("bookmarks: ", bookmarks);
      setBookmarks([...bookmarks]);
    }
    if (!bookmarks) {
      localStorage.setItem("bookmarks", []);
      setBookmarks(null);
    }
  }, []);

  const player = useRef();

  function goToBookmark(bookmark) {
    player.current.audio.current.currentTime = bookmark.utime;
  }

  function renderBookmarks(bookmark, index) {
    return (
      <Card key={index} shadow="lg" mt={20} mb={10}>
        <Text align="center" size="xl" mb={20}>
          {`Bookmark @ ${bookmark.time}`}
        </Text>

        <Button onClick={() => goToBookmark(bookmark)} size="xs">
          Go to Bookmark
        </Button>
        <Button ml={10} onClick={() => removeBookmark(index)} size="xs">
          Remove Bookmark
        </Button>
      </Card>
    );
  }

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

  return (
    <>{bookmarks.map((bookmark, index) => renderBookmarks(bookmark, index))}</>
  );
}
