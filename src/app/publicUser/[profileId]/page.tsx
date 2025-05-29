import { Typography } from "common/components";
import s from "./page.module.css";
import Image from "next/image";
import defaultAvatar from "public/icons/svg/person.svg";
import ModalPost from "./modalPost/modalPost";
import PublicProfilePostsGrid from "./postsGrid/postsGrid";

async function getProfile(profileId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-user/profile/${profileId}`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

async function getPosts(profileId: string, endCursorPostId?: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/user/${profileId}/${endCursorPostId}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

async function getPost(postId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/${postId}`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

async function getPostComments(postId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/${postId}/comments`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export default async function UserProfilePage({ params, searchParams }: ProfileRequest) {
  const paramsValue = await params;
  const searchParamsValue = await searchParams;

  const profilePromise = getProfile(paramsValue.profileId);
  const postsPromise = getPosts(paramsValue.profileId);

  const postPromise = searchParamsValue.postId ? getPost(searchParamsValue.postId) : Promise.resolve(null);
  const commentsPromise = searchParamsValue.postId ? getPostComments(searchParamsValue.postId) : Promise.resolve(null);

  const [profile, posts, post, comments] = await Promise.all([
    profilePromise,
    postsPromise,
    postPromise,
    commentsPromise,
  ]);

  if (!profile)
    return (
      <Typography variant={"h1"} textAlign={"center"}>
        Profile not found
      </Typography>
    );

  const { userName, userMetadata, avatars, aboutMe } = profile;

  return (
    <div className={s.container}>
      <div className={s.profileInfo}>
        <div className={s.avatarWrapper}>
          <Image
            src={avatars.length !== 0 ? avatars[0].url : defaultAvatar}
            alt="Profile Avatar"
            fill
            sizes="204px"
            className={avatars.length !== 0 ? s.avatar : s.defaultAvatar}
          />
        </div>
        <div>
          <Typography variant={"h1"}>{userName}</Typography>
          <div className={s.followersWrapper}>
            <div>
              <Typography variant={"bold_14"}>{userMetadata.following}</Typography>
              <Typography variant={"regular_14"}>Following</Typography>
            </div>
            <div>
              <Typography variant={"bold_14"}>{userMetadata.followers}</Typography>
              <Typography variant={"regular_14"}>Followers</Typography>
            </div>
            <div>
              <Typography variant={"bold_14"}>{userMetadata.publications}</Typography>
              <Typography variant={"regular_14"}>Publications</Typography>
            </div>
          </div>
          <Typography variant={"regular_16"} className={s.aboutMe}>
            {aboutMe}
          </Typography>
        </div>
      </div>
      <PublicProfilePostsGrid posts={posts} />
      {post && <ModalPost post={post} comments={comments} />}
    </div>
  );
}

type ProfileRequest = {
  params: Promise<{ profileId: string }>;
  searchParams: Promise<{ postId?: string }>;
};
