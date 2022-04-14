import { Text, Grid, Center, Button, Group, ActionIcon } from "@mantine/core";
import { useEffect, useState, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import {
  Bookmark,
  Multiplier05x,
  Multiplier15x,
  Multiplier1x,
  Multiplier2x,
} from "tabler-icons-react";

export default function Player(props) {
  const { url, name, player, setBookmarks } = props;
  const [speed, setSpeed] = useState({
    speed: 1,
    ref: null,
  });

  const b = useRef();
  const b5 = useRef();
  const b1 = useRef();
  const b15 = useRef();
  const b2 = useRef();

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

  useEffect(() => {
    console.log("speed: ", speed.speed);
    console.log("ref: ", speed.ref);

    speed.ref && animateCSS(speed.ref, "rubberBand");
  }, [speed]);

  function animateCSS(ref, animation, prefix = "animate__") {
    const animationName = `${prefix}${animation}`;

    ref.current.classList.add(`${prefix}animated`, animationName);
    ref.current.classList.add(`${prefix}fast`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      ref.current.classList.remove(`${prefix}animated`, animationName);
      ref.current.classList.remove(`${prefix}fast`, animationName);
    }

    ref.current.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  }

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

    // animateCSS(b, "fadeInDown");
    // animateCSS(b, "fadeOutDown");
    // animateCSS(b, "backInDown");
    // animateCSS(b, "backOutDown");
    // animateCSS(b, "bounceInDown");
    // animateCSS(b, "bounceOutDown");
    // animateCSS(b, "zoomInDown");
    animateCSS(b, "zoomOutDown");
    // animateCSS(b, "slideInDown");
    // animateCSS(b, "slideOutDown");
  }

  function setPlaybackSpeed(ref, speed) {
    // animateCSS(ref, "bounce");
    player.current.audio.current.playbackRate = speed;
    setSpeed({ speed: speed, ref: ref });
  }

  function renderHeader(name) {
    return (
      <Center mt={20}>
        <Text weight={700} size="xl" inline>
          {name}
        </Text>
      </Center>
    );
  }

  function renderFooter() {
    return (
      <>
        <Group mb={30} styles={styles.playback}>
          <ActionIcon
            onClick={() => setPlaybackSpeed(b5, 0.5)}
            radius="lg"
            size={speed.speed === 0.5 ? "lg" : "md"}
            styles={styles.action}
            variant="filled"
            ref={b5}
          >
            <Multiplier05x size={speed.speed === 0.5 ? 30 : 20} />
          </ActionIcon>

          <ActionIcon
            onClick={() => setPlaybackSpeed(b1, 1)}
            radius="lg"
            size={speed.speed === 1 ? "lg" : "md"}
            styles={styles.action}
            variant="filled"
            ref={b1}
          >
            <Multiplier1x size={speed.speed === 1 ? 30 : 20} />
          </ActionIcon>

          <ActionIcon
            onClick={() => setPlaybackSpeed(b15, 1.5)}
            radius="lg"
            size={speed.speed === 1.5 ? "lg" : "md"}
            styles={styles.action}
            variant="filled"
            ref={b15}
          >
            <Multiplier15x size={speed.speed === 1.5 ? 30 : 20} />
          </ActionIcon>

          <ActionIcon
            onClick={() => setPlaybackSpeed(b2, 2)}
            radius="lg"
            size={speed.speed === 2 ? "lg" : "md"}
            styles={styles.action}
            variant="filled"
            ref={b2}
          >
            <Multiplier2x size={speed.speed === 2 ? 30 : 20} />
          </ActionIcon>
        </Group>

        <Button
          rightIcon={<Bookmark size={20} />}
          styles={styles.bookmark}
          onClick={addBookmark}
          variant="filled"
          radius="lg"
          size="xs"
          ref={b}
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
        header={renderHeader(name)}
        progressJumpStep={30000}
        footer={renderFooter()}
        ref={player}
        src={url}
      />
    </Grid>
  );
}
