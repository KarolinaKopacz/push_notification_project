export const AlertModal = (props: any) => {
  const { message, confirm, onPress } = props;
  return (
    <div className="alerts-modal">
      <p>{message}</p>
      <button onClick={onPress}>{confirm}</button>
    </div>
  );
};
