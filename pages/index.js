import Player from "../comps/player/index";
import Bookmarks from "../comps/bookmarks/index";
import FileDropZone from "../comps/dropzone/index";
import { Button, Center } from "@mantine/core";
import { useRef, useState } from "react";

export default function Home() {
  const gradient = { from: "#dddddd", to: "gold", deg: 105 };
  const [bookmarks, setBookmarks] = useState(null);
  const [audio, setAudio] = useState(null);
  const player = useRef();

  const styles = {
    close: {
      root: {
        float: "right",
        color: "white",
        background: "red",
      },
    },
  };

  return (
    <>
      {audio && (
        <Button
          onClick={() => setAudio(null)}
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
            setBookmarks={(x) => setBookmarks(x)}
            gradient={gradient}
            name={audio.name}
            url={audio.url}
            player={player}
          />
        )}
        {audio && bookmarks && (
          <Bookmarks
            setBookmarks={(x) => setBookmarks(x)}
            bookmarks={bookmarks}
            player={player}
            gradient={gradient}
          />
        )}
      </main>
      {!audio && <FileDropZone setAudio={(x) => setAudio(x)} />}
    </>
  );
}
