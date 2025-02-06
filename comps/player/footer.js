import { Button, Group, ActionIcon } from "@mantine/core";
import { useEffect } from "react";
import {
  Bookmark,
  Multiplier05x,
  Multiplier15x,
  Multiplier1x,
  Multiplier2x,
} from "tabler-icons-react";

export default function Player({ name, player, setBookmarks }) {
  const styles = {
    addButton: {
      root: {
        color: "#282828",
        background: "#868686",
        marginRight: "20px",
        float: "right",
      },
    },
    playbackButton: {
      root: {
        color: "#282828",
        background: "#868686",
      },
    },
    playbackGroup: {
      root: {
        marginLeft: "20px",
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
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
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
    player.current.audio.current.playbackRate = speed;
  }

  function addBookmark() {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

    if (!player.current || !player.current.audio.current) return;

    const time = formatTime(player.current.audio.current.currentTime);
    const utime = player.current.audio.current.currentTime;
    const note = "Auto-saved on close";

    const bookmark = { utime: utime, time: time, name: name, note: note };

    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setBookmarks(bookmarks);
  }

  return (
    <>
      <Group mb={30} styles={styles.playbackGroup}>
        <ActionIcon
          onClick={() => setPlaybackSpeed(0.5)}
          styles={styles.playbackButton}
          variant="filled"
          radius="lg"
          size="md"
        >
          <Multiplier05x size={20} />
        </ActionIcon>

        <ActionIcon
          onClick={() => setPlaybackSpeed(1)}
          styles={styles.playbackButton}
          variant="filled"
          radius="lg"
          size="md"
        >
          <Multiplier1x size={20} />
        </ActionIcon>

        <ActionIcon
          onClick={() => setPlaybackSpeed(1.5)}
          styles={styles.playbackButton}
          variant="filled"
          radius="lg"
          size="md"
        >
          <Multiplier15x size={20} />
        </ActionIcon>

        <ActionIcon
          onClick={() => setPlaybackSpeed(2)}
          styles={styles.playbackButton}
          variant="filled"
          radius="lg"
          size="md"
        >
          <Multiplier2x size={20} />
        </ActionIcon>
      </Group>

      <Button
        rightIcon={<Bookmark size={20} />}
        styles={styles.addButton}
        onClick={addBookmark}
        variant="filled"
        radius="lg"
        size="xs"
        mt={2}
      >
        Add
      </Button>
    </>
  );
}
