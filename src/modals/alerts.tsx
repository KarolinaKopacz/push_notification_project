export const AlertModal = (props: any) => {
  const { message, confirm, alertButtonFunc } = props;
  return (
    <div className="alerts-modal">
      <p>{message}</p>
      <button onClick={alertButtonFunc}>{confirm}</button>
    </div>
  );
};
