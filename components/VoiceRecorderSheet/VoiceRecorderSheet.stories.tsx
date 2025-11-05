import type { Meta, StoryObj } from "@storybook/react-native";
import { fn } from "storybook/test";
import { View } from "react-native";
import { VoiceRecorderSheet } from "./VoiceRecorderSheet";

const meta = {
  title: "VoiceRecorderSheet",
  component: VoiceRecorderSheet,
  args: {
    transcription:
      "Please remind me tomorrow at 3 PM to give my mom a call, just so I can catch up with her, check how she’s doing, and make sure everything is okay.",
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof VoiceRecorderSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    callVoiceListener: () => {
      fn();
    },
    stopVoiceListener() {
      fn();
    },
  },
};
