import { Text, Button, Grid, Center } from "@mantine/core";
import AudioPlayer from "react-h5-audio-player";
import { Bookmark } from "tabler-icons-react";
import { useEffect } from "react";

import "react-h5-audio-player/lib/styles.css";

export default function Player({ url, name, player, setBookmarks, gradient }) {
  const bookmarkStyles = { root: { color: "black" } };

  useEffect(() => {
    const localStorageBookmarks = JSON.parse(
      localStorage.getItem("bookmarks") || null
    );

    if (localStorageBookmarks) setBookmarks([...localStorageBookmarks]);
  }, []);

  function formatTime(value) {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - hours * 3600) / 60);
    let seconds = sec - hours * 3600 - minutes * 60;

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  function addBookmark() {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const time = formatTime(player.current.audio.current.currentTime);
    const utime = player.current.audio.current.currentTime;
    const note = "Add a note here.";

    const bookmark = { utime: utime, time: time, name: name, note: note };

    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setBookmarks(bookmarks);
  }

  function renderHeader(name) {
    return (
      <Center>
        <Text size="xl" inline>
          {name}
        </Text>
      </Center>
    );
  }

  function renderFooter() {
    return (
      <Center>
        <Button
          leftIcon={<Bookmark size={20} />}
          styles={bookmarkStyles}
          variant="gradient"
          gradient={gradient}
          onClick={addBookmark}
          size="xs"
        >
          Add Bookmark
        </Button>
      </Center>
    );
  }

  return (
    <Grid my={20}>
      <AudioPlayer
        progressJumpStep={30000}
        header={renderHeader(name)}
        footer={renderFooter()}
        ref={player}
        src={url}
      />
    </Grid>
  );
}
