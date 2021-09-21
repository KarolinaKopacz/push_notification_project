interface Props {
  date: string;
  time: string;
}

export const changeDateFormat = (props: Props) => {
  const dateObj = new Date(props.date);
  const hours = Number(props.time.substr(0, 2));
  const minutes = Number(props.time.substr(3, 2));
  dateObj.setHours(hours);
  dateObj.setMinutes(minutes);

  return dateObj;
};
