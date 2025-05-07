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
