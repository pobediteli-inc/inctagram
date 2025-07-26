export const ROUTES = {
  auth: "/auth",
  create: "/create",
  favorites: "/favorites",
  feed: "/feed",
  friendProfile: "/friendProfile",
  home: "/",
  login: "/login",
  logout: "logout",
  messenger: "/messenger",
  myProfile: (id: number) => `/myProfile/${id}`,
  publicUser: (id: number) => `/publicUser/${id}`,
  publicUserPost: ({ userId, postId }: PublicUserPostRouteArgs) => `/publicUser/${userId}?postId=${postId}`,
  publicPage: "/publicPage",
  search: "/search",
  settings: "/settings",
  uploadAvatar: "/settings/uploadAvatar",
  statistic: "/statistic",
  verificationLinkExpired: "/login/verificationLinkExpired",
  passwordRestore: "/login/passwordRestore",
  policy: "/auth/terms/policy",
} as const;

type PublicUserPostRouteArgs = {
  userId: number;
  postId: number;
};
