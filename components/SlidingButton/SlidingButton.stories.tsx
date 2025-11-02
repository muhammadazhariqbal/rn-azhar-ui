import type { Meta, StoryObj } from "@storybook/react-native";
import { fn } from "storybook/test";
import { View } from "react-native";
import { SlidingButton } from "./SlidingButton";

const meta = {
  title: "SlidingButton",
  component: SlidingButton,
  args: {
    text: "Get Started",
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof SlidingButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onPress: () => {
      console.log("✅ Custom button pressed!");
    },
  },
};
