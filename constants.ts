import { PaginationReq, VulnerabilityFormInput } from "./types";

export const initialPagination: PaginationReq = {
  page: 0,
  size: 5,
  isLastPage: true,
};

export const initialVulnerability: VulnerabilityFormInput = {
  bacVul: false,
  xssVul: false,
};
