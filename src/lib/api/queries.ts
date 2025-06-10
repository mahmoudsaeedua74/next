import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//get all countries in bottom navbar
const BASEURL = "https://admin.findgreenery.com/api";
export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: () => axios.get(`${BASEURL}/countries`),
    select: (data) => data?.data?.data?.countries,
  });
};

//get all recommended categories ,hero products and recommended products
export const useRecommended = () => {
  return useQuery({
    queryKey: ["getRecommendedCategories"],
    queryFn: () => axios.get(`${BASEURL}/home`),
    select: (data) => data?.data?.data,
  });
};
//get all categories
export const useCategories = () => {
  return useQuery({
    queryKey: ["getCategories"],
    queryFn: () => axios.get(`${BASEURL}/main_categories`),
    select: (data) => data?.data?.data?.main_categories || [],
  });
};
//get all Suggested
export const useSuggested = (suggest: string) => {
  return useQuery({
    queryKey: ["getSuggested"],
    queryFn: () => axios.get(`${BASEURL}/suggested/products/${suggest}`),
    select: (data) => data.data || [],
  });
};
//get groups
export const useGroups = () => {
  return useQuery({
    queryKey: ["getGroups"],
    queryFn: () => axios.get(`${BASEURL}/groups`),
    select: (data) => data?.data?.data.groups || [],
  });
};
export const useGetAllProducts = (page = 1) => {
  return useQuery({
    queryKey: ["getAllProducts", page],
    queryFn: () =>
      axios.get(`${BASEURL}/products/all?per_page=52&page=${page}`),
    select: (data) => data?.data?.data || [],
  });
};

export const useFilteredProducts = (
  filters: Record<string, string | number | boolean | string[] | number[]> = {},
  page = 1
) => {
  const queryParams = new URLSearchParams();

  queryParams.append("page", String(page));

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      value.forEach((item) => queryParams.append(key, String(item)));
    } else if (value) {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();
  const endpoint = `${BASEURL}/products/all?per_page=52&${queryString}`;

  return useQuery({
    queryKey: ["filteredProducts", filters, page],
    queryFn: () => axios.get(endpoint),
    select: (data) => data?.data?.data || [],
    enabled: Object.keys(filters).some(
      (key) =>
        (Array.isArray(filters[key]) && filters[key].length > 0) || filters[key]
    ),
  });
};
//get footer
export const useFooter = () => {
  return useQuery({
    queryKey: ["getFooter"],
    queryFn: () => axios.get(`${BASEURL}/footer`),
    select: (data) => data?.data?.data?.menus,
  });
};
//get footer link
export const useFooterLink = (footer: string) => {
  return useQuery({
    queryKey: ["getFooterLink", footer],
    queryFn: () => axios.get(`${BASEURL}/pages/${footer}`),
    select: (data) => data?.data?.data,
  });
};
//get social
export const useSocial = () => {
  return useQuery({
    queryKey: ["getSocial"],
    queryFn: () => axios.get(`${BASEURL}/social`),
    select: (data) => data?.data?.data?.socials,
  });
};
//get header
export const useHeader = () => {
  return useQuery({
    queryKey: ["getHeader"],
    queryFn: () => axios.get(`${BASEURL}/header`),
    select: (data) => data?.data?.data?.menus,
  });
};
//get group
export const useGroup = (id: number) => {
  return useQuery({
    queryKey: ["getGroup", id],
    queryFn: () => axios.get(`${BASEURL}/group/${id}`),
    select: (data) => data?.data?.data?.products,
  });
};
//get them
export const useThem = () => {
  return useQuery({
    queryKey: ["getGroup"],
    queryFn: () => axios.get(`${BASEURL}/theme`),
    select: (data) => data?.data?.data?.theme,
  });
};
