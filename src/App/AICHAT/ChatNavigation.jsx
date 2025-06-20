import RateReviewIcon from "@mui/icons-material/RateReview";
import chatHistory from "../../Data/ChatData/ChatHistory";

const navigation = [
  {
    title: "New Chat",
    icon: (
      <RateReviewIcon
        sx={{
          fontSize: 20,
          color: "#E2E2E2 !important",
          "& path": {
            fill: "#E2E2E2 !important",
          },
        }}
      />
    ),
    segment: "",
  },
  { kind: "divider" },
  ...chatHistory.map((chat) => ({
    title: chat.title,
    segment: chat.segment,
  })),
];

export default navigation;
