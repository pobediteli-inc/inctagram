import { Meta, StoryObj } from "@storybook/react";
import { UpdatePostForm } from "./updatePostForm";
import "app/globals.css";
import { Post } from "store/services/api/posts/postsApi.types";

const meta: Meta<typeof UpdatePostForm> = {
  title: "Components/UpdatePostForm",
  component: UpdatePostForm,
  argTypes: {},
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof UpdatePostForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const post: Post = {
  id: 1,
  userName: "Alex",
  description: "description",
  location: "locatin",
  images: [
    {
      url: "https://example.com/image.jpg",
      width: 300,
      height: 300,
      fileSize: 300,
      createdAt: "2025-03-27T16:00:32.923Z",
      uploadId: "string",
    },
  ],
  createdAt: "2025-03-27T16:00:33.236Z",
  updatedAt: "2025-03-27T16:00:33.236Z",
  ownerId: 1,
  avatarOwner:
    "https://assetsio.gnwcdn.com/netflix-airbender-hedaline-aang.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
  owner: {
    firstName: "firstName",
    lastName: "lastName",
  },
  likesCount: 1,
  isLiked: true,
  avatarWhoLikes: false,
};

export const Default: Story = {
  args: {
    photoPreview: post.images[0].url,
    isOpen: true,
    avatar: post.avatarOwner,
    userName: post.userName,
    description: post.description,
    postId: post.id,
  },
};
