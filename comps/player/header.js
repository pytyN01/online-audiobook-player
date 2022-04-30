import { Text, Center } from "@mantine/core";

export default function Header({ name }) {
  return (
    <Center mt={20}>
      <Text weight={700} size="xl">
        {name}
      </Text>
    </Center>
  );
}
