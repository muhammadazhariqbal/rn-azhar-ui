import type { Meta, StoryObj } from "@storybook/react-native";
import { fn } from "storybook/test";
import { View } from "react-native";
import { InfoCarousel } from "./InfoCarousel";

const meta = {
  title: "InfoCarousel",
  component: InfoCarousel,
  args: {
    items: [
      {
        id: 1,
        subtext: "Hello there!",
        heading: "Get timely reminders so nothing slips ",
      },
      {
        id: 2,
        subtext: "Easy to use",
        heading: "Scheduled Instantly added to your calendar",
      },
      {
        id: 3,
        subtext: "Let's begin.",
        heading: "Speak Your Plans Just say what you need to do",
      },
    ],
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof InfoCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
