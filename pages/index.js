import Player from "../comps/player/index";
import Bookmarks from "../comps/bookmarks/index";
import FileDropZone from "../comps/dropzone/index";
import { Button } from "@mantine/core";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || []
  );
  const [audio, setAudio] = useState(() => {
    const storedAudio = localStorage.getItem("audio");
    return storedAudio ? JSON.parse(storedAudio) : null;
  });

  const player = useRef();

  useEffect(() => {
    if (audio) {
      localStorage.setItem("audio", JSON.stringify(audio));
    }
  }, [audio]);

  const clearBook = () => {
    setAudio(null);
    localStorage.removeItem("audio");
  };

  const styles = {
    close: {
      root: {
        position: "fixed",
        top: "5px",
        left: "5px",
        background: "#fa5252",
        zIndex: 100,
      },
    },
  };

  return (
    <>
      {audio && (
        <Button
          onClick={clearBook}
          styles={styles.close}
          variant="filled"
          radius="lg"
          size="sm"
        >
          X
        </Button>
      )}
      <main className="main">
        {audio && (
          <Player
            setBookmarks={setBookmarks}
            name={audio.name}
            url={audio.url}
            player={player}
          />
        )}
        {audio && bookmarks.length > 0 && (
          <Bookmarks
            setBookmarks={setBookmarks}
            bookmarks={bookmarks}
            player={player}
          />
        )}
      </main>
      {!audio && <FileDropZone setAudio={setAudio} />}
    </>
  );
}
