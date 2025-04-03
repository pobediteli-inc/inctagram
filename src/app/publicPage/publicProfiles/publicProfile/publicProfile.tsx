import s from "./publicProfile.module.css";
import { FC, Fragment } from "react";
import { AllPublicPostsResponse } from "store/services/api/publicPosts";
import { Typography } from "common/components";
import { ProfileImages } from "app/publicPage/publicProfiles/publicProfile/profileImages/profileImages";
import { CreatedDate } from "app/publicPage/publicProfiles/publicProfile/createdDate/createdDate";
import Image from "next/image";

export const PublicProfile: FC<Props> = ({ data }) => {
  const { items } = data ?? {};

  const getItems = items?.map((item, index) => (
    <div key={`${index}-${item.id}`} className={s.mainWrapper}>
      <ProfileImages images={item.images} />
      <div className={s.profileName}>
        <Image
          className={s.avatarOwner}
          src={item.avatarOwner || "/icons/svg/person.svg"}
          alt={item.userName}
          width={36}
          height={36}
        />
        <Typography variant={"h3"} color={"light"} textAlign={"center"}>
          {item.userName}
        </Typography>
      </div>
      <CreatedDate createdAt={item.createdAt} />
      <div className={s.description}>{item.description}</div>
    </div>
  ));

  return <Fragment>{getItems}</Fragment>;
};

type Props = {
  data?: AllPublicPostsResponse;
};
