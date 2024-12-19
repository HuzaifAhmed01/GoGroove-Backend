import { nanoid } from "nanoid";

let generatingId = (prefix) => {
  let uniquePart = nanoid(8);

  return `${prefix}-${uniquePart}`;
};

export default generatingId;
