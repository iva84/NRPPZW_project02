export interface PaginationReq {
  page: number;
  size: number;
  isLastPage?: boolean;
}

export interface PaginationRes {
  lastPage: boolean;
  data: Post[];
}

export interface Post {
  id: number;
  title: string;
  content: string;
  public: boolean;
}

export interface PostFormInput {
  title: string;
  content: string;
  public: boolean;
}

export interface VulnerabilityFormInput {
  xssVul: boolean;
  bacVul: boolean;
}
