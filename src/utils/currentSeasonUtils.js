// get the current season
export const getCurrentSeason = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 1) || month === 4 || (month === 5 && day <= 31)) {
    return "SPRING";
  } else if (
    (month === 6 && day >= 1) ||
    month === 7 ||
    (month === 8 && day <= 31)
  ) {
    return "SUMMER";
  } else if (
    (month === 9 && day >= 1) ||
    month === 10 ||
    (month === 11 && day <= 30)
  ) {
    return "FALL";
  } else {
    return "WINTER";
  }
};
