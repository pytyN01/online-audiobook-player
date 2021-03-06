import { Text, Grid, Center, Button, Group, ActionIcon } from "@mantine/core";
import { useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import {
  Bookmark,
  Multiplier05x,
  Multiplier15x,
  Multiplier1x,
  Multiplier2x,
} from "tabler-icons-react";
import Header from "./header";

export default function Player(props) {
  const { url, name, player, setBookmarks } = props;

  const styles = {
    bookmark: {
      root: {
        color: "#282828",
        background: "#868686",
        marginRight: "20px",
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
        marginLeft: "20px",
        float: "left",
      },
    },
  };

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

  function setPlaybackSpeed(speed) {
    player.current.audio.current.playbackRate = speed;
  }

  function addBookmark() {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const time = formatTime(player.current.audio.current.currentTime);
    const utime = player.current.audio.current.currentTime;
    const note = "add a note here...";

    const bookmark = { utime: utime, time: time, name: name, note: note };

    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setBookmarks(bookmarks);
  }

  function renderFooter() {
    return (
      <>
        <Group mb={30} styles={styles.playback}>
          <ActionIcon
            onClick={() => setPlaybackSpeed(0.5)}
            styles={styles.action}
            variant="filled"
            radius="lg"
            size="md"
          >
            <Multiplier05x size={20} />
          </ActionIcon>

          <ActionIcon
            onClick={() => setPlaybackSpeed(1)}
            styles={styles.action}
            variant="filled"
            radius="lg"
            size="md"
          >
            <Multiplier1x size={20} />
          </ActionIcon>

          <ActionIcon
            onClick={() => setPlaybackSpeed(1.5)}
            styles={styles.action}
            variant="filled"
            radius="lg"
            size="md"
          >
            <Multiplier15x size={20} />
          </ActionIcon>

          <ActionIcon
            onClick={() => setPlaybackSpeed(2)}
            styles={styles.action}
            variant="filled"
            radius="lg"
            size="md"
          >
            <Multiplier2x size={20} />
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
