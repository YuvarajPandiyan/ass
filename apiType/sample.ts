export interface Sample {
  shares: Shares;
  threshHold: ThreshHold;
  avatar: string;
  tag: string;
  labels: string[];
  date: Date;
  score: number;
  _id: string;
  author: string;
  name: string;
  username: string;
  question: string;
  desc: string;
  uid: string;
  upvotes: any[];
  downvotes: Downvote[];
  answers: any[];
  __v: number;
}

export interface Downvote {
  _id: string;
  user: string;
}

export interface Shares {
  facebook: any[];
  linkedin: any[];
  whatsapp: any[];
  twitter: any[];
  clipboard: any[];
}

export interface ThreshHold {
  answers: number;
  upvotes: number;
}
