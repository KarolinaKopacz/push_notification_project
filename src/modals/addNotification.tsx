export const AddNotificationModal = (props: any) => {
  const {
    title,
    notificationName,
    timing,
    saveButtonName,
    natificationNameValue,
    onChangeNotificationName,
    onPress,
    onChangeDate,
    onChangeTime,
    dateValue,
    timeValue,
  } = props;

  return (
    <div className="login-modal">
      <div className="small-component">
        <p>{title}</p>
      </div>
      <div className="small-component">
        <p>{notificationName}</p>
        <input
          value={natificationNameValue}
          onChange={onChangeNotificationName}
        ></input>
      </div>
      <div className="small-component pwd-container">
        <p>{timing}</p>
        <input type="date" value={dateValue} onChange={onChangeDate} />
        <input type="time" value={timeValue} onChange={onChangeTime} />
      </div>

      <div className="small-component">
        <button onClick={onPress}>{saveButtonName}</button>
      </div>
    </div>
  );
};
