import { Text, Grid, Center, Button, Group, ActionIcon } from "@mantine/core";
import AudioPlayer from "react-h5-audio-player";
import { Bookmark } from "tabler-icons-react";
import { useEffect } from "react";
import Header from "./header";

export default function Player(props) {
  const { url, name, player, setBookmarks } = props;

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
          <ActionIcon
            onClick={() => setPlaybackSpeed(1)}
            styles={styles.action}
            variant="filled"
            radius="lg"
            size="md"
            aria-label="Set playback speed to 1x"
          >
            1x
          </ActionIcon>

          <ActionIcon
            onClick={() => setPlaybackSpeed(1.25)}
            styles={styles.action}
            variant="filled"
            radius="lg"
            size="lg"
            aria-label="Set playback speed to 1.25x"
          >
            1.25x
          </ActionIcon>

          <ActionIcon
            onClick={() => setPlaybackSpeed(1.5)}
            styles={styles.action}
            variant="filled"
            radius="lg"
            size="lg"
            aria-label="Set playback speed to 1.5x"
          >
            1.5x
          </ActionIcon>

          <ActionIcon
            onClick={() => setPlaybackSpeed(1.75)}
            styles={styles.action}
            variant="filled"
            radius="lg"
            size="lg"
            aria-label="Set playback speed to 1.75x"
          >
            1.75x
          </ActionIcon>

          <ActionIcon
            onClick={() => setPlaybackSpeed(2)}
            styles={styles.action}
            variant="filled"
            radius="lg"
            size="md"
            aria-label="Set playback speed to 2x"
          >
            2x
          </ActionIcon>
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
