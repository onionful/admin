export type NoOp = () => void;

export interface Collection {
  id: string;
  name: string;
}

export interface Profile {
  name: string;
  nickname: string;
  picture: string;
}

export interface Space {
  name: string;
}
