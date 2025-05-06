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
