import { useState, useEffect } from "react"; // Add useState
import { Text, Grid, Center, Button, Group, ActionIcon } from "@mantine/core";
import AudioPlayer from "react-h5-audio-player";
import { Bookmark } from "tabler-icons-react";
import Header from "./header";

export default function Player(props) {
  const { url, name, player, setBookmarks } = props;
  const [playbackSpeed, setPlaybackSpeedState] = useState(1); // State for playback speed

  const styles = {
    bookmark: {
      root: {
        color: "#282828",
        background: "#868686",
        marginRight: "15px",
        float: "right",
      },
    },
    action: {
      root: {
        color: "#282828",
        background: "#868686",
      },
    },
    playback: {
      root: {
        marginLeft: "15px",
        float: "left",
      },
    },
  };

  useEffect(() => {
    const localStorageBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    if (localStorageBookmarks) setBookmarks([...localStorageBookmarks]);

    const handleBeforeUnload = () => {
      if (player.current && player.current.audio.current) {
        addBookmark();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handleBeforeUnload); // Fallback for mobile browsers

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handleBeforeUnload);
    };
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

  function setPlaybackSpeed(speed) {
    if (player.current && player.current.audio.current) {
      player.current.audio.current.playbackRate = speed;
      setPlaybackSpeedState(speed); // Update state
    }
  }

  function addBookmark() {
    if (!player.current || !player.current.audio.current) {
      console.error("Player or audio element is not available.");
      return;
    }

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const time = formatTime(player.current.audio.current.currentTime);
    const utime = player.current.audio.current.currentTime;
    const note = "add a note here...";

    const existingBookmark = bookmarks.find((bookmark) => bookmark.utime === utime);

    if (!existingBookmark) {
      const bookmark = { utime: utime, time: time, name: name, note: note };
      bookmarks.push(bookmark);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      setBookmarks(bookmarks);
    }
  }

  function renderFooter() {
    return (
      <>
        <Group mb={30} styles={styles.playback}>
          {[1, 1.25, 1.5, 1.75, 2].map((speed) => (
            <ActionIcon
              key={speed}
              onClick={() => setPlaybackSpeed(speed)}
              styles={{
                root: {
                  color: "#282828",
                  background: playbackSpeed === speed ? "#ffffff" : "#868686", // White background for active speed
                },
              }}
              variant="filled"
              radius="lg"
              size={speed === 1 || speed === 2 ? "md" : "lg"}
              aria-label={`Set playback speed to ${speed}x`}
            >
              {speed}x
            </ActionIcon>
          ))}
        </Group>

        <Button
          rightIcon={<Bookmark size={20} />}
          styles={styles.bookmark}
          onClick={addBookmark}
          variant="filled"
          radius="lg"
          size="xs"
          mt={2}
          aria-label="Add bookmark"
        >
          Add
        </Button>
      </>
    );
  }

  return (
    <Grid my={20}>
      <AudioPlayer
        header={<Header name={name} />}
        progressJumpStep={30000}
        footer={renderFooter()}
        ref={player}
        src={url}
      />
    </Grid>
  );
}
