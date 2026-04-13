import { Anchor, Container, Divider, Group, Text } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

export default function Footer() {
  return (
    <Container size="lg" mt="xl">
      <Divider my="md" />

      <Group justify="space-between" py="md">
        <Text size="sm" c="dimmed">
          Created with <span style={{ color: "red" }}>♥</span> by Luca
        </Text>

        <Anchor
          href="https://github.com/LucaBn/catan-tryhard-league"
          target="_blank"
          size="sm"
        >
          <Group gap={6}>
            <IconBrandGithub size={16} />
            <span>GitHub</span>
          </Group>
        </Anchor>
      </Group>
    </Container>
  );
}
