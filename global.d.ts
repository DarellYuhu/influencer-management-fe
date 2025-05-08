type Account = {
  id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  followers: number;
  brandingLvl: number;
  platform: string;
  influencerId: string;
};

type Niche = {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

type Campaign = {
  id: string;
  name: string;
  platform: (typeof PLATFORM_LIST)[number];
  operationDate: string;
};

type Influencer = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type Content = {
  id: string;
  link: string;
  duration: number;
  createTime: string;
  description: string;
  campAcctId: number;
  coverId: number;
  cover: string;
  statistic: Statistic;
};

type Statistic = {
  contentId: string;
  comment: number;
  like: number;
  download: number;
  play: number;
  share: number;
  forward: number;
};
