import "react-h5-audio-player/lib/styles.css";

import AudioPlayer from "react-h5-audio-player";
import styles from "../styles/Home.module.css";

import { useRef, useState, useEffect } from "react";
import { Group, Text, Button, Grid, Card } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";

export default function Player({ audio }) {
  const [bookmarks, setBookmarks] = useState(null);
  const player = useRef();

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

  function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (secs < 10) {
      secs = "0" + secs;
    }

    return minutes + ":" + secs;
  }

  function addBookmark() {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

    const utime = player.current.audio.current.currentTime;
    const time = formatTime(player.current.audio.current.currentTime);
    const name = audio.name;

    const bookmark = { utime: utime, time: time, name: name };

    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setBookmarks(bookmarks);
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
    <>
      <Text size="xl" inline>
        {audio.name}
      </Text>

      <Grid my={20}>
        <AudioPlayer progressJumpStep={30000} src={audio.url} ref={player} />
      </Grid>

      <Button onClick={addBookmark} size="xs">
        Add Bookmark
      </Button>

      {bookmarks &&
        bookmarks.map((bookmark, index) => renderBookmarks(bookmark, index))}
    </>
  );
}
