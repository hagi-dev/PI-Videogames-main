import axios from "axios";

import { formatUpperCase } from "../helpers/format/formatUpperCase";

const apiUrl = "http://15.229.7.220:3001/api/";
const createVideogameUrl = `${apiUrl}videogame`;

export const methodsPost = ({
  name,
  release_date,
  description,
  genres,
  platform,
  rating,
}) => {
  let data = {
    name: formatUpperCase(name),
    release_date,
    description: formatUpperCase(description),
    genres,
    platform,
    rating,
  };
  return axios.post(createVideogameUrl, { ...data });
};
