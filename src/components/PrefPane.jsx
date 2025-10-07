import {
  Drawer,
  Button,
  Switch,
  Stack,
  Title,
  Text,
  ActionIcon,
  Select,
  NativeSelect,
} from "@mantine/core";

import { IconSettings } from "@tabler/icons-react";
import { useState } from "react";

export default function PrefPane({
  gens,
  onGenChange,
  cardBacks,
  onCardBackChange,
}) {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState("pokeball");

  function handleGenChange(genKey) {
    const newGens = {
      ...gens,
      [genKey]: !gens[genKey],
    };
    onGenChange(newGens);
  }

  return (
    <>
      <ActionIcon variant="default" size="42" onClick={() => setOpened(true)}>
        <IconSettings />
      </ActionIcon>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Title order={2}>Preferences</Title>}
        padding="md"
        size="xs"
        position="right"
        zIndex={1000}
        withOverlay
        withinPortal
        lockScroll
        styles={{
          content: {
            minWidth: "300px",
          },
        }}
      >
        <Stack gap="xl">
          <div>
            <Title order={4} mb="md">
              Generations to Include
            </Title>
            <Stack>
              <div>
                <Switch
                  label="Gen 1"
                  checked={gens.gen1}
                  onChange={() => handleGenChange("gen1")}
                  size="md"
                  radius="xs"
                  color="cyan"
                />
                <Text size="sm" fs="italic" c="dimmed">
                  Red, Blue & Yellow
                </Text>
              </div>
              <div>
                <Switch
                  label="Gen 2"
                  checked={gens.gen2}
                  onChange={() => handleGenChange("gen2")}
                  size="md"
                  radius="xs"
                  color="cyan"
                />
                <Text size="sm" fs="italic" c="dimmed">
                  Gold, Silver & Crystal
                </Text>
              </div>
              <div>
                <Switch
                  label="Gen 3"
                  checked={gens.gen3}
                  onChange={() => handleGenChange("gen3")}
                  size="md"
                  radius="xs"
                  color="cyan"
                />
                <Text size="sm" fs="italic" c="dimmed">
                  Ruby, Sapphire & Emerald
                </Text>
              </div>
              <div>
                <Switch
                  label="Gen 4"
                  checked={gens.gen4}
                  onChange={() => handleGenChange("gen4")}
                  size="md"
                  radius="xs"
                  color="cyan"
                />
                <Text size="sm" fs="italic" c="dimmed">
                  Diamond, Pearl & Platinum
                </Text>
              </div>
              <div>
                <Switch
                  label="Gen 5"
                  checked={gens.gen5}
                  onChange={() => handleGenChange("gen5")}
                  size="md"
                  radius="xs"
                  color="cyan"
                />
                <Text size="sm" fs="italic" c="dimmed">
                  Black & White
                </Text>
              </div>
              <div>
                <Switch
                  label="Gen 6"
                  checked={gens.gen6}
                  onChange={() => handleGenChange("gen6")}
                  size="md"
                  radius="xs"
                  color="cyan"
                />
                <Text size="sm" fs="italic" c="dimmed">
                  X & Y
                </Text>
              </div>
              <div>
                <Switch
                  label="Gen 7"
                  checked={gens.gen7}
                  onChange={() => handleGenChange("gen7")}
                  size="md"
                  radius="xs"
                  color="cyan"
                />
                <Text size="sm" fs="italic" c="dimmed">
                  Sun, Moon, Ultra Sun & Ultra Moon
                </Text>
              </div>
              <div>
                <Switch
                  label="Gen 8"
                  checked={gens.gen8}
                  onChange={() => handleGenChange("gen8")}
                  size="md"
                  radius="xs"
                  color="cyan"
                />
                <Text size="sm" fs="italic" c="dimmed">
                  Sword, Shield & Legends: Arceus
                </Text>
              </div>
              <div>
                <Switch
                  label="Gen 9"
                  checked={gens.gen9}
                  onChange={() => handleGenChange("gen9")}
                  size="md"
                  radius="xs"
                  color="cyan"
                />
                <Text size="sm" fs="italic" c="dimmed">
                  Scarlet & Violet
                </Text>
              </div>
            </Stack>
          </div>
          <div>
            <Title order={4} mb="md">
              Card Back Style
            </Title>

            <NativeSelect
              placeholder="Choose card back style"
              value={value}
              onChange={(event) => {
                const val = event.currentTarget.value;
                setValue(val);
                onCardBackChange(val);
              }}
              data={[
                { value: "pokeball", label: "Pokeball" },
                { value: "gymbadge", label: "Gym Badge" },
              ]}
            />
          </div>
        </Stack>
      </Drawer>
    </>
  );
}
