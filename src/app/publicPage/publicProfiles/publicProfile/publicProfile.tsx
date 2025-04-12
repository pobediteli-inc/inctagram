"use client";

import s from "./publicProfile.module.css";
import { FC, Fragment, useState } from "react";
import { AllPublicPostsResponse } from "store/services/api/publicPosts";
import { Button, Typography } from "common/components";
import { ProfileImages } from "app/publicPage/publicProfiles/publicProfile/profileImages/profileImages";
import { CreatedDate } from "app/publicPage/publicProfiles/publicProfile/createdDate/createdDate";
import Image from "next/image";
import { Description } from "./description/description";
import { useRouter } from "next/navigation";

export const PublicProfile: FC<Props> = ({ data }) => {
  const { items } = data ?? {};

  const [isImageCollapsed, setIsImageCollapsed] = useState<Record<number, boolean>>({});
  const router = useRouter();

  const handleShowMore = (id: number, isExpanded: boolean) =>
    setIsImageCollapsed((prevState) => ({
      ...prevState,
      [id]: isExpanded,
    }));
  const handleUserProfile = (ownerId: number) => {
    router.push(`public-user/${ownerId}`);
  };

  const getItems = items?.map((item, index) => (
    <div key={`${index}-${item.id}`} className={s.mainWrapper}>
      <ProfileImages images={item.images} isCollapsed={isImageCollapsed[item.id] || false} />
      <div className={s.profileName}>
        <Image // avatar image
          className={s.avatarOwner}
          src={item.avatarOwner || "/icons/svg/person.svg"}
          alt={item.userName}
          width={36}
          height={36}
          priority
        />
        <Button variant={"link"} key={`${index}-${item.id}`} onClick={() => handleUserProfile(item.ownerId)}>
          <Typography variant={"h3"} color={"light"} textAlign={"center"}>
            {item.userName}
          </Typography>
        </Button>
      </div>
      <CreatedDate createdAt={item.createdAt} />
      <Description
        description={item.description}
        onClickShowMore={(isExpanded) => handleShowMore(item.id, isExpanded)}
      />
    </div>
  ));

  return <Fragment>{getItems}</Fragment>;
};

type Props = {
  data?: AllPublicPostsResponse;
};
