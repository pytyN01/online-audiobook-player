import { Group, Text, Center } from "@mantine/core";
import { Headphones } from "tabler-icons-react";
import { Dropzone } from "@mantine/dropzone";

export default function FileDropZone(props) {
  const root = { background: "#282828", color: "white" };
  const { setAudio } = props;
  const dropzone = {
    minHeight: "90vh",
    minWidth: "90vw",
    pointerEvents: "none",
  };
  const audioFormats = [
    ".aif",
    ".cda",
    ".mid",
    ".mp3",
    ".mpa",
    ".ogg",
    ".wav",
    ".wma",
    ".wpl",
  ];

  function dropFile(files) {
    setAudio({
      url: URL.createObjectURL(files[0]),
      name: files[0].name.split(".")[0],
    });
  }

  return (
    <Dropzone
      onReject={() => alert("rejected file type")}
      onDrop={(files) => dropFile(files)}
      accept={audioFormats}
      style={root}
    >
      {() => (
        <Group position="center" spacing="xl" style={dropzone}>
          <div>
            <Center>
              <Headphones size={200} />
            </Center>

            <Center>
              <Text size="xl">
                Drag audiobook here or click to select from files.
              </Text>
            </Center>

            <Center>
              <Text mt={10} size="xl">
                DOES NOT WORK ON IOS.
              </Text>
            </Center>
          </div>
        </Group>
      )}
    </Dropzone>
  );
}
