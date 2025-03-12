interface IPopoverListItemProps {
  label: string;
  content?: string;
  iconUrl: string;
  handleOptionClick: (option: string) => void;
}

const PopoverListItem = ({
  label,
  content,
  iconUrl,
  handleOptionClick
}: IPopoverListItemProps) => {
  return (
    <div
      className="popover-list-item"
      onClick={() => handleOptionClick(label.toLowerCase())}
    >
      <div className="popover-icon">
        <img src={iconUrl} />
      </div>
      <div className="popover-text">
        <label>{label}</label>
        <span>{content}</span>
      </div>
    </div>
  );
};

export default PopoverListItem;
