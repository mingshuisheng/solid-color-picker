export const classNamePrefix = "mss-solid-color-picker";

export const createByPrefix = (current: string = "") => {
  current = !!current ? `-${current}` : "";
  return (cur: string) => {
    return `${classNamePrefix}${current}-${cur}`;
  };
};
