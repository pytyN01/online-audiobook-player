import styles from "../styles/Home.module.css";

import { useRef, useState } from "react";
import Player from "../comps/player";
import Bookmarks from "../comps/bookmarks";
import FileDropZone from "../comps/file-dropzone";

export default function Home() {
  const gradient = { from: "#dddddd", to: "gold", deg: 105 };
  const [bookmarks, setBookmarks] = useState(null);
  const [audio, setAudio] = useState(null);
  const player = useRef();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
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
        {!audio && <FileDropZone setAudio={(x) => setAudio(x)} />}
      </main>
    </div>
  );
}
