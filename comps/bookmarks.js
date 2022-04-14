import { ArrowUpCircle, BookmarkOff } from "tabler-icons-react";
import { Text, Card, Grid, ActionIcon, Group } from "@mantine/core";
import { useRef } from "react";

export default function Bookmarks(props) {
  const { player, bookmarks, setBookmarks } = props;
  const goTo = useRef();

  const styles = {
    button: { root: { color: "#282828", background: "#868686" } },
    card: {
      root: {
        color: "white",
        background: "#282828",
        minWidth: "350px",
      },
    },
  };

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

    animateCSS(goTo, "bounceOutUp");
  }

  function renderBookmarks(bookmark, index) {
    return (
      <Grid key={index} mb={20}>
        <Card styles={styles.card}>
          <Group>
            <Text size="xl">{bookmark.name}</Text>
            <Text weight={700} size="xl">
              {bookmark.time.replace(/^0(?:0:0?)?/, "")}
            </Text>

            <ActionIcon
              onClick={() => goToBookmark(bookmark)}
              styles={styles.button}
              ref={goTo}
              variant="filled"
              radius="xl"
              size="xl"
            >
              <ArrowUpCircle size={26} />
            </ActionIcon>
            <ActionIcon
              onClick={() => removeBookmark(index)}
              styles={styles.button}
              variant="filled"
              radius="xl"
              size="xl"
            >
              <BookmarkOff size={26} />
            </ActionIcon>
          </Group>
        </Card>
      </Grid>
    );
  }

  return (
    <>{bookmarks.map((bookmark, index) => renderBookmarks(bookmark, index))}</>
  );
}
