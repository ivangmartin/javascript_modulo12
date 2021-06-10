import Axios from 'axios';

const url = `${process.env.BASE_API_URL}/movements`;

export const getMovementList = () =>
  Axios.get(url).then((response) => {
    return response.data;
  });
