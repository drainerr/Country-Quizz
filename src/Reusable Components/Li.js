const Li = (props) => {
  return (
    <li className="ListItem" onClick={props.onClick}>
      {props.children}
    </li>
  );
};

export default Li;
