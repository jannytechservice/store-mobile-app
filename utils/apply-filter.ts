import { orderBy } from "lodash";
import { IProduct, IProductFilters } from "../types/product";

export const applyFilter = ({
  inputData,
  filters,
  sortBy,
  searchQuery,
}: {
  inputData: IProduct[];
  filters: IProductFilters;
  sortBy: boolean;
  searchQuery: string;
}) => {
  const { category } = filters;
  if (category !== "all") {
    inputData = inputData.filter((product) => product.category === category);
  }
  if (searchQuery) {
    inputData = inputData.filter(
      (product) =>
        product.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
    );
  }
  inputData = orderBy(inputData, ["category"], [sortBy ? "desc" : "asc"]);
  return inputData;
};
